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

function readSafe(p) {
    let raw = fs.readFileSync(p, "utf8");
    while (raw.startsWith("\uFEFF")) raw = raw.slice(1);
    try { return JSON.parse(raw); } catch (e) { return JSON.parse(jsonrepair(raw)); }
}

async function callDeepSeek(prompt) {
    const body = JSON.stringify({
        model: "deepseek-chat",
        messages: [
            { role: "system", content: "Return only a short module title (3-6 words). No quotes. No trailing punctuation. No numbers at start." },
            { role: "user", content: prompt }
        ],
        max_tokens: 40,
        temperature: 0.9
    });
    const resp = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: { "Authorization": "Bearer " + API_KEY, "Content-Type": "application/json" },
        body: body
    });
    if (!resp.ok) throw new Error("API " + resp.status);
    return (await resp.json()).choices[0].message.content.trim();
}

function clean(t) {
    let s = String(t || "").trim();
    s = s.replace(/^["']|["']$/g, "");
    s = s.replace(/[\.\:\!]$/, "");
    s = s.replace(/^Module\s+\d+\s*[\-\:]?\s*/i, "");
    s = s.replace(/\s+/g, " ");
    if (s.length > 55) {
        s = s.substring(0, 55);
        const sp = s.lastIndexOf(" ");
        if (sp > 15) s = s.substring(0, sp);
    }
    return s;
}

(async () => {
    const backupDir = "C:/Users/1st choice group/rise-africa-skills/_unique_titles_backup_" + Date.now();
    fs.mkdirSync(backupDir, { recursive: true });

    let ok = 0, err = 0;

    for (const slug of COURSES) {
        const dir = path.join(ROOT, slug);
        if (!fs.existsSync(dir)) continue;
        const files = fs.readdirSync(dir).filter(f => /^module-\d+\.json$/.test(f)).sort();
        if (files.length === 0) continue;

        console.log("");
        console.log("=== " + slug + " ===");

        const takenTitles = [];

        for (const f of files) {
            const full = path.join(dir, f);
            try {
                const data = readSafe(full);
                const lessonTitles = (data.lessons || []).map(l => l.title).join("; ");

                const avoidList = takenTitles.length > 0
                    ? "Titles already used (DO NOT repeat or paraphrase these):\n" + takenTitles.map((t, i) => "  " + (i+1) + ". " + t).join("\n") + "\n"
                    : "";

                const prompt = `Write a UNIQUE short module title (3-6 words) for module ${data.module_number} of "${data.course}".
Lessons in this module: ${lessonTitles}

${avoidList}
The title must describe what makes THIS module different from the others. Output ONLY the title.`;

                const raw = await callDeepSeek(prompt);
                let newTitle = clean(raw);

                // If duplicate, try once more with stronger instruction
                if (takenTitles.includes(newTitle)) {
                    const prompt2 = `The title "${newTitle}" is already used. Write a DIFFERENT title (3-6 words) for module ${data.module_number} of "${data.course}".
Lessons: ${lessonTitles}
Already used: ${takenTitles.join(" | ")}
Output ONLY the new title.`;
                    const raw2 = await callDeepSeek(prompt2);
                    newTitle = clean(raw2);
                }

                if (takenTitles.includes(newTitle)) {
                    newTitle = newTitle + " (" + data.module_number + ")";
                }

                const bak = path.join(backupDir, slug, f);
                fs.mkdirSync(path.dirname(bak), { recursive: true });
                fs.copyFileSync(full, bak);

                data.module_title = newTitle;
                fs.writeFileSync(full, JSON.stringify(data, null, 2), "utf8");
                takenTitles.push(newTitle);
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