// ============================================================
// bbone Website - i18n, theme, screenshot viewer
//
// Three small pieces, no dependencies:
//   1. Translations (edit the I18N object below)
//   2. Language + theme switching
//   3. Screenshot lightbox on the game detail pages
// ============================================================

const I18N = {
    // --------------------------------------------------------
    // Simplified Chinese
    // --------------------------------------------------------
    zh: {
        skip_to_content: "跳到主要内容",

        nav_games: "游戏",
        nav_about: "关于我",
        language: "语言",
        theme_dark: "切换到夜间模式",
        theme_light: "切换到日间模式",

        games_title: "游戏库",
        games_intro: "主要制作 bara、BL、furry 等风格的游戏",

        gympup: "健身小狗",
        pondthing: "池中物",
        new_project: "其他游戏",
        new_project_note: "新作筹备中，敬请期待",

        status_dev: "开发中",
        coming_soon: "敬请期待",
        view_detail: "查看详情",
        home: "首页",

        gympup_type: "furry、视觉小说、桌面宠物",
        pondthing_type: "恐怖、BL、bara、叙事、解谜",
        gympup_eta: "预计 2026 年 11 月上旬上线",
        pondthing_eta: "预计 2027 年 1 月中旬上线",
        gympup_shot: "健身小狗 游戏截图",
        pondthing_shot: "池中物 游戏截图",

        gympup_desc: "一款兽人题材的恋爱叙事游戏，融合桌面挂机与视觉小说玩法，您将在陪伴中见证主角从身体到内心的双重成长与蜕变。",
        pondthing_desc: "一款微恐叙事解谜游戏。在一场以死亡为终点的仪式中，主角获得了回溯时间的能力。面对不断重复的轮回与逐渐扭曲的人际关系，每一次选择都将导向截然不同的命运。",

        screenshots: "游戏截图",
        screenshot_hint: "点击图片可放大查看",
        lightbox_label: "截图预览",
        lightbox_close: "关闭",
        lightbox_prev: "上一张",
        lightbox_next: "下一张",

        about_title: "关于我",
        about_role: "独立游戏开发者",
        about_intro: "我是一名独立游戏开发者，喜欢制作 bara、BL、furry、叙事、解谜等类型的游戏。您可在以下社媒中获得游戏相关动态，也可直接与我联系。",
        about_follow: "关注我",
        about_support: "支持我",
        about_contact: "联系方式",
        redbook: "小红书",
        douyin: "抖音",
        afdian: "爱发电",
        steam_curator: "Steam 鉴赏家",

        support: "支持",
        contact_me: "联系我",
        copyright: "© 2026 bbone. All Rights Reserved."
    },

    // --------------------------------------------------------
    // English
    // --------------------------------------------------------
    en: {
        skip_to_content: "Skip to content",

        nav_games: "Games",
        nav_about: "About",
        language: "Language",
        theme_dark: "Switch to night mode",
        theme_light: "Switch to day mode",

        games_title: "Games",
        games_intro: "Games with bara, BL and furry themes",

        gympup: "GymPup",
        pondthing: "PondThing",
        new_project: "More Games",
        new_project_note: "A new project is in the works.",

        status_dev: "In development",
        coming_soon: "Coming soon",
        view_detail: "View details",
        home: "Home",

        gympup_type: "Furry, visual novel, desktop pet",
        pondthing_type: "Horror, BL, bara, narrative, puzzle",
        gympup_eta: "Planned for early November 2026",
        pondthing_eta: "Planned for mid January 2027",
        gympup_shot: "GymPup screenshot",
        pondthing_shot: "PondThing screenshot",

        gympup_desc: "A furry romance narrative game that combines desktop idle gameplay with visual novel elements. Through companionship, you'll witness the protagonist's transformation and growth, both physically and emotionally.",
        pondthing_desc: "A narrative puzzle game with a touch of horror. During a ritual that ends in death, the protagonist gains the ability to turn back time. Trapped in an ever-repeating cycle with increasingly twisted relationships, every choice leads to a completely different fate.",

        screenshots: "Screenshots",
        screenshot_hint: "Click an image to enlarge",
        lightbox_label: "Screenshot viewer",
        lightbox_close: "Close",
        lightbox_prev: "Previous",
        lightbox_next: "Next",

        about_title: "About",
        about_role: "Indie game developer",
        about_intro: "I'm an indie game developer who enjoys creating games featuring bara, BL, furry, narrative and puzzle elements. Follow me on the platforms below for updates, or get in touch directly.",
        about_follow: "Follow",
        about_support: "Support",
        about_contact: "Contact",
        redbook: "Xiaohongshu",
        douyin: "Douyin",
        afdian: "Afdian",
        steam_curator: "Steam curator",

        support: "Support",
        contact_me: "Contact",
        copyright: "© 2026 bbone. All Rights Reserved."
    },

    // --------------------------------------------------------
    // Japanese
    // --------------------------------------------------------
    ja: {
        skip_to_content: "メインコンテンツへスキップ",

        nav_games: "ゲーム",
        nav_about: "プロフィール",
        language: "言語",
        theme_dark: "ナイトモードに切り替え",
        theme_light: "デイモードに切り替え",

        games_title: "ゲーム一覧",
        games_intro: "Bara、BL、Furry などのテーマのゲームを制作しています",

        gympup: "GymPup",
        pondthing: "PondThing",
        new_project: "その他のゲーム",
        new_project_note: "新作を準備中です。",

        status_dev: "開発中",
        coming_soon: "お楽しみに",
        view_detail: "詳細を見る",
        home: "ホーム",

        gympup_type: "Furry、ビジュアルノベル、デスクトップペット",
        pondthing_type: "ホラー、BL、Bara、ナラティブ、パズル",
        gympup_eta: "2026年11月上旬リリース予定",
        pondthing_eta: "2027年1月中旬リリース予定",
        gympup_shot: "GymPup スクリーンショット",
        pondthing_shot: "PondThing スクリーンショット",

        gympup_desc: "獣人をテーマにした恋愛ナラティブゲーム。デスクトップペットとビジュアルノベルを組み合わせ、主人公との触れ合いを通じて、身体と心の両方が成長し変化していく姿を見届けることができます。",
        pondthing_desc: "微ホラー系のナラティブパズルゲーム。死を終着点とする儀式の中で、主人公は時間を巻き戻す能力を手に入れる。繰り返される輪廻と徐々に歪んでいく人間関係の中、選択するたびにまったく異なる運命へと導かれていく。",

        screenshots: "スクリーンショット",
        screenshot_hint: "画像をクリックすると拡大できます",
        lightbox_label: "スクリーンショットビューア",
        lightbox_close: "閉じる",
        lightbox_prev: "前へ",
        lightbox_next: "次へ",

        about_title: "プロフィール",
        about_role: "インディーゲーム開発者",
        about_intro: "Bara、BL、Furry、ナラティブ、パズルなどのジャンルのゲームを制作しているインディーゲーム開発者です。以下のSNSでゲームに関する最新情報をチェックしたり、直接ご連絡いただけます。",
        about_follow: "フォロー",
        about_support: "サポート",
        about_contact: "お問い合わせ",
        redbook: "小紅書",
        douyin: "抖音",
        afdian: "愛発電",
        steam_curator: "Steam キュレーター",

        support: "サポート",
        contact_me: "お問い合わせ",
        copyright: "© 2026 bbone. All Rights Reserved."
    },

    // --------------------------------------------------------
    // Traditional Chinese
    // --------------------------------------------------------
    "zh-tw": {
        skip_to_content: "跳到主要內容",

        nav_games: "遊戲",
        nav_about: "關於我",
        language: "語言",
        theme_dark: "切換到夜間模式",
        theme_light: "切換到日間模式",

        games_title: "遊戲庫",
        games_intro: "主要製作 bara、BL、furry 等風格的遊戲",

        gympup: "健身小狗",
        pondthing: "池中物",
        new_project: "其他遊戲",
        new_project_note: "新作籌備中，敬請期待",

        status_dev: "開發中",
        coming_soon: "敬請期待",
        view_detail: "查看詳情",
        home: "首頁",

        gympup_type: "furry、視覺小說、桌面寵物",
        pondthing_type: "恐怖、BL、bara、敘事、解謎",
        gympup_eta: "預計 2026 年 11 月上旬上線",
        pondthing_eta: "預計 2027 年 1 月中旬上線",
        gympup_shot: "健身小狗 遊戲截圖",
        pondthing_shot: "池中物 遊戲截圖",

        gympup_desc: "一款獸人題材的戀愛敘事遊戲，融合桌面掛機與視覺小說玩法，您將在陪伴中見證主角從身體到內心的雙重成長與蛻變。",
        pondthing_desc: "一款微恐敘事解謎遊戲。在一場以死亡為終點的儀式中，主角獲得了回溯時間的能力。面對不斷重複的輪迴與逐漸扭曲的人際關係，每一次選擇都將導向截然不同的命運。",

        screenshots: "遊戲截圖",
        screenshot_hint: "點擊圖片可放大檢視",
        lightbox_label: "截圖預覽",
        lightbox_close: "關閉",
        lightbox_prev: "上一張",
        lightbox_next: "下一張",

        about_title: "關於我",
        about_role: "獨立遊戲開發者",
        about_intro: "我是一名獨立遊戲開發者，喜歡製作 bara、BL、furry、敘事、解謎等類型的遊戲。您可以在以下社群媒體獲得遊戲相關動態，也可以直接與我聯絡。",
        about_follow: "追蹤我",
        about_support: "支持我",
        about_contact: "聯絡方式",
        redbook: "小紅書",
        douyin: "抖音",
        afdian: "愛發電",
        steam_curator: "Steam 鑑賞家",

        support: "支持",
        contact_me: "聯絡我",
        copyright: "© 2026 bbone. All Rights Reserved."
    }
};


