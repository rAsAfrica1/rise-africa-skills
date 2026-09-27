const fs = require("fs");
const path = require("path");
const { jsonrepair } = require("jsonrepair");

const API_KEY = process.env.DEEPSEEK_API_KEY;
if (!API_KEY) { console.log("ERROR: DEEPSEEK_API_KEY not set"); process.exit(1); }

const ROOT = "C:/Users/1st choice group/rise-africa-skills/deep_courses";
const TEST = process.argv.includes("--test");
const ONE = process.argv.includes("--one");

const COURSES = [
    { slug: "knife-blacksmith", name: "Knife Blacksmith" },
    { slug: "steel-fixing-rebar", name: "Steel Fixing (Rebar)" },
    { slug: "scaffolding", name: "Scaffolding" },
    { slug: "plumbing", name: "Plumbing" },
    { slug: "road-construction", name: "Road Construction" },
    { slug: "painting-and-decorating", name: "Painting and Decorating" },
    { slug: "greenhouse-vegetable-farming", name: "Greenhouse Vegetable Farming" },
    { slug: "agricultural-irrigation-technician", name: "Agricultural Irrigation Technician" },
    { slug: "machinery-operation-and-repair", name: "Machinery Operation and Repair" },
    { slug: "township-and-village-enterprise-management", name: "Township and Village Enterprise Management" },
    { slug: "business-chinese-arabic-russian-translation", name: "Business Chinese, Arabic and Russian Translation" },
    { slug: "small-shop-and-market-trading", name: "Small Shop and Market Trading" },
    { slug: "export-sales-agent", name: "Export Sales Agent" },
    { slug: "customs-brokerage", name: "Customs Brokerage" },
    { slug: "purchasing-and-procurement", name: "Purchasing and Procurement" },
    { slug: "foreign-trade-negotiation", name: "Foreign Trade Negotiation" },
    { slug: "yok-pan-blacksmith", name: "Yok and Pan Blacksmith" },
    { slug: "organic-manure-33-ingredients", name: "Organic Manure with 33 Ingredients" },
    { slug: "broiler-production", name: "Broiler Production" },
    { slug: "layers-production", name: "Layers Production" }
];

const MODULE_TITLES = {
    "broiler-production": [
        "The Broiler Business - Capital Tiers and Profit Plan",
        "Broiler Breeds and Day-Old Chick Selection",
        "Brooding Management - Temperature, Water, Light",
        "Broiler Feeding Programme - Starter, Grower, Finisher",
        "Broiler Housing and Space Management",
        "Broiler Health and Vaccination Schedule",
        "Growth Monitoring and Feed Conversion Ratio",
        "Biosecurity and Disease Outbreak Response",
        "Slaughter, Processing and Carcass Quality",
        "Broiler Marketing - Butcheries, Restaurants, Wholesale",
        "Broiler Business Economics - Costing, Break-even, Profit",
        "Scaling Broiler Production - From 200 to 5,000 Birds"
    ],
    "layers-production": [
        "The Layers Business - Egg Production Profit Plan",
        "Layer Breeds and Pullet Selection",
        "Pullet Rearing - 0 to 18 Weeks",
        "Layer Feeding Programme - Pre-lay, Peak, Post-peak",
        "Layer Housing and Laying Nest Management",
        "Layer Health and Vaccination Schedule",
        "Egg Production Monitoring - Rate, Egg Weight, Feed",
        "Egg Quality, Handling and Storage",
        "Biosecurity and Disease Prevention in Layers",
        "Culling, Moulting and Flock Replacement",
        "Egg Marketing - Retail, Wholesale, Institutions",
        "Layers Business Economics and Scaling"
    ]
};

async function callDeepSeek(prompt, maxTokens) {
    const body = JSON.stringify({
        model: "deepseek-chat",
        messages: [
            { role: "system", content: "Return valid JSON only. No markdown fences. No explanation." },
            { role: "user", content: prompt }
        ],
        max_tokens: maxTokens || 6000,
        temperature: 0.5
    });
    const resp = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: { "Authorization": "Bearer " + API_KEY, "Content-Type": "application/json" },
        body: body
    });
    if (!resp.ok) throw new Error("API " + resp.status + ": " + (await resp.text()).substring(0, 200));
    return (await resp.json()).choices[0].message.content;
}

function parseLoose(text) {
    let s = text.trim();
    if (s.startsWith("```")) s = s.replace(/^```(?:json)?/, "").replace(/```$/, "").trim();
    try { return JSON.parse(s); } catch (e) { return JSON.parse(jsonrepair(s)); }
}

