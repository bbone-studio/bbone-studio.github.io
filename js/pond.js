// ============================================================
// bbone Website - 3D sea background
//
// One scene, two moods:
//   day   -> dusk sea, low sun, warm haze, drifting pollen
//   night -> moonlit sea, stars, blinking fireflies
//
// The theme switch cross-fades between them.
// Purely decorative: if WebGL is missing the CSS aurora
// fallback stays in place.
// ============================================================

import * as THREE from "./vendor/three.module.min.js";


// ============================================================
// Shared GLSL chunks
// ============================================================

const WAVE_GLSL = /* glsl */`
    float waveA(vec2 p, float t, out vec2 g) {
        vec2 d = vec2(0.92, 0.39);
        float ph = dot(p, d) * 0.62 + t * 0.85;
        g = d * (cos(ph) * 0.62);
        return sin(ph);
    }

    float waveB(vec2 p, float t, out vec2 g) {
        vec2 d = vec2(-0.55, 0.83);
        float ph = dot(p, d) * 0.95 + t * 1.15;
        g = d * (cos(ph) * 0.665);
        return sin(ph) * 0.70;
    }

    float waveC(vec2 p, float t, out vec2 g) {
        vec2 d = vec2(0.28, -0.96);
        float ph = dot(p, d) * 1.65 + t * 1.60;
        g = d * (cos(ph) * 0.578);
        return sin(ph) * 0.35;
    }

    float waveD(vec2 p, float t, out vec2 g) {
        vec2 d = vec2(0.72, 0.69);
        float ph = dot(p, d) * 2.90 + t * 2.40;
        g = d * (cos(ph) * 0.406);
        return sin(ph) * 0.14;
    }

    float waveHeight(vec2 p, float t) {
        vec2 g;
        return waveA(p, t, g) + waveB(p, t, g)
             + waveC(p, t, g) + waveD(p, t, g);
    }
`;

const FOG_GLSL = /* glsl */`
    uniform vec3 uFogColor;
    uniform float uFogDensity;

    vec3 applyFog(vec3 col, vec3 worldPos) {
        float d = length(cameraPosition - worldPos);
        float f = 1.0 - exp(-pow(d * uFogDensity, 2.0));
        return mix(col, uFogColor, clamp(f, 0.0, 1.0));
    }
`;

const COLOR_OUT_GLSL = /* glsl */`
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
`;


// ============================================================
// Palette helpers
// ============================================================

const tweens = [];

function tweenColor(uniform, dayHex, nightHex) {
    tweens.push({
        uniform,
        day: new THREE.Color(dayHex),
        night: new THREE.Color(nightHex),
        kind: "color"
    });
}

function tweenNumber(uniform, dayValue, nightValue) {
    tweens.push({
        uniform,
        day: dayValue,
        night: nightValue,
        kind: "number"
    });
}

function tweenVector(uniform, dayArray, nightArray) {
    tweens.push({
        uniform,
        day: new THREE.Vector3().fromArray(dayArray),
        night: new THREE.Vector3().fromArray(nightArray),
        kind: "vector"
    });
}

function applyDay(day) {
    for (let i = 0; i < tweens.length; i += 1) {
        const t = tweens[i];
        const mix = 1 - day;

        if (t.kind === "color") {
            t.uniform.value.copy(t.day).lerp(t.night, mix);
        } else if (t.kind === "vector") {
            t.uniform.value.copy(t.day).lerp(t.night, mix);
        } else {
            t.uniform.value = t.day + (t.night - t.day) * mix;
        }
    }
}


// ============================================================
// Geometry helpers
// ============================================================

