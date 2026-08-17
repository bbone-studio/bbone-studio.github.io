// ============================================================
// bbone Website - Language & Theme
// ============================================================

const I18N = {
    // --------------------------------------------------------
    // Simplified Chinese
    // --------------------------------------------------------
    zh: {
        profile: "关于我",
        games_title: "游戏库",
        games_intro: "主要制作 bara、bl、furry 等风格的游戏",
        pondthing_type: "恐怖、bl、bara、叙事、解谜",
        gympup_type: "furry、视觉小说、桌面宠物",
		gympup_time: "开发中, 预计2026.11上旬上线",
		pondthing_time: "开发中, 预计2027.01中旬上线",
        coming_soon: "敬请期待",
		gympup: "健身小狗",
		pondthing: "池中物",
        new_project: "其他游戏",
        copyright: "© 2026 bbone. All Rights Reserved.",
        about_title: "关于我",
        about_heading: "关于我",
        about_intro: "我是一名独立游戏开发者，喜欢制作bara、bl、furry、叙事、解谜等类型的游戏",
		about_midie: "您可在以下社媒中获得游戏相关动态，也可直接与我联系",
        pondthing_desc: "一款微恐叙事解谜游戏。在一场以死亡为终点的仪式中，主角获得了回溯时间的能力。面对不断重复的轮回与逐渐扭曲的人际关系，每一次选择都将导向截然不同的命运",
        gympup_desc: "一款兽人题材的恋爱叙事游戏，融合桌面挂机与视觉小说玩法，您将在陪伴中见证主角从身体到内心的双重成长与蜕变",
        day: "白天模式",
        night: "黑夜模式"
    },

    // --------------------------------------------------------
    // English
    // --------------------------------------------------------
    en: {
		profile: "About Me",
		games_title: "Games",
		games_intro: "I mainly create games featuring bara, BL, furry, and other styles",
		pondthing_type: "Horror, BL, bara, narrative, puzzle",
		gympup_type: "Furry, visual novel, desktop pet",
		gympup_time: "In Development, Expected release: Early November 2026",
		pondthing_time: "In Development, Expected release: Mid-January 2027",
		coming_soon: "Coming Soon",
		gympup: "GymPup",
		pondthing: "PondThing",
		new_project: "Other Games",
		copyright: "© 2026 bbone. All Rights Reserved.",
		about_title: "About Me",
		about_heading: "About Me",
		about_intro: "I'm an indie game developer who enjoys creating games featuring bara, BL, furry, narrative, puzzle, and other genres",
		about_midie: "Follow me on the social media platforms below for game updates, or feel free to contact me directly",
		pondthing_desc: "A narrative puzzle game with a touch of horror. During a ritual that ends in death, the protagonist gains the ability to turn back time. Trapped in an ever-repeating cycle with increasingly twisted relationships, every choice leads to a completely different fate.",
		gympup_desc: "A furry romance narrative game that combines desktop idle gameplay with visual novel elements. Through companionship, you'll witness the protagonist's transformation and growth, both physically and emotionally.",
		day: "Day Mode",
		night: "Night Mode"
	},

    // --------------------------------------------------------
    // Japanese
    // --------------------------------------------------------
    ja: {
		profile: "プロフィール",
		games_title: "ゲーム一覧",
		games_intro: "主にBara、BL、Furryなどのスタイルのゲームを制作しています",
		pondthing_type: "ホラー、BL、Bara、ナラティブ、パズル",
		gympup_type: "Furry、ビジュアルノベル、デスクトップペット",
		gympup_time: "開発中, 2026年11月上旬リリース予定",
		pondthing_time: "開発中, 2027年1月中旬リリース予定",
		coming_soon: "お楽しみに",
		gympup: "GymPup",
		pondthing: "PondThing",
		new_project: "その他のゲーム",
		copyright: "© 2026 bbone. All Rights Reserved.",
		about_title: "プロフィール",
		about_heading: "プロフィール",
		about_intro: "Bara、BL、Furry、ナラティブ、パズルなどのジャンルのゲームを制作しているインディーゲーム開発者です",
		about_midie: "以下のSNSでゲームに関する最新情報をチェックしたり、直接ご連絡いただけます",
		pondthing_desc: "微ホラー系のナラティブパズルゲーム。死を終着点とする儀式の中で、主人公は時間を巻き戻す能力を手に入れる。繰り返される輪廻と徐々に歪んでいく人間関係の中、選択するたびにまったく異なる運命へと導かれていく。",
		gympup_desc: "獣人をテーマにした恋愛ナラティブゲーム。デスクトップペットとビジュアルノベルを組み合わせ、主人公との触れ合いを通じて、身体と心の両方が成長し変化していく姿を見届けることができます。",
		day: "昼モード",
		night: "夜モード"
	},

    // --------------------------------------------------------
    // Traditional Chinese
    // --------------------------------------------------------
    "zh-tw": {
		profile: "關於我",
		games_title: "遊戲庫",
		games_intro: "主要製作 bara、BL、furry 等風格的遊戲",
		pondthing_type: "恐怖、BL、bara、敘事、解謎",
		gympup_type: "furry、視覺小說、桌面寵物",
		gympup_time: "開發中，預計2026年11月上旬上線",
		pondthing_time: "開發中，預計2027年1月中旬上線",
		coming_soon: "敬請期待",
		gympup: "健身小狗",
		pondthing: "池中物",
		new_project: "其他遊戲",
		copyright: "© 2026 bbone. All Rights Reserved.",
		about_title: "關於我",
		about_heading: "關於我",
		about_intro: "我是一名獨立遊戲開發者，喜歡製作 bara、BL、furry、敘事、解謎等類型的遊戲",
		about_midie: "您可以在以下社群媒體獲得遊戲相關動態，也可以直接與我聯絡",
		pondthing_desc: "一款微恐敘事解謎遊戲。在一場以死亡為終點的儀式中，主角獲得了回溯時間的能力。面對不斷重複的輪迴與逐漸扭曲的人際關係，每一次選擇都將導向截然不同的命運。",
		gympup_desc: "一款獸人題材的戀愛敘事遊戲，融合桌面掛機與視覺小說玩法，您將在陪伴中見證主角從身體到內心的雙重成長與蛻變。",
		day: "白天模式",
		night: "黑夜模式"
	}
};


