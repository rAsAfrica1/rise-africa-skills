const fs = require("fs");
const path = require("path");

const ROOT = "C:/Users/1st choice group/rise-africa-skills";
const JSON_ROOT = path.join(ROOT, "deep_courses");

function escJson(s) {
    return String(s == null ? "" : s).replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\r?\n/g, " ");
}

function wordCount(s) {
    return String(s || "").trim().split(/\s+/).filter(Boolean).length;
}

const courses = [];
for (const slug of fs.readdirSync(JSON_ROOT).sort()) {
    const dir = path.join(JSON_ROOT, slug);
    if (!fs.statSync(dir).isDirectory()) continue;
    const modFiles = fs.readdirSync(dir).filter(f => /^module-\d+\.json$/.test(f)).sort();
    if (modFiles.length === 0) continue;

    let first;
    try { first = JSON.parse(fs.readFileSync(path.join(dir, modFiles[0]), "utf8").replace(/^\uFEFF/, "")); }
    catch (e) { continue; }

    const modules = [];
    let totalWords = 0;
    let totalQuiz = 0;
    let totalVideos = 0;
    let totalLessons = 0;

    for (const f of modFiles) {
        let j;
        try { j = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8").replace(/^\uFEFF/, "")); }
        catch (e) { continue; }

        const lessonTitles = (j.lessons || []).map(l => l.title).filter(Boolean);
        const videoQuery = (j.videos && j.videos[0] && j.videos[0].query) || (j.course + " " + (j.module_title || "")).toLowerCase();

        // calculate word count from all lesson bodies (skip the Practical Reference which is HTML)
        let modWords = 0;
        for (const l of (j.lessons || [])) {
            const body = String(l.body || "");
            if (body.trim().startsWith("<")) continue;
            modWords += wordCount(body);
        }
        totalWords += modWords;
        totalQuiz += (j.quiz || []).length;
        totalVideos += (j.videos || []).length;
        totalLessons += lessonTitles.length;

        modules.push([j.module_title || ("Module " + j.module_number), lessonTitles, videoQuery]);
    }

    courses.push({
        slug,
        title: first.course || slug,
        modules,
        moduleCount: modules.length,
        lessonCount: totalLessons,
        wordCount: totalWords,
        quizCount: totalQuiz,
        videoCount: totalVideos
    });
}

console.log("Courses built:", courses.length);

// ---------- 1. Rebuild the D dictionary in course-info.html ----------
const ciPath = path.join(ROOT, "course-info.html");
let ci = fs.readFileSync(ciPath, "utf8");

const dStart = ci.indexOf("var D");
if (dStart < 0) { console.log("STOP: 'var D' not found"); process.exit(1); }
const braceStart = ci.indexOf("{", dStart);
if (braceStart < 0) { console.log("STOP: opening brace not found"); process.exit(1); }

let depth = 0;
let braceEnd = -1;
for (let i = braceStart; i < ci.length; i++) {
    if (ci[i] === "{") depth++;
    else if (ci[i] === "}") { depth--; if (depth === 0) { braceEnd = i; break; } }
}
if (braceEnd < 0) { console.log("STOP: matching brace not found"); process.exit(1); }

let newD = "var D = {\n";
courses.forEach((c, i) => {
    const modulesJson = c.modules.map(m => {
        const title = escJson(m[0]);
        const lessons = m[1].map(l => '"' + escJson(l) + '"').join(",");
        const vq = escJson(m[2]);
        return `["${title}",[${lessons}],"${vq}"]`;
    }).join(",");

    newD += `  "${c.slug}":{"n":${i + 1},"t":"${escJson(c.title)}","e":"","cat":"COURSE","b":"Twelve modules, ${c.lessonCount} written lessons, ${c.quizCount} quiz questions.","brand":"#006c35","acc":"#008a44","L":${c.lessonCount},"W":${c.wordCount},"Q":${c.quizCount},"V":${c.videoCount},"m":[${modulesJson}]}`;
    if (i < courses.length - 1) newD += ",";
    newD += "\n";
});
newD += "}";

const before = ci.length;
ci = ci.substring(0, dStart) + newD + ci.substring(braceEnd + 1);
fs.writeFileSync(ciPath, ci, "utf8");
console.log("course-info.html: " + before + " -> " + ci.length);

// ---------- 2. Rebuild all-courses.html ----------
function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

let cards = "";
courses.forEach((c, i) => {
    const link = c.slug + "-course.html";
    cards += `\n  <a class="card" href="${esc(link)}">\n    <div class="num">Course ${i + 1}</div>\n    <h3>${esc(c.title)}</h3>\n    <p>${c.moduleCount} modules &middot; ${c.lessonCount} lessons</p>\n  </a>`;
});

const acHtml = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>All ${courses.length} Courses - rise AFRICA skills</title>
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
<div class="grid">${cards}
</div>
<footer>rise AFRICA skills - ${courses.length} courses - Free practical training for Africa</footer>
</div></body></html>`;

fs.writeFileSync(path.join(ROOT, "all-courses.html"), acHtml, "utf8");
console.log("all-courses.html rebuilt with " + courses.length + " courses");
console.log("");
console.log("=== DONE ===");