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

async function regenLessons(courseName, moduleNum) {
    const prompt = `Create 5 lessons for a training module. Course: "${courseName}". Module: ${moduleNum}.

Return ONLY this JSON structure:
{
  "lessons": [
    {"title": "string", "body": "1200-1600 words of practical Africa-focused training content"},
    {"title": "string", "body": "1200-1600 words"},
    {"title": "string", "body": "1200-1600 words"},
    {"title": "string", "body": "1200-1600 words"},
    {"title": "string", "body": "1200-1600 words"}
  ]
}

Rules:
- NO double-quote characters inside any body. Use single quotes instead.
- NO newlines inside body. Use spaces.
- NO backslashes.
- NO HTML tags.
- Practical, business-first, Africa context.
- Output ONLY the JSON object. Nothing else.`;

    const raw = await callDeepSeek(prompt, 7000);
    const parsed = parseLoose(raw);
    if (!parsed.lessons || parsed.lessons.length < 3) throw new Error("Too few lessons");
    return parsed.lessons;
}

async function regenQuiz(courseName, moduleNum) {
    const prompt = `Create 8 quiz questions for a training module. Course: "${courseName}". Module: ${moduleNum}.

Return ONLY this JSON structure:
{
  "quiz": [
    {"q": "string", "options": ["A) x","B) y","C) z","D) w"], "answer": "A", "explanation": "string"},
    {"q": "string", "options": ["A) x","B) y","C) z","D) w"], "answer": "B", "explanation": "string"},
    {"q": "string", "options": ["A) x","B) y","C) z","D) w"], "answer": "C", "explanation": "string"},
    {"q": "string", "options": ["A) x","B) y","C) z","D) w"], "answer": "D", "explanation": "string"},
    {"q": "string", "options": ["A) x","B) y","C) z","D) w"], "answer": "A", "explanation": "string"},
    {"q": "string", "options": ["A) x","B) y","C) z","D) w"], "answer": "B", "explanation": "string"},
    {"q": "string", "options": ["A) x","B) y","C) z","D) w"], "answer": "C", "explanation": "string"},
    {"q": "string", "options": ["A) x","B) y","C) z","D) w"], "answer": "D", "explanation": "string"}
  ]
}

Rules:
- Exactly 8 questions.
- Options must be A), B), C), D) in that order.
- Answer must be one of A, B, C, D.
- NO double-quote characters inside any string. Use single quotes instead.
- NO newlines inside strings.
- NO backslashes.
- Output ONLY the JSON object. Nothing else.`;

    const raw = await callDeepSeek(prompt, 3000);
    const parsed = parseLoose(raw);
    if (!parsed.quiz || parsed.quiz.length < 5) throw new Error("Too few quiz");
    return parsed.quiz;
}

async function regenModule(relPath) {
    const full = path.join(ROOT, relPath);
    const parts = relPath.split("/");
    const courseSlug = parts[0];
    const moduleNum = parseInt(parts[1].match(/(\d+)/)[1]);
    const courseName = titleFromSlug(courseSlug);

    console.log("Regenerating:", relPath);

    const lessons = await regenLessons(courseName, moduleNum);
    console.log("  Lessons:", lessons.length);
    await new Promise(r => setTimeout(r, 1500));

    const quiz = await regenQuiz(courseName, moduleNum);
    console.log("  Quiz:", quiz.length);

    const result = {
        course: courseName,
        module_number: moduleNum,
        module_title: "Module " + moduleNum,
        lessons: lessons,
        quiz: quiz
    };

    if (TEST) { console.log("  TEST OK"); return; }

    const backupDir = "C:/Users/1st choice group/rise-africa-skills/_regen_last3b_backup_" + Date.now();
    const bak = path.join(backupDir, relPath);
    fs.mkdirSync(path.dirname(bak), { recursive: true });
    if (fs.existsSync(full)) fs.copyFileSync(full, bak);
    fs.writeFileSync(full, JSON.stringify(result, null, 2), "utf8");
    console.log("  WROTE");
}

(async () => {
    const list = TEST ? BROKEN.slice(0, 1) : BROKEN;
    let ok = 0, err = 0;
    for (const rel of list) {
        try { await regenModule(rel); ok++; }
        catch (e) { console.log("  ERROR:", e.message.split("\n")[0]); err++; }
        await new Promise(r => setTimeout(r, 2000));
    }
    console.log("");
    console.log("Done. OK:", ok, "| Errors:", err);
})();