// ============================================================
// Elements
// ============================================================

const languageSelect = document.getElementById("language-select");
const themeButton = document.getElementById("theme-toggle");
const lightbox = document.getElementById("lightbox");

const SUPPORTED_LANGUAGES = Object.keys(I18N);

let currentLanguage = "zh";
let currentTranslations = I18N.zh;


// ============================================================
// Language
// ============================================================

function detectLanguage() {
    const urlLanguage = new URLSearchParams(window.location.search).get("lang");

    if (urlLanguage && SUPPORTED_LANGUAGES.includes(urlLanguage)) {
        try {
            localStorage.setItem("language", urlLanguage);
        } catch (error) { /* storage unavailable */ }

        return urlLanguage;
    }

    let savedLanguage = null;

    try {
        savedLanguage = localStorage.getItem("language");
    } catch (error) { /* storage unavailable */ }

    if (savedLanguage && SUPPORTED_LANGUAGES.includes(savedLanguage)) {
        return savedLanguage;
    }

    const browserLanguage = (navigator.language || "zh").toLowerCase();

    if (browserLanguage.startsWith("en")) {
        return "en";
    }

    if (browserLanguage.startsWith("ja")) {
        return "ja";
    }

    if (
        browserLanguage.includes("zh-tw") ||
        browserLanguage.includes("zh-hk") ||
        browserLanguage.includes("zh-hant")
    ) {
        return "zh-tw";
    }

    return "zh";
}

