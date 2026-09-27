const fs = require("fs");
const path = require("path");

const ROOT = "C:/Users/1st choice group/rise-africa-skills";
const JSON_ROOT = path.join(ROOT, "deep_courses");

// ---------- Build course list ----------
const courses = [];
for (const slug of fs.readdirSync(JSON_ROOT).sort()) {
    const dir = path.join(JSON_ROOT, slug);
    if (!fs.statSync(dir).isDirectory()) continue;
    const mods = fs.readdirSync(dir).filter(f => /^module-\d+\.json$/.test(f));
    if (mods.length === 0) continue;
    let first = null;
    try {
        first = JSON.parse(fs.readFileSync(path.join(dir, mods[0]), "utf8").replace(/^\uFEFF/, ""));
    } catch (e) { continue; }

    // find landing page URL
    let landing = null;
    for (const cand of [slug + "-course.html", slug + "-business.html"]) {
        if (fs.existsSync(path.join(ROOT, cand))) { landing = cand; break; }
    }
    if (!landing) {
        // try any file starting with slug
        const cands = fs.readdirSync(ROOT).filter(f => f.startsWith(slug) && (f.endsWith("-course.html") || f.endsWith("-business.html")));
        if (cands.length > 0) landing = cands[0];
    }

    courses.push({
        slug,
        name: first.course || slug,
        modules: mods.length,
        lessons: mods.length * 6,
        landing: landing
    });
}

console.log("Courses found:", courses.length);

// ---------- Regenerate all-courses.html ----------
function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

let rows = "";
courses.forEach((c, i) => {
    const num = String(i + 1).padStart(2, "0");
    const link = c.landing || (c.slug + "-course.html");
    rows += "  <a class='card' href='" + esc(link) + "'>\n";
    rows += "    <div class='num'>Course " + (i + 1) + "</div>\n";
    rows += "    <h3>" + esc(c.name) + "</h3>\n";
    rows += "    <p>" + c.modules + " modules - " + c.lessons + " lessons</p>\n";
    rows += "  </a>\n";
});

const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>All ${courses.length} Courses - rise AFRICA skills</title>
<meta name="description" content="All ${courses.length} free courses from rise AFRICA skills. Practical, business-first training for Africa.">
<link rel="icon" href="/og-image.png" type="image/png">
<script>const SUPA='https://lsvmykrentkbcdrzsaqj.supabase.co';const KEY='sb_publishable_zAO9Nei4xwd_aCdqF0tNlg_Be2SYl5K';</script>
<script src="https://unpkg.com/@supabase/supabase-js@2"></script>
<script src="/course-lock.js"></script>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #f7f7f7; color: #222; line-height: 1.6; }
.container { max-width: 1100px; margin: 0 auto; padding: 20px; }
.hero { background: linear-gradient(135deg, #006c35, #008a44); color: white; padding: 40px 30px; border-radius: 10px; margin-bottom: 30px; }
.hero h1 { font-size: 2rem; margin-bottom: 10px; }
.hero p { font-size: 1.05rem; opacity: .95; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
.card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 6px rgba(0,0,0,.06); text-decoration: none; color: inherit; transition: all .2s; display: block; }
.card:hover { box-shadow: 0 6px 16px rgba(0,0,0,.12); transform: translateY(-2px); }
.card .num { font-size: .75rem; font-weight: 700; color: #006c35; letter-spacing: .08em; text-transform: uppercase; }
.card h3 { font-size: 1rem; margin: 8px 0 6px; line-height: 1.35; }
.card p { font-size: .85rem; color: #666; }
footer { text-align: center; padding: 30px 0; font-size: .85rem; color: #888; }
</style></head><body>
<div class="container">
<div class="hero">
<h1>All ${courses.length} Courses</h1>
<p>Click any course to view the full module list and enroll.</p>
</div>
<div class="grid">
${rows}
</div>
<footer>rise AFRICA skills - ${courses.length} courses - Free practical training for Africa</footer>
</div></body></html>`;

fs.writeFileSync(path.join(ROOT, "all-courses.html"), html, "utf8");
console.log("Regenerated all-courses.html with", courses.length, "courses");

// ---------- Replace 203 with 225 in every HTML file ----------
let replacedFiles = 0;
let totalRepl = 0;
for (const f of fs.readdirSync(ROOT)) {
    if (!f.endsWith(".html")) continue;
    const fp = path.join(ROOT, f);
    let raw = fs.readFileSync(fp, "utf8");
    const before = raw;
    raw = raw.replace(/\b203 courses\b/g, courses.length + " courses");
    raw = raw.replace(/\b203 Courses\b/g, courses.length + " Courses");
    raw = raw.replace(/\b203 complete courses\b/g, courses.length + " complete courses");
    raw = raw.replace(/\bwe have 203\b/g, "we have " + courses.length);
    raw = raw.replace(/\ball 203\b/g, "all " + courses.length);
    raw = raw.replace(/\bAll 203\b/g, "All " + courses.length);
    raw = raw.replace(/\b203 free courses\b/g, courses.length + " free courses");
    if (raw !== before) {
        const c = (before.match(/\b203\b/g) || []).length - (raw.match(/\b203\b/g) || []).length;
        fs.writeFileSync(fp, raw, "utf8");
        replacedFiles++;
        totalRepl += c;
    }
}
console.log("Files with '203' replaced:", replacedFiles, "| total replacements:", totalRepl);

// ---------- Fix broken module links ----------
const moduleSlugs = {};
for (const f of fs.readdirSync(ROOT)) {
    const m = f.match(/^(.+)-module-(\d+)\.html$/);
    if (!m) continue;
    const slug = m[1];
    if (!moduleSlugs[slug]) moduleSlugs[slug] = new Set();
    moduleSlugs[slug].add(parseInt(m[2]));
}

let brokenFixed = 0;
for (const f of fs.readdirSync(ROOT)) {
    if (!/-(course|business)\.html$/.test(f)) continue;
    const fp = path.join(ROOT, f);
    let raw = fs.readFileSync(fp, "utf8");
    const before = raw;
    const links = [...new Set([...raw.matchAll(/href="([^"]*-module-\d+\.html)"/g)].map(x => x[1]))];
    for (const link of links) {
        if (fs.existsSync(path.join(ROOT, link))) continue;
        const m = link.match(/module-(\d+)\.html$/);
        if (!m) continue;
        const num = parseInt(m[1]);
        // find any moduleSlug that has this number
        for (const slug of Object.keys(moduleSlugs)) {
            if (moduleSlugs[slug].has(num)) {
                const newLink = slug + "-module-" + num + ".html";
                if (fs.existsSync(path.join(ROOT, newLink))) {
                    raw = raw.split('"' + link + '"').join('"' + newLink + '"');
                    brokenFixed++;
                    break;
                }
            }
        }
    }
    if (raw !== before) fs.writeFileSync(fp, raw, "utf8");
}
console.log("Broken module links rewritten:", brokenFixed);
console.log("");
console.log("=== DONE ===");