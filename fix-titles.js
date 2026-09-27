const fs = require("fs");
const path = require("path");
const { jsonrepair } = require("jsonrepair");

const ROOT = "C:/Users/1st choice group/rise-africa-skills/deep_courses";

function readSafe(filePath) {
    let raw = fs.readFileSync(filePath, "utf8");
    while (raw.startsWith("\uFEFF")) raw = raw.slice(1);
    try { return JSON.parse(raw); } catch (e) { return JSON.parse(jsonrepair(raw)); }
}

function makeTitle(firstLessonTitle) {
    // Take first lesson title, trim to sensible length
    let t = String(firstLessonTitle || "").trim();
    if (!t) return null;
    // If too long, cut at 60 chars at word boundary
    if (t.length > 60) {
        t = t.substring(0, 60);
        const lastSpace = t.lastIndexOf(" ");
        if (lastSpace > 20) t = t.substring(0, lastSpace);
    }
    // Strip numbers/dots at start like "1. "
    t = t.replace(/^\d+[\.\)]\s*/, "");
    return t;
}

(async () => {
    const courses = fs.readdirSync(ROOT).filter(n => fs.statSync(path.join(ROOT, n)).isDirectory());
    let fixed = 0, skipped = 0, err = 0;

    for (const slug of courses) {
        const dir = path.join(ROOT, slug);
        const files = fs.readdirSync(dir).filter(f => /^module-\d+\.json$/.test(f));

        for (const f of files) {
            const full = path.join(dir, f);
            try {
                const data = readSafe(full);
                const current = String(data.module_title || "").trim();

                // Skip if title already meaningful (not "Module N")
                if (!/^Module \d+$/.test(current) && current.length > 8) {
                    skipped++;
                    continue;
                }

                const firstLesson = data.lessons && data.lessons[0] ? data.lessons[0].title : null;
                const newTitle = makeTitle(firstLesson);
                if (!newTitle) { err++; continue; }

                data.module_title = newTitle;
                fs.writeFileSync(full, JSON.stringify(data, null, 2), "utf8");
                fixed++;
            } catch (e) {
                console.log("ERR:", slug, f, e.message.split("\n")[0]);
                err++;
            }
        }
    }

    console.log("");
    console.log("=== DONE ===");
    console.log("Fixed: " + fixed);
    console.log("Skipped (already had good titles): " + skipped);
    console.log("Errors: " + err);
})();