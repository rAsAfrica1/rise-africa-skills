const fs = require("fs");
const path = require("path");

const ROOT = "C:/Users/1st choice group/rise-africa-skills";
const JSON_ROOT = path.join(ROOT, "deep_courses");

// Read every course with its module titles
const courses = [];
for (const slug of fs.readdirSync(JSON_ROOT).sort()) {
    const dir = path.join(JSON_ROOT, slug);
    if (!fs.statSync(dir).isDirectory()) continue;
    const mods = fs.readdirSync(dir).filter(f => /^module-\d+\.json$/.test(f)).sort();
    if (mods.length === 0) continue;

    let first;
    try { first = JSON.parse(fs.readFileSync(path.join(dir, mods[0]), "utf8").replace(/^\uFEFF/, "")); }
    catch (e) { continue; }

    const moduleTitles = [];
    for (const f of mods) {
        try {
            const j = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8").replace(/^\uFEFF/, ""));
            moduleTitles.push(j.module_title || ("Module " + j.module_number));
        } catch (e) { moduleTitles.push(""); }
    }

    courses.push({
        slug,
        title: first.course || slug,
        modules: moduleTitles,
        moduleCount: mods.length,
        lessons: mods.length * 6
    });
}

console.log("Courses read from deep_courses:", courses.length);

// ---------- Rebuild the D dictionary in course-info.html ----------
const ciPath = path.join(ROOT, "course-info.html");
let ci = fs.readFileSync(ciPath, "utf8");

// Find "var D = {" and matching closing brace
const dStart = ci.indexOf("var D");
if (dStart < 0) {
    console.log("STOP: could not find 'var D' in course-info.html");
    process.exit(1);
}
const braceStart = ci.indexOf("{", dStart);
if (braceStart < 0) { console.log("STOP: no opening brace"); process.exit(1); }

// Find matching closing brace by counting
let depth = 0;
let braceEnd = -1;
for (let i = braceStart; i < ci.length; i++) {
    const c = ci[i];
    if (c === "{") depth++;
    else if (c === "}") { depth--; if (depth === 0) { braceEnd = i; break; } }
}
if (braceEnd < 0) { console.log("STOP: could not find matching brace"); process.exit(1); }

// Build new dictionary
let newD = "var D = {\n";
courses.forEach((c, i) => {
    const key = c.slug;
    const safeTitle = c.title.replace(/"/g, '\\"');
    const modulesArr = c.modules.map(m => '"' + String(m).replace(/"/g, '\\"') + '"').join(",");
    newD += `  "${key}": { t: "${safeTitle}", m: [${modulesArr}], cat: "COURSE" }`;
    if (i < courses.length - 1) newD += ",";
    newD += "\n";
});
newD += "}";

const before = ci.length;
ci = ci.substring(0, dStart) + newD + ci.substring(braceEnd + 1);
fs.writeFileSync(ciPath, ci, "utf8");
console.log("course-info.html: dictionary replaced. Size " + before + " -> " + ci.length);

// ---------- Rebuild all-courses.html ----------
function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

let cardsHtml = "";
courses.forEach((c, i) => {
    const n = i + 1;
    const link = c.slug + "-course.html";
    cardsHtml += `\n  <a class="card" href="${esc(link)}">\n    <div class="num">Course ${n}</div>\n    <h3>${esc(c.title)}</h3>\n    <p>AGRICULTURE &middot; ${c.moduleCount} modules &middot; ${c.lessons} lessons</p>\n  </a>`;
});

const acHtml = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>All ${courses.length} Courses - rise AFRICA skills</title>
<meta name="description" content="All ${courses.length} free practical courses from rise AFRICA skills.">
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
<div class="hero"><h1>All ${courses.length} Courses</h1><p>Click any course to view its full module list.</p></div>
<div class="grid">${cardsHtml}
</div>
<footer>rise AFRICA skills - ${courses.length} courses - Free practical training for Africa</footer>
</div></body></html>`;

fs.writeFileSync(path.join(ROOT, "all-courses.html"), acHtml, "utf8");
console.log("all-courses.html rebuilt with " + courses.length + " courses");

console.log("");
console.log("=== DONE ===");