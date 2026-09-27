const fs = require("fs");
const path = require("path");
const { jsonrepair } = require("jsonrepair");

const API_KEY = process.env.DEEPSEEK_API_KEY;
if (!API_KEY) { console.log("ERROR: DEEPSEEK_API_KEY not set"); process.exit(1); }

const ROOT = "C:/Users/1st choice group/rise-africa-skills/deep_courses";
const TEST = process.argv.includes("--test");

function readSafe(filePath) {
    let raw = fs.readFileSync(filePath, "utf8");
    while (raw.startsWith("\uFEFF")) raw = raw.slice(1);
    try { return JSON.parse(raw); } catch (e) { return JSON.parse(jsonrepair(raw)); }
}

async function callDeepSeek(prompt, maxTokens) {
    const body = JSON.stringify({
        model: "deepseek-chat",
        messages: [
            { role: "system", content: "Return only a short title. No quotes. No punctuation at the end. Max 8 words." },
            { role: "user", content: prompt }
        ],
        max_tokens: maxTokens || 40,
        temperature: 0.5
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
    if (s.length > 70) {
        s = s.substring(0, 70);
        const sp = s.lastIndexOf(" ");
        if (sp > 20) s = s.substring(0, sp);
    }
    return s;
}

async function makeTitle(data) {
    const lessonTitles = (data.lessons || []).map(l => l.title).join("; ");
    const prompt = `Create a short module title (max 6 words) for this training module.
Course: "${data.course}"
Module ${data.module_number}
Lesson topics: ${lessonTitles}
Return only the title text, nothing else.`;
    const raw = await callDeepSeek(prompt, 40);
    return cleanTitle(raw);
}

(async () => {
    const courses = fs.readdirSync(ROOT).filter(n => fs.statSync(path.join(ROOT, n)).isDirectory());
    let files = [];
    for (const c of courses) {
        const dir = path.join(ROOT, c);
        for (const f of fs.readdirSync(dir)) {
            if (/^module-\d+\.json$/.test(f)) {
                const full = path.join(dir, f);
                try {
                    const j = readSafe(full);
                    const t = String(j.module_title || "").trim();
                    const bad = /^Module \d+/.test(t) || /Lesson \d+/.test(t) || t.length > 70;
                    if (bad) files.push(full);
                } catch (e) { }
            }
        }
    }
    console.log("Modules needing new titles: " + files.length);
    if (TEST) files = files.slice(0, 1);

    const backupDir = "C:/Users/1st choice group/rise-africa-skills/_titles_backup_" + Date.now();
    fs.mkdirSync(backupDir, { recursive: true });

    let ok = 0, err = 0;

    for (const f of files) {
        const rel = path.relative(ROOT, f);
        try {
            const data = readSafe(f);
            const newTitle = await makeTitle(data);
            if (!newTitle || newTitle.length < 4) throw new Error("Empty title");

            const bak = path.join(backupDir, rel);
            fs.mkdirSync(path.dirname(bak), { recursive: true });
            fs.copyFileSync(f, bak);

            data.module_title = newTitle;
            fs.writeFileSync(f, JSON.stringify(data, null, 2), "utf8");
            console.log("[" + (ok+1) + "/" + files.length + "] " + rel + " -> " + newTitle);
            ok++;
        } catch (e) {
            console.log("ERR " + rel + ": " + e.message.split("\n")[0]);
            err++;
        }
        await new Promise(r => setTimeout(r, 800));
    }

    console.log("");
    console.log("=== DONE ===");
    console.log("OK: " + ok + " | Errors: " + err);
    console.log("Backups: " + backupDir);
})();