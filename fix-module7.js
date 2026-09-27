const fs = require("fs");
const path = require("path");
const { jsonrepair } = require("jsonrepair");

const API_KEY = process.env.DEEPSEEK_API_KEY;
if (!API_KEY) { console.log("ERROR: DEEPSEEK_API_KEY not set"); process.exit(1); }

const ROOT = "C:/Users/1st choice group/rise-africa-skills/deep_courses";
const courseSlug = "knife-blacksmith";
const courseName = "Knife Blacksmith";
const moduleNum = 7;

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

(async () => {
    const lessonsPrompt = `Create 4 lessons for training module 7 of "${courseName}".
Return ONLY: {"lessons":[{"title":"string","body":"1200-1400 words"},{"title":"string","body":"1200-1400 words"},{"title":"string","body":"1200-1400 words"},{"title":"string","body":"1200-1400 words"}]}
Rules: NO double-quote characters inside body. NO newlines. NO backslashes. NO HTML. Africa context. Output JSON only.`;
    const rawL = await callDeepSeek(lessonsPrompt, 6500);
    const lessons = parseLoose(rawL).lessons;

    await new Promise(r => setTimeout(r, 1500));

    const quizPrompt = `Create 6 quiz questions for "${courseName}" module 7.
Return ONLY: {"quiz":[{"q":"string","options":["A) x","B) y","C) z","D) w"],"answer":"A","explanation":"string"},{"q":"string","options":["A) x","B) y","C) z","D) w"],"answer":"B","explanation":"string"},{"q":"string","options":["A) x","B) y","C) z","D) w"],"answer":"C","explanation":"string"},{"q":"string","options":["A) x","B) y","C) z","D) w"],"answer":"D","explanation":"string"},{"q":"string","options":["A) x","B) y","C) z","D) w"],"answer":"A","explanation":"string"},{"q":"string","options":["A) x","B) y","C) z","D) w"],"answer":"B","explanation":"string"}]}
Rules: no double-quotes in strings, no newlines, no backslashes. Output JSON only.`;
    const rawQ = await callDeepSeek(quizPrompt, 2500);
    const quiz = parseLoose(rawQ).quiz;

    const result = {
        course: courseName,
        module_number: moduleNum,
        module_title: "Module 7",
        lessons: lessons,
        quiz: quiz
    };

    const dir = path.join(ROOT, courseSlug);
    const filePath = path.join(dir, "module-07.json");
    fs.writeFileSync(filePath, JSON.stringify(result, null, 2), "utf8");
    console.log("WROTE:", filePath);
    console.log("lessons:", lessons.length, "quiz:", quiz.length);
})();