// ============================================================
// bbone Website - Dreamcore Visual Effects
//
// Purely decorative. Everything here is progressive
// enhancement: the site stays fully readable and usable
// when these effects are skipped.
//
//   1. Ambient background layers
//   2. Cursor halo
//   3. Card tilt + pointer spotlight
//   4. Entrance reveal
//   5. Navbar scroll state
//   6. Theme switch ripple
// ============================================================

(function () {
    "use strict";

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    const root = document.documentElement;
    const body = document.body;


    // ============================================================
    // 1. Ambient background layers
    // ============================================================

    function buildAmbience() {
        const glow = document.createElement("div");
        glow.className = "fx-bg";
        glow.setAttribute("aria-hidden", "true");

        for (let i = 1; i <= 4; i += 1) {
            const orb = document.createElement("span");
            orb.className = "orb orb-" + i;
            glow.appendChild(orb);
        }

        const veil = document.createElement("div");
        veil.className = "fx-veil";
        veil.setAttribute("aria-hidden", "true");

        const bloom = document.createElement("div");
        bloom.className = "fx-bloom";
        bloom.setAttribute("aria-hidden", "true");

        body.insertBefore(glow, body.firstChild);
        body.appendChild(bloom);
        body.appendChild(veil);
    }


    // ============================================================
    // 3. Cursor halo
    // ============================================================

    function initCursor() {
        if (!finePointer || reduceMotion) {
            return;
        }

        const halo = document.createElement("div");
        halo.className = "fx-cursor";
        halo.setAttribute("aria-hidden", "true");
        body.appendChild(halo);

        let targetX = window.innerWidth / 2;
        let targetY = window.innerHeight / 2;
        let currentX = targetX;
        let currentY = targetY;
        let active = false;
        let rafId = 0;

        function tick() {
            rafId = requestAnimationFrame(tick);

            currentX += (targetX - currentX) * 0.12;
            currentY += (targetY - currentY) * 0.12;

            halo.style.transform =
                `translate3d(${currentX}px, ${currentY}px, 0)`;
        }

        window.addEventListener("pointermove", (event) => {
            targetX = event.clientX;
            targetY = event.clientY;

            if (!active) {
                active = true;
                currentX = targetX;
                currentY = targetY;
                body.classList.add("fx-pointer-active");
            }
        }, { passive: true });

        document.addEventListener("pointerleave", () => {
            body.classList.remove("fx-pointer-active");
            active = false;
        });

        rafId = requestAnimationFrame(tick);
    }


    // ============================================================
    // 4. Card tilt + pointer spotlight
    // ============================================================

    function initCards() {
        const cards = document.querySelectorAll(".game-card");

        cards.forEach((card) => {
            if (!finePointer) {
                return;
            }

            let queued = false;
            let nextX = 0;
            let nextY = 0;

            function apply() {
                queued = false;

                const rect = card.getBoundingClientRect();
                const px = (nextX - rect.left) / rect.width;
                const py = (nextY - rect.top) / rect.height;

                card.style.setProperty("--mx", (px * 100).toFixed(2) + "%");
                card.style.setProperty("--my", (py * 100).toFixed(2) + "%");

                if (!reduceMotion) {
                    card.style.setProperty("--ry", ((px - 0.5) * 9).toFixed(2) + "deg");
                    card.style.setProperty("--rx", ((0.5 - py) * 9).toFixed(2) + "deg");
                }
            }

            card.addEventListener("pointermove", (event) => {
                nextX = event.clientX;
                nextY = event.clientY;

                if (!queued) {
                    queued = true;
                    requestAnimationFrame(apply);
                }
            }, { passive: true });

            card.addEventListener("pointerleave", () => {
                card.style.removeProperty("--ry");
                card.style.removeProperty("--rx");
                card.style.removeProperty("--mx");
                card.style.removeProperty("--my");
            });
        });
    }


    // ============================================================
    // 5. Entrance reveal
    // ============================================================

    function initReveal() {
        const groups = [
            { selector: ".section-title", step: 0 },
            { selector: ".about-container", step: 0 },
            { selector: ".detail-left", step: 0 },
            { selector: ".detail-right", step: 1 },
            { selector: ".about-logo", step: 0 },
            { selector: ".game-card", step: 1 },
            { selector: ".shot-placeholder", step: 1, limit: 6 }
        ];

        const targets = [];

        groups.forEach((group) => {
            document.querySelectorAll(group.selector).forEach((element, index) => {
                if (group.limit && index >= group.limit) {
                    return;
                }

                element.style.setProperty(
                    "--fx-delay",
                    String(index * group.step)
                );

                element.classList.add("fx-reveal");
                targets.push(element);
            });
        });

        if (reduceMotion || !("IntersectionObserver" in window)) {
            targets.forEach((element) => element.classList.add("fx-in"));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("fx-in");
                observer.unobserve(entry.target);
            });
        }, {
            rootMargin: "0px 0px -8% 0px",
            threshold: 0.06
        });

        targets.forEach((element) => observer.observe(element));

        // Safety net: content must never stay invisible, even if the
        // observer never fires (odd embeds, print, restored scroll).
        function revealInView() {
            const limit = window.innerHeight;

            targets.forEach((element) => {
                if (element.classList.contains("fx-in")) {
                    return;
                }

                const rect = element.getBoundingClientRect();

                if (rect.top < limit * 0.92 && rect.bottom > 0) {
                    element.classList.add("fx-in");
                }
            });
        }

        window.addEventListener("load", revealInView);
        window.setTimeout(revealInView, 1200);
    }


    // ============================================================
    // 6. Navbar scroll state
    // ============================================================

    function initScrollState() {
        let ticking = false;

        function update() {
            ticking = false;
            body.classList.toggle("fx-scrolled", window.scrollY > 12);
        }

        window.addEventListener("scroll", () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        }, { passive: true });

        update();
    }


    // ============================================================
    // 7. Theme switch ripple
    // ============================================================

    function initThemeRipple() {
        const button = document.getElementById("theme-toggle");

        if (!button || reduceMotion) {
            return;
        }

        button.addEventListener("click", (event) => {
            const rect = button.getBoundingClientRect();

            const ripple = document.createElement("div");
            ripple.className = "fx-ripple";
            ripple.style.left = (event.clientX || rect.left + rect.width / 2) + "px";
            ripple.style.top = (event.clientY || rect.top + rect.height / 2) + "px";

            document.body.appendChild(ripple);

            window.setTimeout(() => ripple.remove(), 780);
        });
    }


    // ============================================================
    // Boot
    // ============================================================

    function boot() {
        buildAmbience();
        initReveal();
        initCards();
        initScrollState();
        initThemeRipple();
        initCursor();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot, { once: true });
    } else {
        boot();
    }

    // expose for debugging
    root.classList.add("fx-ready");
})();