function applyLanguage(language) {
    const translations = I18N[language] || I18N.zh;

    currentLanguage = language;
    currentTranslations = translations;

    if (language === "zh") {
        document.documentElement.lang = "zh-CN";
    } else if (language === "zh-tw") {
        document.documentElement.lang = "zh-TW";
    } else {
        document.documentElement.lang = language;
    }

    // Visible text.
    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const value = translations[element.dataset.i18n];

        if (value !== undefined) {
            element.textContent = value;
        }
    });

    // Accessible labels (icon-only controls).
    document.querySelectorAll("[data-i18n-label]").forEach((element) => {
        const value = translations[element.dataset.i18nLabel];

        if (value !== undefined) {
            element.setAttribute("aria-label", value);
            element.setAttribute("title", value);
        }
    });

    // Image alt text. A data-index keeps repeated images distinct.
    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
        const base = translations[element.dataset.i18nAlt];

        if (base !== undefined) {
            const index = element.dataset.index;
            element.alt = index ? base + " " + index : base;
        }
    });

    if (languageSelect) {
        languageSelect.value = language;
    }

    syncThemeButton();
}


// ============================================================
// Theme
// ============================================================

function storedTheme() {
    try {
        return localStorage.getItem("theme");
    } catch (error) {
        return null;
    }
}

