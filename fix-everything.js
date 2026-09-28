const fs = require("fs");
const path = require("path");

const ROOT = "C:/Users/1st choice group/rise-africa-skills";
const JSON_ROOT = path.join(ROOT, "deep_courses");

const courses = [];
for (const slug of fs.readdirSync(JSON_ROOT).sort()) {
    const dir = path.join(JSON_ROOT, slug);
    if (!fs.statSync(dir).isDirectory()) continue;
    const mods = fs.readdirSync(dir).filter(f => /^module-\d+\.json$/.test(f));
    if (mods.length === 0) continue;
    let first;
    try { first = JSON.parse(fs.readFileSync(path.join(dir, mods[0]), "utf8").replace(/^\uFEFF/, "")); }
    catch (e) { continue; }
    let landing = null;
    for (const c of [slug + "-course.html", slug + "-business.html"]) {
        if (fs.existsSync(path.join(ROOT, c))) { landing = c; break; }
    }
    courses.push({
        slug,
        name: first.course || slug,
        modules: mods.length,
        lessons: mods.length * 6,
        landing: landing || (slug + "-course.html")
    });
}

const REAL_COUNT = courses.length;
console.log("Real courses from deep_courses:", REAL_COUNT);

function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

let cardsHtml = "";
courses.forEach((c, i) => {
    cardsHtml += `\n  <a class="card" href="${esc(c.landing)}">\n    <div class="num">Course ${i + 1}</div>\n    <h3>${esc(c.name)}</h3>\n    <p>${c.modules} modules - ${c.lessons} lessons</p>\n  </a>`;
});

const allCoursesHtml = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>All ${REAL_COUNT} Courses - rise AFRICA skills</title>
<meta name="description" content="All ${REAL_COUNT} free practical courses from rise AFRICA skills.">
<link rel="icon" href="/og-image.png" type="image/png">
<script>const SUPA='https://lsvmykrentkbcdrzsaqj.supabase.co';const KEY='sb_publishable_zAO9Nei4xwd_aCdqF0tNlg_Be2SYl5K';</script>
<script src="https://unpkg.com/@supabase/supabase-js@2"></script>
<script src="/course-lock.js"></script>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',Tahoma,sans-serif;background:#f7f7f7;color:#222;line-height:1.6}
.container{max-width:1100px;margin:0 auto;padding:20px}
.hero{background:linear-gradient(135deg,#006c35,#008a44);color:#fff;padding:40px 30px;border-radius:10px;margin-bottom:30px}
.hero h1{font-size:2rem;margin-bottom:10px}
.hero p{font-size:1.05rem;opacity:.95}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}
.card{background:#fff;padding:20px;border-radius:10px;box-shadow:0 2px 6px rgba(0,0,0,.06);text-decoration:none;color:inherit;transition:all .2s;display:block}
.card:hover{box-shadow:0 6px 16px rgba(0,0,0,.12);transform:translateY(-2px)}
.card .num{font-size:.75rem;font-weight:700;color:#006c35;letter-spacing:.08em;text-transform:uppercase}
.card h3{font-size:1rem;margin:8px 0 6px;line-height:1.35}
.card p{font-size:.85rem;color:#666}
footer{text-align:center;padding:30px 0;font-size:.85rem;color:#888}
</style></head><body>
<div class="container">
<div class="hero"><h1>All ${REAL_COUNT} Courses</h1><p>Click any course to view its full module list.</p></div>
<div class="grid">${cardsHtml}
</div>
<footer>rise AFRICA skills - ${REAL_COUNT} courses - Free practical training for Africa</footer>
</div></body></html>`;

fs.writeFileSync(path.join(ROOT, "all-courses.html"), allCoursesHtml, "utf8");
console.log("Rebuilt all-courses.html with", REAL_COUNT, "courses");

const htmlFiles = fs.readdirSync(ROOT).filter(f => f.endsWith(".html"));
let touched = 0;
let total = 0;
for (const f of htmlFiles) {
    const fp = path.join(ROOT, f);
    let raw = fs.readFileSync(fp, "utf8");
    const before = raw;
    const bc = (raw.match(/\b203\b/g) || []).length;
    raw = raw.replace(/\b203 courses\b/g, REAL_COUNT + " courses");
    raw = raw.replace(/\b203 Courses\b/g, REAL_COUNT + " Courses");
    raw = raw.replace(/\b203 complete courses\b/g, REAL_COUNT + " complete courses");
    raw = raw.replace(/\b203 Practical Courses\b/g, REAL_COUNT + " Practical Courses");
    raw = raw.replace(/Search 203 courses/g, "Search " + REAL_COUNT + " courses");
    raw = raw.replace(/Showing all 203 courses/g, "Showing all " + REAL_COUNT + " courses");
    raw = raw.replace(/\ball 203\b/g, "all " + REAL_COUNT);
    raw = raw.replace(/\bAll 203\b/g, "All " + REAL_COUNT);
    raw = raw.replace(/\bwe have 203\b/g, "we have " + REAL_COUNT);
    raw = raw.replace(/\b203 free\b/g, REAL_COUNT + " free");
    raw = raw.replace(/>\s*203\s*</g, ">" + REAL_COUNT + "<");
    if (raw !== before) {
        fs.writeFileSync(fp, raw, "utf8");
        const ac = (raw.match(/\b203\b/g) || []).length;
        touched++;
        total += bc - ac;
    }
}
console.log("Files updated:", touched);
console.log("Total 203->" + REAL_COUNT + " replacements:", total);

console.log("");
console.log("=== Pages still mentioning 203 ===");
let leftover = 0;
for (const f of htmlFiles) {
    const raw = fs.readFileSync(path.join(ROOT, f), "utf8");
    const m = raw.match(/\b203\b/g);
    if (m) { console.log("  " + f + ": " + m.length); leftover += m.length; }
}
console.log("Total 203 remaining:", leftover);
console.log("");
console.log("=== DONE ===");