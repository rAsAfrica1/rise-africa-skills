const fs = require("fs");
const path = require("path");
const { jsonrepair } = require("jsonrepair");

const API_KEY = process.env.DEEPSEEK_API_KEY;
if (!API_KEY) { console.log("ERROR: DEEPSEEK_API_KEY not set"); process.exit(1); }

const ROOT = "C:/Users/1st choice group/rise-africa-skills/deep_courses";
const TEST = process.argv.includes("--test");

const BROKEN = [
    "sheet-metal-work/module-02.json",
    "shona-language/module-03.json",
    "shona-language/module-12.json"
];

function titleFromSlug(slug) {
    return slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

async function callDeepSeek(prompt) {
    const body = JSON.stringify({
        model: "deepseek-chat",
        messages: [
            { role: "system", content: "Return valid JSON only. No markdown fences. No explanation." },
            { role: "user", content: prompt }
        ],
        max_tokens: 8000,
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

async function regen(relPath) {
    const full = path.join(ROOT, relPath);
    const parts = relPath.split("/");
    const courseSlug = parts[0];
    const moduleNum = parseInt(parts[1].match(/(\d+)/)[1]);
    const courseName = titleFromSlug(courseSlug);

    console.log("Regenerating:", relPath, "| Course:", courseName, "| Module:", moduleNum);

    const prompt = `Create a training module as valid JSON. Course: "${courseName}". Module: ${moduleNum}.

Structure:
{
  "course": "${courseName}",
  "module_number": ${moduleNum},
  "module_title": "string",
  "lessons": [
    {"title": "string", "body": "string"},
    {"title": "string", "body": "string"},
    {"title": "string", "body": "string"},
    {"title": "string", "body": "string"},
    {"title": "string", "body": "string"}
  ],
  "quiz": [
    {"q": "string", "options": ["A) x","B) y","C) z","D) w"], "answer": "B", "explanation": "string"}
  ]
}

Rules that MUST be followed:
- Exactly 5 lessons. Each body is 1200-1600 words.
- Exactly 8 quiz questions.
- NO double-quote characters inside any string value. Use single quotes or none.
- NO newlines inside strings. Use spaces.
- NO backslashes anywhere in body or explanation text.
- NO HTML tags.
- Africa context. Practical. Business-first.
- Output ONLY the JSON object. No markdown. No commentary.`;

    const raw = await callDeepSeek(prompt);
    const parsed = parseLoose(raw);
    if (!parsed.lessons || parsed.lessons.length < 3) throw new Error("Too few lessons (" + (parsed.lessons ? parsed.lessons.length : 0) + ")");
    if (!parsed.quiz || parsed.quiz.length < 5) throw new Error("Too few quiz (" + (parsed.quiz ? parsed.quiz.length : 0) + ")");

    if (TEST) { console.log("  TEST OK. Lessons:", parsed.lessons.length, "Quiz:", parsed.quiz.length); return; }

    const backupDir = "C:/Users/1st choice group/rise-africa-skills/_regen_last3_backup_" + Date.now();
    const bak = path.join(backupDir, relPath);
    fs.mkdirSync(path.dirname(bak), { recursive: true });
    if (fs.existsSync(full)) fs.copyFileSync(full, bak);
    fs.writeFileSync(full, JSON.stringify(parsed, null, 2), "utf8");
    console.log("  WROTE. Lessons:", parsed.lessons.length, "Quiz:", parsed.quiz.length);
}

(async () => {
    const list = TEST ? BROKEN.slice(0, 1) : BROKEN;
    let ok = 0, err = 0;
    for (const rel of list) {
        try { await regen(rel); ok++; }
        catch (e) { console.log("  ERROR:", e.message.split("\n")[0]); err++; }
        await new Promise(r => setTimeout(r, 2000));
    }
    console.log("");
    console.log("Done. OK:", ok, "| Errors:", err);
})();