function currentTheme() {
    // A ?theme=dark|light link wins over the saved preference.
    const urlTheme = new URLSearchParams(window.location.search).get("theme");

    if (urlTheme === "dark" || urlTheme === "light") {
        return urlTheme;
    }

    return storedTheme() || "light";
}

function applyTheme(theme) {
    const dark = theme === "dark";

    document.documentElement.classList.toggle("dark", dark);

    try {
        localStorage.setItem("theme", theme);
    } catch (error) { /* storage unavailable */ }

    syncThemeButton();
}

function syncThemeButton() {
    if (!themeButton) {
        return;
    }

    const dark = document.documentElement.classList.contains("dark");

    themeButton.textContent = dark ? "☀" : "☾";

    const label = currentTranslations[dark ? "theme_light" : "theme_dark"];

    if (label) {
        themeButton.setAttribute("aria-label", label);
        themeButton.setAttribute("title", label);
        themeButton.setAttribute("aria-pressed", String(dark));
    }
}


// ============================================================
// Screenshot viewer
// ============================================================

function initLightbox() {
    const triggers = Array.from(document.querySelectorAll(".shot-btn"));

    if (!lightbox || triggers.length === 0) {
        return;
    }

    const image = lightbox.querySelector(".lightbox-image");
    const counter = lightbox.querySelector(".lightbox-count");
    const closeButton = lightbox.querySelector("[data-lightbox-close]");

    let index = 0;

    function show(next) {
        index = (next + triggers.length) % triggers.length;

        const thumbnail = triggers[index].querySelector("img");

        image.src = thumbnail.currentSrc || thumbnail.src;
        image.alt = thumbnail.alt || "";

        counter.textContent = (index + 1) + " / " + triggers.length;
    }

    function open(next) {
        show(next);

        if (typeof lightbox.showModal === "function") {
            lightbox.showModal();
        } else {
            lightbox.setAttribute("open", "");
        }
    }

    triggers.forEach((trigger, position) => {
        trigger.addEventListener("click", () => open(position));
    });

    lightbox.querySelector("[data-lightbox-prev]").addEventListener("click", () => show(index - 1));
    lightbox.querySelector("[data-lightbox-next]").addEventListener("click", () => show(index + 1));

    closeButton.addEventListener("click", () => lightbox.close());

    // Clicking the backdrop (outside the image and the bar) closes.
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            lightbox.close();
        }
    });

    lightbox.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            show(index - 1);
        } else if (event.key === "ArrowRight") {
            event.preventDefault();
            show(index + 1);
        }
    });
}


// ============================================================
// Init
// ============================================================

applyTheme(currentTheme());
applyLanguage(detectLanguage());
initLightbox();

if (languageSelect) {
    languageSelect.addEventListener("change", (event) => {
        const language = event.target.value;

        try {
            localStorage.setItem("language", language);
        } catch (error) { /* storage unavailable */ }

        applyLanguage(language);
    });
}

if (themeButton) {
    themeButton.addEventListener("click", () => {
        applyTheme(currentTheme() === "dark" ? "light" : "dark");
    });
}
