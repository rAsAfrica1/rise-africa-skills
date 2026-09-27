const fs = require("fs");
const path = require("path");
const { jsonrepair } = require("jsonrepair");

const API_KEY = process.env.DEEPSEEK_API_KEY;
if (!API_KEY) { console.log("ERROR: DEEPSEEK_API_KEY not set"); process.exit(1); }

const ROOT = "C:/Users/1st choice group/rise-africa-skills/deep_courses";

const COURSES = [
    "broiler-production","layers-production","knife-blacksmith",
    "steel-fixing-rebar","scaffolding","plumbing","road-construction",
    "painting-and-decorating","greenhouse-vegetable-farming",
    "agricultural-irrigation-technician","machinery-operation-and-repair",
    "township-and-village-enterprise-management",
    "business-chinese-arabic-russian-translation",
    "small-shop-and-market-trading","export-sales-agent",
    "customs-brokerage","purchasing-and-procurement",
    "foreign-trade-negotiation","yok-pan-blacksmith",
    "organic-manure-33-ingredients","bee-farming-and-honey-production"
];

function readSafe(filePath) {
    let raw = fs.readFileSync(filePath, "utf8");
    while (raw.startsWith("\uFEFF")) raw = raw.slice(1);
    try { return JSON.parse(raw); } catch (e) { return JSON.parse(jsonrepair(raw)); }
}

async function callDeepSeek(prompt, maxTokens) {
    const body = JSON.stringify({
        model: "deepseek-chat",
        messages: [
            { role: "system", content: "Return only a short module title. No quotes. No trailing punctuation. Max 6 words." },
            { role: "user", content: prompt }
        ],
        max_tokens: 40,
        temperature: 0.6
    });
    const resp = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: { "Authorization": "Bearer " + API_KEY, "Content-Type": "application/json" },
        body: body
    });
    if (!resp.ok) throw new Error("API " + resp.status);
    const j = await resp.json();
    return j.choices[0].message.content.trim();
}

function cleanTitle(t) {
    let s = String(t || "").trim();
    s = s.replace(/^["']|["']$/g, "");
    s = s.replace(/[\.\:]$/, "");
    s = s.replace(/^Module\s+\d+\s*[\-\:]?\s*/i, "");
    s = s.replace(/\s+/g, " ");
    if (s.length > 60) {
        s = s.substring(0, 60);
        const sp = s.lastIndexOf(" ");
        if (sp > 15) s = s.substring(0, sp);
    }
    return s;
}

(async () => {
    const backupDir = "C:/Users/1st choice group/rise-africa-skills/_force_titles_backup_" + Date.now();
    fs.mkdirSync(backupDir, { recursive: true });

    let ok = 0, err = 0;

    for (const slug of COURSES) {
        const dir = path.join(ROOT, slug);
        if (!fs.existsSync(dir)) { console.log("SKIP missing: " + slug); continue; }

        const files = fs.readdirSync(dir).filter(f => /^module-\d+\.json$/.test(f)).sort();
        console.log("");
        console.log("=== " + slug + " (" + files.length + " modules) ===");

        for (const f of files) {
            const full = path.join(dir, f);
            try {
                const data = readSafe(full);
                const lessonTitles = (data.lessons || []).map(l => l.title).join("; ");

                const prompt = `Write a short, specific module title (max 6 words) for a training module.
Course: "${data.course}"
Module ${data.module_number}
Lessons: ${lessonTitles}
Return ONLY the title text, nothing else.`;

                const rawTitle = await callDeepSeek(prompt, 40);
                const newTitle = cleanTitle(rawTitle);
                if (!newTitle || newTitle.length < 4) throw new Error("Empty title");

                const bak = path.join(backupDir, slug, f);
                fs.mkdirSync(path.dirname(bak), { recursive: true });
                fs.copyFileSync(full, bak);

                data.module_title = newTitle;
                fs.writeFileSync(full, JSON.stringify(data, null, 2), "utf8");
                console.log("  " + f + " -> " + newTitle);
                ok++;
            } catch (e) {
                console.log("  ERR " + f + ": " + e.message.split("\n")[0]);
                err++;
            }
            await new Promise(r => setTimeout(r, 700));
        }
    }

    console.log("");
    console.log("=== DONE ===");
    console.log("OK: " + ok + " | Errors: " + err);
    console.log("Backups: " + backupDir);
})();