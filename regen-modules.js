const fs = require("fs");
const { jsonrepair } = require("jsonrepair");
const path = require("path");

const API_KEY = process.env.DEEPSEEK_API_KEY;
if (!API_KEY) { console.log("ERROR: DEEPSEEK_API_KEY not set"); process.exit(1); }

const ROOT = "C:/Users/1st choice group/rise-africa-skills/deep_courses";
const TEST = process.argv.includes("--test");

const BROKEN = [
    "ginger-amp-turmeric-shots-amp-teas/module-11.json",
    "gold-smelting-refining/module-11.json",
    "pest-control-business-basic-to-medium/module-05.json",
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
            { role: "system", content: "You write clear, factual training content for African farmers and entrepreneurs. Return valid JSON only." },
            { role: "user", content: prompt }
        ],
        max_tokens: 6000,
        temperature: 0.7
    });
    const resp = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + API_KEY,
            "Content-Type": "application/json"
        },
        body: body
    });
    if (!resp.ok) {
        throw new Error("API " + resp.status + ": " + (await resp.text()).substring(0, 200));
    }
    const data = await resp.json();
    return data.choices[0].message.content;
}

function parseJSONLoose(text) {
    let s = text.trim();
    if (s.startsWith("```")) {
        s = s.replace(/^```(?:json)?/, "").replace(/```$/, "").trim();
    }
    try { return JSON.parse(s); } catch (e) {
        const repaired = jsonrepair(s);
        return JSON.parse(repaired);
    }
}

async function regenModule(relPath) {
    const full = path.join(ROOT, relPath);
    const parts = relPath.split("/");
    const courseSlug = parts[0];
    const moduleFile = parts[1];
    const moduleNum = parseInt(moduleFile.match(/(\d+)/)[1]);
    const courseName = titleFromSlug(courseSlug);

    console.log("Regenerating:", relPath);

    const prompt = `Write a complete training module as valid JSON. Course: "${courseName}". Module number: ${moduleNum}.

Return ONLY this exact JSON structure, nothing else:
{
  "course": "${courseName}",
  "module_number": ${moduleNum},
  "module_title": "<write an appropriate title for module ${moduleNum}>",
  "lessons": [
    { "title": "<lesson title>", "body": "<1500-2000 words of detailed, factual content. Use plain text, no HTML tags. Africa context. Business-first.>" },
    { "title": "<lesson title 2>", "body": "<1500-2000 words>" },
    { "title": "<lesson title 3>", "body": "<1500-2000 words>" },
    { "title": "<lesson title 4>", "body": "<1500-2000 words>" },
    { "title": "<lesson title 5>", "body": "<1500-2000 words>" },
    { "title": "<lesson title 6>", "body": "<1500-2000 words>" }
  ],
  "quiz": [
    { "q": "<question>", "options": ["A) ...", "B) ...", "C) ...", "D) ..."], "answer": "B", "explanation": "<why>" }
  ]
}

Requirements:
- Exactly 6 lessons.
- Exactly 10 quiz questions.
- Body text must not contain any double quotes ("). Use single quotes or avoid quotes. If you must quote, rephrase.
- Body text must not contain newlines. Use spaces only.
- Valid JSON. Test it in your head before outputting.
- Output ONLY the JSON object, no markdown fences, no preamble.`;

    const raw = await callDeepSeek(prompt);
    const parsed = parseJSONLoose(raw);
    if (!parsed.lessons || parsed.lessons.length < 3) throw new Error("Too few lessons");
    if (!parsed.quiz || parsed.quiz.length < 5) throw new Error("Too few quiz questions");
    if (TEST) {
        console.log("  WOULD WRITE (test mode). Lessons:", parsed.lessons.length, "Quiz:", parsed.quiz.length);
        return;
    }
    const backupDir = "C:/Users/1st choice group/rise-africa-skills/_regen_backup_" + Date.now();
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
        try {
            await regenModule(rel);
            ok++;
        } catch (e) {
            console.log("  ERROR:", e.message.split("\n")[0]);
            err++;
        }
        await new Promise(r => setTimeout(r, 2000));
    }
    console.log("");
    console.log("Done. OK:", ok, "| Errors:", err);
})();