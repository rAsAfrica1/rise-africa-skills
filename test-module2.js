const fs = require("fs");
const { jsonrepair } = require("jsonrepair");
const API_KEY = process.env.DEEPSEEK_API_KEY;
if (!API_KEY) { console.log("NO API KEY"); process.exit(1); }

async function call(prompt) {
    const r = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: { "Authorization": "Bearer " + API_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({
            model: "deepseek-chat",
            messages: [
                { role: "system", content: "Return valid JSON only. No markdown." },
                { role: "user", content: prompt }
            ],
            max_tokens: 8000,
            temperature: 0.5
        })
    });
    if (!r.ok) throw new Error("HTTP " + r.status + ": " + (await r.text()).substring(0,200));
    return (await r.json()).choices[0].message.content;
}

(async () => {
    const prompt = `Write 5 lessons for module 2 of "Young Animal Milk Replacer and Supplement Feeding" - "Colostrum and the First 24 Hours".

Return ONLY: {"lessons":[{"title":"string","body":"1400-1800 words"}]}

Rules:
- 5 lessons about colostrum timing, quality, and first feeds in piglets, calves, kids, lambs, puppies, kittens
- Cite FAO, Teagasc, NAP, Denkavit by name
- Include real numbers: hours, volumes, temperatures
- NO double-quotes inside body - use single quotes
- NO newlines inside body
- NO backslashes
- NO HTML
- Output JSON only.`;

    console.log("Calling API...");
    try {
        const raw = await call(prompt);
        console.log("Raw response length:", raw.length);
        console.log("First 300 chars:", raw.substring(0, 300));
        const parsed = JSON.parse(raw);
        console.log("Lessons:", parsed.lessons.length);
    } catch (e) {
        console.log("PARSE FAIL:", e.message);
        console.log("First 800 chars of raw response:");
        const raw = await call(prompt).catch(x => "API also failed: " + x.message);
        console.log(raw.substring(0, 800));
    }
})();