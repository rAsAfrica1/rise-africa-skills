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
        max_tokens: maxTokens || 1500,
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

function normalizeVideos(videos) {
    // Accept either array of strings or array of objects
    const out = [];
    for (const v of videos) {
        if (typeof v === "string" && v.trim()) {
            const q = v.trim();
            out.push({ title: q.charAt(0).toUpperCase() + q.slice(1), query: q });
        } else if (v && typeof v === "object" && (v.query || v.q || v.search)) {
            const q = (v.query || v.q || v.search).trim();
            const t = (v.title || q).trim();
            out.push({ title: t, query: q });
        }
    }
    return out.slice(0, 3);
}

async function addVideos(filePath) {
    const data = readJsonSafe(filePath);
    if (!isValidModule(data)) throw new Error("Not a valid module");

    if (Array.isArray(data.videos) && data.videos.length >= 3) {
        // Already has 3 videos, but check they are objects not strings
        const fixed = normalizeVideos(data.videos);
        if (fixed.length === 3 && typeof data.videos[0] === "object" && data.videos[0].query) {
            return "skip";
        }
        data.videos = fixed;
        return data;
    }

    const lessonTitles = data.lessons.map(l => l.title).join(" | ");

    const prompt = `You are picking 3 YouTube search queries for a training module.
Course: "${data.course}"
Module ${data.module_number}: "${data.module_title || ""}"
Lesson topics: ${lessonTitles}

Return ONLY this JSON:
{"videos":["search query 1","search query 2","search query 3"]}

Rules:
- Exactly 3 plain string search queries (no objects).
- Each query should find a relevant practical tutorial on YouTube.
- Queries should include the course topic so results are relevant.
- NO double-quote characters inside any string.
- NO backslashes.
- Output JSON only.`;

    const apiRaw = await callDeepSeek(prompt, 1000);
    const parsed = parseLoose(apiRaw);
    const vids = normalizeVideos(parsed.videos || []);
    if (vids.length < 3) throw new Error("Only " + vids.length + " valid queries returned");

    data.videos = vids;

    if (!isValidModule(data)) throw new Error("Result invalid");
    if (!Array.isArray(data.videos) || data.videos.length !== 3) throw new Error("Wrong video count");
    if (!data.videos[0].query) throw new Error("Video has no query");

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
                    const v = j.videos;
                    const ok = Array.isArray(v) && v.length >= 3 && typeof v[0] === "object" && v[0].query;
                    if (!ok) files.push(full);
                } catch (e) { }
            }
        }
    }

    console.log("Modules needing videos: " + files.length);
    if (TEST) files = files.slice(0, 1);

    const backupDir = "C:/Users/1st choice group/rise-africa-skills/_videos_backup_" + Date.now();
    fs.mkdirSync(backupDir, { recursive: true });

    let ok = 0, skip = 0, err = 0;

    for (const f of files) {
        const rel = path.relative(ROOT, f);
        console.log("");
        console.log("[" + (ok + skip + err + 1) + "/" + files.length + "] " + rel);

        try {
            const result = await addVideos(f);
            if (result === "skip") { console.log("  SKIP"); skip++; continue; }

            const bak = path.join(backupDir, rel);
            fs.mkdirSync(path.dirname(bak), { recursive: true });
            fs.copyFileSync(f, bak);

            const tmp = f + ".tmp";
            fs.writeFileSync(tmp, JSON.stringify(result, null, 2), "utf8");

            const checkRaw = fs.readFileSync(tmp, "utf8");
            if (checkRaw.length < 500) throw new Error("Temp file too small");
            const checkParsed = JSON.parse(checkRaw);
            if (!isValidModule(checkParsed)) throw new Error("Temp not valid module");

            fs.renameSync(tmp, f);
            console.log("  WROTE - queries: " + result.videos.map(v => v.query).join(" / "));
            ok++;
        } catch (e) {
            console.log("  ERROR: " + e.message.split("\n")[0]);
            err++;
        }

        await new Promise(r => setTimeout(r, 1000));
    }

    console.log("");
    console.log("=== DONE ===");
    console.log("OK: " + ok + " | Skipped: " + skip + " | Errors: " + err);
    console.log("Backups: " + backupDir);
})();