function mulberry32(seed) {
    let a = seed >>> 0;

    return function random() {
        a |= 0;
        a = (a + 0x6D2B79F5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function makeGlowTexture(size) {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");
    const half = size / 2;
    const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);

    gradient.addColorStop(0.00, "rgba(255,255,255,1)");
    gradient.addColorStop(0.18, "rgba(255,255,255,0.72)");
    gradient.addColorStop(0.45, "rgba(255,255,255,0.20)");
    gradient.addColorStop(0.75, "rgba(255,255,255,0.04)");
    gradient.addColorStop(1.00, "rgba(255,255,255,0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    return texture;
}


// ============================================================
// Scene
// ============================================================

const isSmallScreen = window.matchMedia("(max-width: 720px)").matches;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const QUALITY = isSmallScreen
    ? { water: 96, motes: 40, dpr: 1.5 }
    : { water: 170, motes: 78, dpr: 1.75 };

/* The eye sits above the water so the sea is read from slightly
   overhead and its surface stretches away to the horizon. */
const CAMERA_Y = 2.15;
const CAM_Z = 3.6;
const BASE_H_FOV = 81 * Math.PI / 180;


function build(canvas) {
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: !isSmallScreen,
        alpha: true,
        powerPreference: "high-performance"
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, QUALITY.dpr));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.96;
    renderer.setClearAlpha(0);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 2000);
    camera.position.set(0, CAMERA_Y, CAM_Z);

    const lookTarget = new THREE.Vector3(0, CAMERA_Y - 1.233, -2.2);

    // --------------------------------------------------------
    // Sky dome
    // --------------------------------------------------------

    const skyUniforms = {
        uZenith: { value: new THREE.Color(0x2a3d78) },
        uHorizon: { value: new THREE.Color(0xff9d52) },
        uGround: { value: new THREE.Color(0xff9d52) },
        uSunColor: { value: new THREE.Color(0xffd08a) },
        uSunDir: { value: new THREE.Vector3(0.30, 0.095, -0.944).normalize() },
        uSunHalo: { value: 1.35 },
        uSunDisc: { value: 3.6 },
        uStar: { value: 0.0 },
        uCloudColor: { value: new THREE.Color(0xffd0a6) },
        uCloudAmount: { value: 0.58 },
        uCloudCut: { value: 0.47 },
        uTime: { value: 0.0 }
    };

    const sky = new THREE.Mesh(
        new THREE.SphereGeometry(160, 40, 24),
        new THREE.ShaderMaterial({
            side: THREE.BackSide,
            depthWrite: false,
            uniforms: skyUniforms,
            vertexShader: /* glsl */`
                varying vec3 vDir;
                void main() {
                    vDir = position;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: /* glsl */`
                uniform vec3 uZenith;
                uniform vec3 uHorizon;
                uniform vec3 uGround;
                uniform vec3 uSunColor;
                uniform vec3 uSunDir;
                uniform float uSunHalo;
                uniform float uSunDisc;
                uniform float uStar;
                uniform vec3 uCloudColor;
                uniform float uCloudAmount;
                uniform float uCloudCut;
                uniform float uTime;
                varying vec3 vDir;

                float hash13(vec3 p) {
                    p = fract(p * 0.1031);
                    p += dot(p, p.yzx + 33.33);
                    return fract((p.x + p.y) * p.z);
                }

                float hash21(vec2 p) {
                    p = fract(p * vec2(123.34, 456.21));
                    p += dot(p, p + 45.32);
                    return fract(p.x * p.y);
                }

                float noise2(vec2 p) {
                    vec2 i = floor(p);
                    vec2 f = fract(p);
                    f = f * f * (3.0 - 2.0 * f);

                    float a = hash21(i);
                    float b = hash21(i + vec2(1.0, 0.0));
                    float c = hash21(i + vec2(0.0, 1.0));
                    float d = hash21(i + vec2(1.0, 1.0));

                    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
                }

                float fbm(vec2 p) {
                    float value = 0.0;
                    float amp = 0.5;

                    for (int i = 0; i < 5; i++) {
                        value += amp * noise2(p);
                        p *= 2.03;
                        amp *= 0.5;
                    }

                    return value;
                }

                void main() {
                    vec3 dir = normalize(vDir);
                    float h = dir.y;

                    vec3 col = mix(uHorizon, uZenith, pow(clamp(h, 0.0, 1.0), 0.36));
                    col = mix(col, uGround, clamp(-h * 4.0, 0.0, 1.0));

                    float sd = max(dot(dir, normalize(uSunDir)), 0.0);
                    col += uSunColor * pow(sd, 700.0) * uSunDisc;
                    col += uSunColor * pow(sd, 40.0) * uSunHalo * 0.70;
                    col += uSunColor * pow(sd, 7.0) * uSunHalo * 0.14;

                    vec3 cell = floor(dir * 460.0);
                    float rnd = hash13(cell);
                    float twinkle = 0.55 + 0.45 * sin(uTime * 1.7 + rnd * 60.0);
                    float star = smoothstep(0.9972, 1.0, rnd) * twinkle;

                    col += vec3(0.80, 0.86, 1.0) * star * uStar
                         * smoothstep(-0.02, 0.30, h);

                    // slow drifting clouds, projected onto the sky dome
                    vec2 cuv = dir.xz / max(h, 0.07);
                    cuv = cuv * 0.85 + vec2(uTime * 0.010, uTime * 0.004);

                    float cover = fbm(cuv * 1.05) + 0.22 * fbm(cuv * 2.6 + 17.0);
                    cover = smoothstep(uCloudCut, uCloudCut + 0.30, cover);
                    cover *= smoothstep(0.0, 0.14, h);
                    cover *= 1.0 - smoothstep(0.62, 1.0, h);

                    vec3 cloudTint = uCloudColor
                        + uSunColor * pow(max(sd, 0.0), 5.0) * 0.45;

                    col = mix(col, cloudTint, cover * uCloudAmount);

                    gl_FragColor = vec4(col, 1.0);
                    ${COLOR_OUT_GLSL}
                }
            `
        })
    );

    sky.renderOrder = -10;
    scene.add(sky);

    // --------------------------------------------------------
    // Water
    // --------------------------------------------------------

    const waterUniforms = {
        uTime: { value: 0 },
        uAmp: { value: 0.05 },
        uNormalAmp: { value: 0.19 },
        uDeep: { value: new THREE.Color(0x17253f) },
        uShallow: { value: new THREE.Color(0x53617c) },
        uSkyTop: { value: new THREE.Color(0x2a3d78) },
        uSkyHorizon: { value: new THREE.Color(0xff9d52) },
        uLightDir: { value: new THREE.Vector3(0.30, 0.095, -0.944).normalize() },
        uLightColor: { value: new THREE.Color(0xffbe76) },
        uGlitter: { value: 1.0 },
        uGlitterPower: { value: 95.0 },
        uFogColor: { value: new THREE.Color(0xff9d52) },
        uFogDensity: { value: 0.012 }
    };

    const waterGeometry = new THREE.PlaneGeometry(
        1, 1, QUALITY.water, QUALITY.water
    );
    waterGeometry.rotateX(-Math.PI / 2);

    /* Stretch the sheet out past the horizon while keeping the vertex
       density high close to the camera: f(u) = A*u + B*u^3. */
    {
        const position = waterGeometry.attributes.position;
        const A = 30;
        const B = 870;

        for (let i = 0; i < position.count; i += 1) {
            const x = position.getX(i) * 2;
            const z = position.getZ(i) * 2;
            const ax = Math.abs(x);
            const az = Math.abs(z);

            position.setX(i, Math.sign(x) * (A * ax + B * ax * ax * ax));
            position.setZ(i, Math.sign(z) * (A * az + B * az * az * az));
        }
    }

    const water = new THREE.Mesh(
        waterGeometry,
        new THREE.ShaderMaterial({
            uniforms: waterUniforms,
            vertexShader: /* glsl */`
                uniform float uTime;
                uniform float uAmp;
                uniform float uNormalAmp;

                varying vec3 vWorldPos;
                varying vec3 vNormalW;
                varying float vHeight;

                ${WAVE_GLSL}

                void main() {
                    vec3 pos = position;
                    vec2 g = vec2(0.0);
                    vec2 tap;

                    float h = 0.0;
                    h += waveA(pos.xz, uTime, tap); g += tap;
                    h += waveB(pos.xz, uTime, tap); g += tap;
                    h += waveC(pos.xz, uTime, tap); g += tap;
                    h += waveD(pos.xz, uTime, tap); g += tap;

                    vHeight = h;
                    pos.y += h * uAmp;

                    // exaggerate the slope so the surface actually catches
                    // the light, while keeping the geometry displacement calm
                    vNormalW = normalize(vec3(-g.x * uNormalAmp, 1.0, -g.y * uNormalAmp));

                    vec4 world = modelMatrix * vec4(pos, 1.0);
                    vWorldPos = world.xyz;
                    gl_Position = projectionMatrix * viewMatrix * world;
                }
            `,
            fragmentShader: /* glsl */`
                uniform vec3 uDeep;
                uniform vec3 uShallow;
                uniform vec3 uSkyTop;
                uniform vec3 uSkyHorizon;
                uniform vec3 uLightDir;
                uniform vec3 uLightColor;
                uniform float uGlitter;
                uniform float uGlitterPower;

                varying vec3 vWorldPos;
                varying vec3 vNormalW;
                varying float vHeight;

                ${FOG_GLSL}

                void main() {
                    vec3 n = normalize(vNormalW);
                    vec3 view = normalize(cameraPosition - vWorldPos);
                    vec3 light = normalize(uLightDir);

                    float body = clamp(vHeight * 0.20 + 0.5, 0.0, 1.0);
                    vec3 col = mix(uDeep, uShallow, body * 0.55 + 0.16);

                    float fresnel = pow(1.0 - clamp(dot(n, view), 0.0, 1.0), 3.0);
                    vec3 reflected = reflect(-view, n);
                    vec3 skyTint = mix(
                        uSkyHorizon,
                        uSkyTop,
                        clamp(reflected.y * 1.7, 0.0, 1.0)
                    );

                    col = mix(col, skyTint, clamp(fresnel * 0.95, 0.0, 1.0));

                    vec3 half3 = normalize(light + view);
                    float spec = pow(max(dot(n, half3), 0.0), uGlitterPower);
                    col += uLightColor * spec * uGlitter * 3.8;

                    float sheen = pow(max(dot(n, half3), 0.0), 14.0);
                    col += uLightColor * sheen * uGlitter * 0.22;

                    gl_FragColor = vec4(applyFog(col, vWorldPos), 1.0);
                    ${COLOR_OUT_GLSL}
                }
            `
        })
    );

    scene.add(water);

    // --------------------------------------------------------
    // Motes / fireflies
    // --------------------------------------------------------

    const moteCount = QUALITY.motes;
    const motePositions = new Float32Array(moteCount * 3);
    const moteSizes = new Float32Array(moteCount);
    const motePhases = new Float32Array(moteCount);
    const moteDrift = [];

    const moteRng = mulberry32(4242);

    for (let i = 0; i < moteCount; i += 1) {
        const angle = (moteRng() * 2 - 1) * 0.78;
        const distance = 1.4 + moteRng() * 8;

        motePositions[i * 3 + 0] = Math.sin(angle) * distance;
        motePositions[i * 3 + 1] = 0.25 + moteRng() * 2.0;
        motePositions[i * 3 + 2] = CAM_Z - 1.2 - Math.cos(angle) * distance;

        moteSizes[i] = 7 + moteRng() * 15;
        motePhases[i] = moteRng() * Math.PI * 2;

        moteDrift.push({
            x: (moteRng() - 0.5) * 0.12,
            y: (moteRng() - 0.5) * 0.06,
            z: (moteRng() - 0.5) * 0.12
        });
    }

    const moteGeometry = new THREE.BufferGeometry();

    moteGeometry.setAttribute("position", new THREE.BufferAttribute(motePositions, 3));
    moteGeometry.setAttribute("aSize", new THREE.BufferAttribute(moteSizes, 1));
    moteGeometry.setAttribute("aPhase", new THREE.BufferAttribute(motePhases, 1));

    const moteUniforms = {
        uTime: { value: 0 },
        uDay: { value: 1 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uMap: { value: makeGlowTexture(128) },
        uDayColor: { value: new THREE.Color(0xffe6ae) },
        uNightColor: { value: new THREE.Color(0xc6ff96) },
        uOpacity: { value: 1 }
    };

    const motes = new THREE.Points(
        moteGeometry,
        new THREE.ShaderMaterial({
            uniforms: moteUniforms,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexShader: /* glsl */`
                attribute float aSize;
                attribute float aPhase;

                uniform float uTime;
                uniform float uDay;
                uniform float uPixelRatio;
                uniform vec3 uDayColor;
                uniform vec3 uNightColor;

                varying vec3 vColor;
                varying float vAlpha;

                void main() {
                    float firefly = 0.10 + 0.90 * pow(
                        max(sin(uTime * 1.05 + aPhase), 0.0), 1.9
                    );
                    float pollen = 0.34 + 0.22 * sin(uTime * 0.7 + aPhase);

                    vAlpha = mix(0.28 + firefly * 0.72, pollen, uDay);
                    vColor = mix(uNightColor, uDayColor, uDay);

                    vec4 mv = modelViewMatrix * vec4(position, 1.0);

                    // keep the glow roughly the same size on screen across
                    // the pond instead of shrinking to nothing far away
                    float scale = 1.0 / max(-mv.z * 0.14 + 0.35, 0.32);

                    gl_PointSize = clamp(aSize * uPixelRatio * scale, 2.0, 130.0);
                    gl_Position = projectionMatrix * mv;
                }
            `,
            fragmentShader: /* glsl */`
                uniform sampler2D uMap;
                uniform float uOpacity;

                varying vec3 vColor;
                varying float vAlpha;

                void main() {
                    vec4 tex = texture2D(uMap, gl_PointCoord);
                    gl_FragColor = vec4(vColor * tex.rgb, tex.a * vAlpha * uOpacity);
                }
            `
        })
    );

    motes.frustumCulled = false;
    scene.add(motes);

    // --------------------------------------------------------
    // Theme tweening
    // --------------------------------------------------------

    tweenColor(skyUniforms.uZenith, 0x2a3d78, 0x05070f);
    tweenColor(skyUniforms.uHorizon, 0xff9d52, 0x1d2450);
    tweenColor(skyUniforms.uGround, 0xff9d52, 0x1d2450);
    tweenColor(skyUniforms.uSunColor, 0xffd08a, 0xdbe9ff);
    tweenNumber(skyUniforms.uSunHalo, 1.35, 0.95);
    tweenNumber(skyUniforms.uSunDisc, 3.6, 3.4);
    tweenNumber(skyUniforms.uStar, 0.0, 1.0);
    tweenColor(skyUniforms.uCloudColor, 0xffd0a6, 0x2b3157);
    tweenNumber(skyUniforms.uCloudAmount, 0.58, 0.34);
    tweenNumber(skyUniforms.uCloudCut, 0.47, 0.50);
    tweenVector(skyUniforms.uSunDir, [0.30, 0.095, -0.944], [-0.34, 0.130, -0.925]);

    tweenColor(waterUniforms.uDeep, 0x17253f, 0x04101d);
    tweenColor(waterUniforms.uShallow, 0x53617c, 0x14384e);
    tweenColor(waterUniforms.uSkyTop, 0x2a3d78, 0x05070f);
    tweenColor(waterUniforms.uSkyHorizon, 0xff9d52, 0x1d2450);
    tweenColor(waterUniforms.uLightColor, 0xffbe76, 0xc2d6ff);
    tweenVector(waterUniforms.uLightDir, [0.30, 0.095, -0.944], [-0.34, 0.130, -0.925]);
    tweenNumber(waterUniforms.uGlitter, 1.35, 0.95);
    tweenNumber(waterUniforms.uGlitterPower, 95.0, 190.0);
    tweenColor(waterUniforms.uFogColor, 0xff9d52, 0x1d2450);
    tweenNumber(waterUniforms.uFogDensity, 0.012, 0.016);

    return {
        renderer,
        scene,
        camera,
        skyUniforms,
        waterUniforms,
        moteGeometry,
        moteDrift,
        moteUniforms,
        lookTarget
    };
}


// ============================================================
// Animation
// ============================================================

function run(world) {
    const {
        renderer, scene, camera, skyUniforms, waterUniforms,
        moteGeometry, moteDrift, moteUniforms, lookTarget
    } = world;

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const clock = new THREE.Clock();

    let elapsed = 0;
    let day = document.body.classList.contains("dark") ? 0 : 1;
    let target = day;
    let visible = true;

    // Vertical aim: on tall screens the content covers most of the pond,
    // so tilt further down and lift the horizon into the visible strip.
    let lookY = lookTarget.y;

    applyDay(day);

    new MutationObserver(() => {
        target = document.body.classList.contains("dark") ? 0 : 1;
    }).observe(document.body, { attributes: true, attributeFilter: ["class"] });

    window.addEventListener("pointermove", (event) => {
        pointer.tx = (event.clientX / window.innerWidth - 0.5) * 2;
        pointer.ty = (event.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    document.addEventListener("visibilitychange", () => {
        visible = !document.hidden;
    });

    function resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const aspect = width / height;

        // hold the horizontal field of view steady so tall phones still
        // see a proper slice of the pond instead of a narrow column
        const vertical = 2 * Math.atan(Math.tan(BASE_H_FOV / 2) / aspect);

        camera.fov = Math.min(Math.max(vertical * 180 / Math.PI, 46), 82);
        camera.aspect = aspect;
        camera.updateProjectionMatrix();

        const horizon = aspect < 1 ? 0.17 : 0.27;
        const pitch = (0.5 - horizon) * camera.fov * Math.PI / 180;
        const distance = CAM_Z - lookTarget.z;

        lookY = camera.position.y - Math.tan(pitch) * distance;

        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, QUALITY.dpr));
        renderer.setSize(width, height, false);

        moteUniforms.uPixelRatio.value = renderer.getPixelRatio();
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const motePositions = moteGeometry.attributes.position.array;

    function frame() {
        requestAnimationFrame(frame);

        if (!visible) {
            return;
        }

        const delta = Math.min(clock.getDelta(), 0.05);

        if (!reduceMotion) {
            elapsed += delta;
        }

        // ease between day and night
        if (Math.abs(day - target) > 0.0005) {
            day += (target - day) * Math.min(1, delta * 2.2);
            applyDay(day);
        } else if (day !== target) {
            day = target;
            applyDay(day);
        }

        skyUniforms.uTime.value = elapsed;
        waterUniforms.uTime.value = elapsed;
        moteUniforms.uTime.value = elapsed;
        moteUniforms.uDay.value = day;

        const dayMode = 1 - day;

        // camera drift + pointer parallax
        pointer.x += (pointer.tx - pointer.x) * 0.04;
        pointer.y += (pointer.ty - pointer.y) * 0.04;

        const drift = reduceMotion ? 0 : 1;

        // the pointer only nudges the framing - the pond should feel still
        camera.position.x = Math.sin(elapsed * 0.07) * 0.4 * drift + pointer.x * 0.14;
        camera.position.y = CAMERA_Y + Math.sin(elapsed * 0.11) * 0.07 * drift - pointer.y * 0.05;
        camera.position.z = 3.6 + Math.cos(elapsed * 0.05) * 0.25 * drift;

        lookTarget.x = pointer.x * 0.18;
        lookTarget.y = lookY - pointer.y * 0.06;

        camera.lookAt(lookTarget);

        // fireflies drift, and scatter away from the pointer at night
        const repel = 0.35 + dayMode * 1.5;

        for (let i = 0; i < moteDrift.length; i += 1) {
            const base = i * 3;
            const driftItem = moteDrift[i];

            motePositions[base + 0] += driftItem.x * delta;
            motePositions[base + 1] += driftItem.y * delta;
            motePositions[base + 2] += driftItem.z * delta;

            if (!reduceMotion) {
                motePositions[base + 1] +=
                    Math.sin(elapsed * 1.4 + i) * 0.0009;
            }

            // pointer repulsion, in screen-ish space
            const px = motePositions[base + 0] - pointer.x * 6;
            const py = motePositions[base + 1] - (1.4 - pointer.y * 3);
            const distSq = px * px + py * py;

            if (distSq < 4.5) {
                const force = (1 - distSq / 4.5) * repel * delta * 0.9;
                const inv = 1 / Math.max(Math.sqrt(distSq), 0.15);

                motePositions[base + 0] += px * inv * force;
                motePositions[base + 1] += py * inv * force;
            }

            // keep them in their volume
            if (motePositions[base + 1] > 2.6) {
                motePositions[base + 1] = 0.2;
            }

            if (motePositions[base + 1] < 0.1) {
                motePositions[base + 1] = 2.5;
            }
        }

        moteGeometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
    }

    frame();
}


// ============================================================
// Boot
// ============================================================

function boot() {
    const canvas = document.createElement("canvas");
    canvas.className = "fx-pond";
    canvas.setAttribute("aria-hidden", "true");

    document.body.insertBefore(canvas, document.body.firstChild);

    try {
        const world = build(canvas);
        run(world);

        document.body.classList.add("fx-pond-on");
    } catch (error) {
        // No WebGL2 (or no GPU budget left): drop the canvas and let the
        // CSS aurora fallback carry the background instead.
        console.warn("bbone: pond unavailable", error);
        canvas.remove();
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
    boot();
}
