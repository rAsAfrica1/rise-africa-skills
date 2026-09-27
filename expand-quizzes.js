const fs = require("fs");
const path = require("path");
const { jsonrepair } = require("jsonrepair");

const API_KEY = process.env.DEEPSEEK_API_KEY;
if (!API_KEY) { console.log("ERROR: DEEPSEEK_API_KEY not set"); process.exit(1); }

const ROOT = "C:/Users/1st choice group/rise-africa-skills/deep_courses";
const TEST = process.argv.includes("--test");

function readJsonSafe(filePath) {
    let raw = fs.readFileSync(filePath, "utf8");
    while (raw.startsWith("\uFEFF")) raw = raw.slice(1);
    try { return JSON.parse(raw); } catch (e) { return JSON.parse(jsonrepair(raw)); }
}

function isValidModule(data) {
    if (!data || typeof data !== "object") return false;
    if (typeof data.course !== "string" || data.course.length < 2) return false;
    if (typeof data.module_number !== "number") return false;
    if (!Array.isArray(data.lessons) || data.lessons.length < 1) return false;
    if (!Array.isArray(data.quiz)) return false;
    return true;
}

async function callDeepSeek(prompt, maxTokens) {
    const body = JSON.stringify({
        model: "deepseek-chat",
        messages: [
            { role: "system", content: "Return valid JSON only. No markdown fences. No explanation." },
            { role: "user", content: prompt }
        ],
        max_tokens: maxTokens || 5000,
        temperature: 0.7
    });
    const resp = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: { "Authorization": "Bearer " + API_KEY, "Content-Type": "application/json" },
        body: body
    });
    if (!resp.ok) throw new Error("API " + resp.status);
    return (await resp.json()).choices[0].message.content;
}

function parseLoose(text) {
    let s = text.trim();
    if (s.startsWith("```")) s = s.replace(/^```(?:json)?/, "").replace(/```$/, "").trim();
    try { return JSON.parse(s); } catch (e) { return JSON.parse(jsonrepair(s)); }
}

async function expandModule(filePath) {
    const data = readJsonSafe(filePath);

    // GUARD 1: verify the file is a real module before touching it
    if (!isValidModule(data)) {
        throw new Error("Guard 1 failed: file is not a valid module (missing course/lessons/quiz)");
    }

    const have = data.quiz.length;
    const need = 30 - have;
    if (need <= 0) return "skip";

    const lessonTitles = data.lessons.map(l => l.title).join(" | ");
    console.log("  Need " + need + " more quizzes (have " + have + ")");

    const prompt = `Create ${need} multiple-choice quiz questions for this training module.
Course: "${data.course}"
Module ${data.module_number}: "${data.module_title || ""}"
Lesson topics: ${lessonTitles}

Return ONLY this JSON:
{"quiz":[{"q":"string","options":["A) x","B) y","C) z","D) w"],"answer":"A","explanation":"string"}]}

Rules:
- Exactly ${need} questions.
- 4 options each labelled A), B), C), D).
- "answer" is one of A, B, C, D.
- NO double-quote characters inside any string.
- NO newlines inside strings.
- NO backslashes.
- Africa context. Output JSON only.`;

    const apiRaw = await callDeepSeek(prompt, 6000);
    const parsed = parseLoose(apiRaw);
    if (!parsed.quiz || !Array.isArray(parsed.quiz) || parsed.quiz.length < Math.max(5, need - 3)) {
        throw new Error("Got " + (parsed.quiz ? parsed.quiz.length : 0) + " questions, needed " + need);
    }

    data.quiz = data.quiz.concat(parsed.quiz.slice(0, need));

    // GUARD 2: verify the result is still a valid module before writing
    if (!isValidModule(data)) {
        throw new Error("Guard 2 failed: result is not a valid module");
    }
    if (data.quiz.length !== 30) {
        throw new Error("Guard 2 failed: expected 30 quizzes, got " + data.quiz.length);
    }

    return data;
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
                    const j = readJsonSafe(full);
                    if (!isValidModule(j) || j.quiz.length < 30) files.push(full);
                } catch (e) {
                    console.log("SKIP unreadable: " + f);
                }
            }
        }
    }

    console.log("Modules needing expansion: " + files.length);
    if (TEST) files = files.slice(0, 1);

    const backupDir = "C:/Users/1st choice group/rise-africa-skills/_quiz_expand_backup_" + Date.now();
    fs.mkdirSync(backupDir, { recursive: true });

    let ok = 0, skip = 0, err = 0;

    for (const f of files) {
        const rel = path.relative(ROOT, f);
        console.log("");
        console.log("[" + (ok + skip + err + 1) + "/" + files.length + "] " + rel);

        try {
            const result = await expandModule(f);
            if (result === "skip") { console.log("  SKIP"); skip++; continue; }

            // Backup
            const bak = path.join(backupDir, rel);
            fs.mkdirSync(path.dirname(bak), { recursive: true });
            fs.copyFileSync(f, bak);

            // Write to a temp file first (atomic)
            const tmp = f + ".tmp";
            const jsonOut = JSON.stringify(result, null, 2);
            fs.writeFileSync(tmp, jsonOut, "utf8");

            // GUARD 3: verify the temp file is real and reads back correctly
            const checkRaw = fs.readFileSync(tmp, "utf8");
            if (checkRaw.length < 500) throw new Error("Guard 3: temp file too small");
            const checkParsed = JSON.parse(checkRaw);
            if (!isValidModule(checkParsed)) throw new Error("Guard 3: temp file is not a valid module");

            // Only now, overwrite the real file
            fs.renameSync(tmp, f);
            console.log("  WROTE (now " + result.quiz.length + " quizzes)");
            ok++;
        } catch (e) {
            console.log("  ERROR: " + e.message.split("\n")[0]);
            err++;
        }

        await new Promise(r => setTimeout(r, 1500));
    }

    console.log("");
    console.log("=== DONE ===");
    console.log("OK: " + ok + " | Skipped: " + skip + " | Errors: " + err);
    console.log("Backups: " + backupDir);
})();