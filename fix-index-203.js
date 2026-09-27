const fs = require("fs");
const path = require("path");

const ROOT = "C:/Users/1st choice group/rise-africa-skills";
const files = ["index.html", "course-info.html", "all-courses.html"];

for (const f of files) {
    const fp = path.join(ROOT, f);
    if (!fs.existsSync(fp)) { console.log("SKIP (not found): " + f); continue; }
    let raw = fs.readFileSync(fp, "utf8");
    const before = raw;

    // Replace every remaining "203" that means course count
    raw = raw.replace(/203 Practical Courses/g, "225 Practical Courses");
    raw = raw.replace(/Search 203 courses/g, "Search 225 courses");
    raw = raw.replace(/Showing all 203 courses/g, "Showing all 225 courses");
    raw = raw.replace(/>\s*203\s*</g, ">225<");  // for category card numbers
    raw = raw.replace(/\b203 courses\b/g, "225 courses");
    raw = raw.replace(/\b203 Courses\b/g, "225 Courses");
    raw = raw.replace(/\ball 203\b/g, "all 225");
    raw = raw.replace(/\bAll 203\b/g, "All 225");
    raw = raw.replace(/\bwe have 203\b/g, "we have 225");
    raw = raw.replace(/\b203 complete\b/g, "225 complete");
    raw = raw.replace(/\b203 free\b/g, "225 free");

    if (raw !== before) {
        const beforeCount = (before.match(/\b203\b/g) || []).length;
        const afterCount = (raw.match(/\b203\b/g) || []).length;
        fs.writeFileSync(fp, raw, "utf8");
        console.log("FIXED: " + f + " (" + beforeCount + " -> " + afterCount + " occurrences)");
    } else {
        console.log("No change: " + f);
    }
}

console.log("");
console.log("=== DONE ===");