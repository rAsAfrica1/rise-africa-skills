const fs = require("fs");
const path = require("path");
const { jsonrepair } = require("jsonrepair");

const API_KEY = process.env.DEEPSEEK_API_KEY;
if (!API_KEY) { console.log("ERROR: DEEPSEEK_API_KEY not set"); process.exit(1); }

const ROOT = "C:/Users/1st choice group/rise-africa-skills/deep_courses";
const TEST = process.argv.includes("--test");

const SLUG = "young-animal-milk-replacer";
const TITLE = "Young Animal Milk Replacer and Supplement Feeding";

const MODULES = [
    "The Business of Young Animal Rearing",
    "Colostrum and the First 24 Hours",
    "Ingredient Database for Milk Replacers",
    "Formulation and Reconstitution Calculations",
    "Piglet Milk Replacer and Creep Feed",
    "Calf Milk Replacer and Feeding Schedule",
    "Kid and Lamb Milk Replacer",
    "Puppy and Kitten Milk Replacer",
    "Feeding Frequency, Volume and Hygiene",
    "Safety: The Do's and Don'ts",
    "Troubleshooting Common Problems",
    "Business, Costing and Scaling"
];

async function callDeepSeek(prompt, maxTokens) {
    const body = JSON.stringify({
        model: "deepseek-chat",
        messages: [
            { role: "system", content: "You are a veterinary nutrition expert writing practical training for African smallholders. Return valid JSON only." },
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

async function getLessons(num, title) {
    const prompt = `Write 5 detailed lessons for module ${num} of "${TITLE}" - "${title}".

This course covers young animal feeding: piglets, calves, goat kids, lambs, puppies, kittens.

Return ONLY:
{"lessons":[{"title":"string","body":"1400-1800 words of practical, fact-based training"}]}

Rules:
- 5 lessons, 1400-1800 words each, plain text
- Cite real sources by name: FAO, Teagasc (Ireland), Denkavit, NAP (National Academies Press), MaxCare (NZ), Royal Canin, university extension
- Include real measurements: grams of powder per litre, feeding temperatures in Celsius, daily volumes as percent of body weight
- Cover Africa context: local milk powder suppliers, cost in KES/NGN/ZAR, common mistakes
- Include specific numbers, not vague advice
- NO double-quote characters inside body - use single quotes only
- NO newlines inside body
- NO backslashes
- NO HTML tags
- Output ONLY the JSON.`;

    const raw = await callDeepSeek(prompt, 8000);
    const parsed = parseLoose(raw);
    if (!parsed.lessons || parsed.lessons.length < 4) throw new Error("Too few lessons");
    return parsed.lessons;
}

async function getQuiz(num, title) {
    const prompt = `Write 30 multiple-choice quiz questions for module ${num} of "${TITLE}" - "${title}".

Return ONLY:
{"quiz":[{"q":"string","options":["A) x","B) y","C) z","D) w"],"answer":"A","explanation":"string"}]}

Rules:
- Exactly 30 questions
- 4 options A), B), C), D)
- answer is one of A, B, C, D
- Test real understanding of animal feeding: volumes, temperatures, ingredients, safety
- Mix of recall, calculation, and application questions
- NO double-quotes inside any string
- NO newlines inside strings
- NO backslashes
- Output JSON only.`;

    const raw = await callDeepSeek(prompt, 5000);
    const parsed = parseLoose(raw);
    if (!parsed.quiz || parsed.quiz.length < 25) throw new Error("Too few quiz");
    return parsed.quiz;
}

async function getVideos(title) {
    const prompt = `Write 3 YouTube search queries for a video about "${title}" for a course called "${TITLE}" - young animal feeding for piglets, calves, kids, lambs, puppies, kittens.

Return ONLY: {"videos":["query 1","query 2","query 3"]}

Rules: plain strings, no objects, no double-quotes inside strings, output JSON only.`;
    const raw = await callDeepSeek(prompt, 500);
    const parsed = parseLoose(raw);
    const vids = (parsed.videos || []).filter(v => typeof v === "string").slice(0, 3);
    if (vids.length < 3) throw new Error("Too few videos");
    return vids.map(q => ({ title: q, query: q }));
}

(async () => {
    const courseDir = path.join(ROOT, SLUG);
    fs.mkdirSync(courseDir, { recursive: true });

    let ok = 0, skip = 0, err = 0;
    const count = TEST ? 1 : 12;

    for (let i = 1; i <= count; i++) {
        const title = MODULES[i - 1] || ("Module " + i);
        const file = path.join(courseDir, "module-" + String(i).padStart(2, "0") + ".json");

        if (fs.existsSync(file)) {
            console.log("SKIP (exists): " + path.basename(file));
            skip++;
            continue;
        }

        console.log("");
        console.log("Module " + i + ": " + title);

        try {
            console.log("  Lessons...");
            const lessons = await getLessons(i, title);
            await new Promise(r => setTimeout(r, 1500));

            console.log("  Quiz...");
            const quiz = await getQuiz(i, title);
            await new Promise(r => setTimeout(r, 1500));

            console.log("  Videos...");
            const videos = await getVideos(title);

            const data = {
                course: TITLE,
                module_number: i,
                module_title: title,
                lessons: lessons,
                quiz: quiz,
                videos: videos
            };

            fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
            console.log("  WROTE (lessons=" + lessons.length + " quiz=" + quiz.length + " videos=" + videos.length + ")");
            ok++;
        } catch (e) {
            console.log("  ERROR: " + e.message.split("\n")[0]);
            err++;
        }
        await new Promise(r => setTimeout(r, 2000));
    }

    console.log("");
    console.log("=== DONE ===");
    console.log("OK: " + ok + " | Skipped: " + skip + " | Errors: " + err);
})();