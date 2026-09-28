const fs = require("fs");
const path = require("path");
const { jsonrepair } = require("jsonrepair");

const API_KEY = process.env.DEEPSEEK_API_KEY;
if (!API_KEY) { console.log("ERROR: DEEPSEEK_API_KEY not set"); process.exit(1); }

const ROOT = "C:/Users/1st choice group/rise-africa-skills/deep_courses/water-tank-construction";

async function callDeepSeek(prompt, maxTokens) {
    const body = JSON.stringify({
        model: "deepseek-chat",
        messages: [
            { role: "system", content: "You are an African agribusiness expert. Output HTML only." },
            { role: "user", content: prompt }
        ],
        max_tokens: maxTokens || 6000,
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

(async () => {
    const files = fs.readdirSync(ROOT).filter(f => /^module-\d+\.json$/.test(f)).sort();
    console.log("Modules found: " + files.length);

    let ok = 0, skip = 0, err = 0;

    for (const f of files) {
        const full = path.join(ROOT, f);
        console.log("");
        console.log(f);

        try {
            let raw = fs.readFileSync(full, "utf8");
            while (raw.startsWith("\uFEFF")) raw = raw.slice(1);
            const data = JSON.parse(raw);

            // Skip if already enriched
            const hasEnrich = (data.lessons || []).some(l => l.title === "Practical Reference");
            if (hasEnrich) { console.log("  SKIP: already enriched"); skip++; continue; }

            const courseName = data.course;
            const moduleTitle = data.module_title;
            const lessonTitles = (data.lessons || []).map(l => l.title).join(" | ");

            const prompt = `Write a 'Practical Reference' lesson for the rise AFRICA skills course "${courseName}", module "${moduleTitle}".

The existing lessons in this module cover: ${lessonTitles}

Write clean HTML. Include:
1. An h2 heading "Practical Reference: ${moduleTitle}"
2. 1 inline SVG diagram inside a figure with figcaption citing a real source (FAO, WHO, national water authorities, university extension)
3. 2 data tables with real figures and sources
4. 1 red safety warning box if relevant
5. A "Quick Reference Checklist" with 6-8 points
6. A "Further Reading" section with 3-5 free official links
7. Africa context - currencies KES/NGN/ZAR/GHS, local materials, climate

Output HTML only. Start with <section> and end with </section>. Do not wrap in markdown.

NO double-quote characters inside the HTML - use single quotes.
NO newlines except between block elements.`;

            console.log("  Calling DeepSeek...");
            const enrichment = await callDeepSeek(prompt, 6000);
            if (!enrichment || enrichment.length < 500) throw new Error("Too short");

            const newLesson = { title: "Practical Reference", body: enrichment };
            data.lessons.push(newLesson);

            // Verify structure before write
            if (!Array.isArray(data.lessons) || data.lessons.length < 6) throw new Error("Bad structure");

            fs.writeFileSync(full, JSON.stringify(data, null, 2), "utf8");
            console.log("  WROTE");
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