async function getLessons(courseName, moduleNum, moduleTitle) {
    const prompt = `Create 5 lessons for a training module. Course: "${courseName}". Module ${moduleNum} titled "${moduleTitle}".

Return ONLY this JSON:
{"lessons":[{"title":"string","body":"1200-1600 words of practical Africa-focused training content"},{"title":"string","body":"1200-1600 words"},{"title":"string","body":"1200-1600 words"},{"title":"string","body":"1200-1600 words"},{"title":"string","body":"1200-1600 words"}]}

Rules:
- NO double-quote characters inside any body. Use single quotes instead.
- NO newlines inside body. Use spaces.
- NO backslashes.
- NO HTML tags.
- Practical, business-first, Africa context.
- Output ONLY the JSON object.`;

    const raw = await callDeepSeek(prompt, 7000);
    const parsed = parseLoose(raw);
    if (!parsed.lessons || parsed.lessons.length < 3) throw new Error("Too few lessons");
    return parsed.lessons;
}

async function getQuiz(courseName, moduleNum) {
    const prompt = `Create 8 quiz questions for a training module. Course: "${courseName}". Module ${moduleNum}.

Return ONLY this JSON:
{"quiz":[{"q":"string","options":["A) x","B) y","C) z","D) w"],"answer":"A","explanation":"string"},{"q":"string","options":["A) x","B) y","C) z","D) w"],"answer":"B","explanation":"string"},{"q":"string","options":["A) x","B) y","C) z","D) w"],"answer":"C","explanation":"string"},{"q":"string","options":["A) x","B) y","C) z","D) w"],"answer":"D","explanation":"string"},{"q":"string","options":["A) x","B) y","C) z","D) w"],"answer":"A","explanation":"string"},{"q":"string","options":["A) x","B) y","C) z","D) w"],"answer":"B","explanation":"string"},{"q":"string","options":["A) x","B) y","C) z","D) w"],"answer":"C","explanation":"string"},{"q":"string","options":["A) x","B) y","C) z","D) w"],"answer":"D","explanation":"string"}]}

Rules:
- Exactly 8 questions.
- Options in order A), B), C), D).
- Answer one of A, B, C, D.
- NO double-quotes inside any string.
- NO newlines inside strings.
- NO backslashes.
- Output ONLY the JSON object.`;

    const raw = await callDeepSeek(prompt, 3000);
    const parsed = parseLoose(raw);
    if (!parsed.quiz || parsed.quiz.length < 5) throw new Error("Too few quiz");
    return parsed.quiz;
}

async function generateModule(course, moduleNum) {
    const dir = path.join(ROOT, course.slug);
    fs.mkdirSync(dir, { recursive: true });
    const filePath = path.join(dir, "module-" + String(moduleNum).padStart(2, "0") + ".json");

    if (fs.existsSync(filePath)) {
        console.log("  SKIP (exists):", path.relative(ROOT, filePath));
        return "skip";
    }

    const moduleTitle = (MODULE_TITLES[course.slug] && MODULE_TITLES[course.slug][moduleNum - 1]) || ("Module " + moduleNum);

    if (TEST) { console.log("  TEST mode - would generate:", path.relative(ROOT, filePath)); return "test"; }

    const lessons = await getLessons(course.name, moduleNum, moduleTitle);
    await new Promise(r => setTimeout(r, 1200));
    const quiz = await getQuiz(course.name, moduleNum);

    const result = {
        course: course.name,
        module_number: moduleNum,
        module_title: moduleTitle,
        lessons: lessons,
        quiz: quiz
    };

    fs.writeFileSync(filePath, JSON.stringify(result, null, 2), "utf8");
    console.log("  WROTE:", path.relative(ROOT, filePath), "| lessons:", lessons.length, "| quiz:", quiz.length);
    return "ok";
}

(async () => {
    let ok = 0, skip = 0, err = 0;
    const list = TEST ? COURSES.slice(0, 1) : (ONE ? COURSES.slice(0, 1) : COURSES);

    for (const course of list) {
        console.log("");
        console.log("=== " + course.name + " (" + course.slug + ") ===");
        for (let i = 1; i <= 12; i++) {
            try {
                const r = await generateModule(course, i);
                if (r === "ok") ok++;
                else if (r === "skip") skip++;
            } catch (e) {
                console.log("  ERROR module " + i + ": " + e.message.split("\n")[0]);
                err++;
            }
            await new Promise(r => setTimeout(r, 1500));
        }
    }

    console.log("");
    console.log("=== ALL DONE ===");
    console.log("OK: " + ok + " | Skipped: " + skip + " | Errors: " + err);
})();