// ============================================================
// Constants
// ============================================================

const SUPPORTED_LANGUAGES = Object.keys(I18N);

const languageSelect = document.getElementById("language-select");
const themeButton = document.getElementById("theme-toggle");


// ============================================================
// Language
// ============================================================

function detectLanguage() {
    // 1. Use the language selected by the user.
    const savedLanguage = localStorage.getItem("language");

    if (
        savedLanguage &&
        SUPPORTED_LANGUAGES.includes(savedLanguage)
    ) {
        return savedLanguage;
    }

    // 2. Otherwise use the browser language.
    const browserLanguage = (
        navigator.language || "zh"
    ).toLowerCase();

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

    // Set the HTML language attribute.
    if (language === "zh") {
        document.documentElement.lang = "zh-CN";
    } else if (language === "zh-tw") {
        document.documentElement.lang = "zh-TW";
    } else {
        document.documentElement.lang = language;
    }

    // Replace every element that has data-i18n.
    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.dataset.i18n;

        if (translations[key] !== undefined) {
            element.textContent = translations[key];
        }
    });

    // Keep the select box synchronized.
    if (languageSelect) {
        languageSelect.value = language;
    }
}


// ============================================================
// Theme
// ============================================================

function applyTheme(theme) {
    document.body.classList.toggle(
        "dark",
        theme === "dark"
    );

    if (themeButton) {
        themeButton.textContent =
            theme === "dark" ? "☀" : "☾";
    }
}


// ============================================================
// Initialization
// ============================================================

const currentLanguage = detectLanguage();

applyLanguage(currentLanguage);

applyTheme(
    localStorage.getItem("theme") || "light"
);


// ============================================================
// Event Listeners
// ============================================================

if (languageSelect) {
    languageSelect.addEventListener("change", (event) => {
        const language = event.target.value;

        localStorage.setItem(
            "language",
            language
        );

        applyLanguage(language);
    });
}


if (themeButton) {
    themeButton.addEventListener("click", () => {
        const currentTheme =
            localStorage.getItem("theme") || "light";

        const nextTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";

        localStorage.setItem(
            "theme",
            nextTheme
        );

        applyTheme(nextTheme);
    });
}
