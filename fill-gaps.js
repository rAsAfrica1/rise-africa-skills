const fs = require("fs");
const path = require("path");
const { jsonrepair } = require("jsonrepair");

const API_KEY = process.env.DEEPSEEK_API_KEY;
if (!API_KEY) { console.log("ERROR: DEEPSEEK_API_KEY not set"); process.exit(1); }

const ROOT = "C:/Users/1st choice group/rise-africa-skills/deep_courses";
const TEST = process.argv.includes("--test");

const COURSES = [
    { slug: "business-chinese-arabic-russian-translation", name: "Business Chinese, Arabic and Russian Translation" },
    { slug: "organic-manure-33-ingredients", name: "Organic Manure with 33 Ingredients" },
    { slug: "plumbing", name: "Plumbing" },
    { slug: "purchasing-and-procurement", name: "Purchasing and Procurement" },
    { slug: "township-and-village-enterprise-management", name: "Township and Village Enterprise Management" }
];

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
    if (!resp.ok) throw new Error("API " + resp.status);
    return (await resp.json()).choices[0].message.content;
}

function parseLoose(text) {
    let s = text.trim();
    if (s.startsWith("```")) s = s.replace(/^```(?:json)?/, "").replace(/```$/, "").trim();
    try { return JSON.parse(s); } catch (e) { return JSON.parse(jsonrepair(s)); }
}

function missingNumber(slug) {
    const dir = path.join(ROOT, slug);
    if (!fs.existsSync(dir)) return 1;
    const files = fs.readdirSync(dir).filter(n => /^module-\d+\.json$/.test(n));
    const nums = files.map(n => parseInt(n.match(/(\d+)/)[1]));
    for (let i = 1; i <= 12; i++) { if (!nums.includes(i)) return i; }
    return null;
}

async function generate(slug, name, num) {
    console.log("Generating", slug, "module", num);

    const lessonPrompt = `Create 5 lessons for training module ${num} of "${name}".
Return ONLY: {"lessons":[{"title":"string","body":"1200-1500 words"},{"title":"string","body":"1200-1500 words"},{"title":"string","body":"1200-1500 words"},{"title":"string","body":"1200-1500 words"},{"title":"string","body":"1200-1500 words"}]}
Rules: NO double-quote characters inside body. NO newlines. NO backslashes. NO HTML. Africa context. Practical. Output JSON only.`;
    const rawL = await callDeepSeek(lessonPrompt, 7000);
    const lessons = parseLoose(rawL).lessons;
    if (lessons.length < 3) throw new Error("Too few lessons");

    await new Promise(r => setTimeout(r, 1500));

    const quizPrompt = `Create 8 quiz questions for "${name}" module ${num}.
Return ONLY: {"quiz":[{"q":"string","options":["A) x","B) y","C) z","D) w"],"answer":"A","explanation":"string"},{"q":"string","options":["A) x","B) y","C) z","D) w"],"answer":"B","explanation":"string"},{"q":"string","options":["A) x","B) y","C) z","D) w"],"answer":"C","explanation":"string"},{"q":"string","options":["A) x","B) y","C) z","D) w"],"answer":"D","explanation":"string"},{"q":"string","options":["A) x","B) y","C) z","D) w"],"answer":"A","explanation":"string"},{"q":"string","options":["A) x","B) y","C) z","D) w"],"answer":"B","explanation":"string"},{"q":"string","options":["A) x","B) y","C) z","D) w"],"answer":"C","explanation":"string"},{"q":"string","options":["A) x","B) y","C) z","D) w"],"answer":"D","explanation":"string"}]}
Rules: no double-quotes in strings, no newlines, no backslashes. Output JSON only.`;
    const rawQ = await callDeepSeek(quizPrompt, 3000);
    const quiz = parseLoose(rawQ).quiz;
    if (quiz.length < 5) throw new Error("Too few quiz");

    const result = {
        course: name,
        module_number: num,
        module_title: "Module " + num,
        lessons: lessons,
        quiz: quiz
    };

    if (TEST) { console.log("  TEST OK. lessons:", lessons.length, "quiz:", quiz.length); return; }

    const filePath = path.join(ROOT, slug, "module-" + String(num).padStart(2, "0") + ".json");
    fs.writeFileSync(filePath, JSON.stringify(result, null, 2), "utf8");
    console.log("  WROTE:", path.relative(ROOT, filePath), "| lessons:", lessons.length, "| quiz:", quiz.length);
}

(async () => {
    const list = TEST ? COURSES.slice(0, 1) : COURSES;
    let ok = 0, err = 0;
    for (const c of list) {
        const num = missingNumber(c.slug);
        if (num === null) { console.log("SKIP (complete):", c.slug); continue; }
        try { await generate(c.slug, c.name, num); ok++; }
        catch (e) { console.log("  ERROR:", e.message.split("\n")[0]); err++; }
        await new Promise(r => setTimeout(r, 1500));
    }
    console.log("");
    console.log("Done. OK:", ok, "| Errors:", err);
})();