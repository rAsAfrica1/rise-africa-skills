const fs = require("fs");
const path = require("path");

const ROOT = "C:/Users/1st choice group/rise-africa-skills";
const JSON_ROOT = path.join(ROOT, "deep_courses");

function escJson(s) {
    return String(s == null ? "" : s)
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '\\"')
        .replace(/\r?\n/g, " ")
        .replace(/\t/g, " ");
}

const courses = [];
for (const slug of fs.readdirSync(JSON_ROOT).sort()) {
    const dir = path.join(JSON_ROOT, slug);
    if (!fs.statSync(dir).isDirectory()) continue;
    const modFiles = fs.readdirSync(dir).filter(f => /^module-\d+\.json$/.test(f)).sort();
    if (modFiles.length === 0) continue;

    let first;
    try { first = JSON.parse(fs.readFileSync(path.join(dir, modFiles[0]), "utf8").replace(/^\uFEFF/, "")); }
    catch (e) { console.log("SKIP bad JSON: " + slug); continue; }

    const modules = [];
    let totalLessons = 0;

    for (const f of modFiles) {
        let j;
        try { j = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8").replace(/^\uFEFF/, "")); }
        catch (e) { continue; }

        let lessonTitles = [];
        if (Array.isArray(j.lessons)) {
            lessonTitles = j.lessons
                .map(l => (typeof l === "string") ? l : (l && typeof l.title === "string" ? l.title : ""))
                .filter(s => s && s.length > 0);
        }
        totalLessons += lessonTitles.length;

        let videoQuery = "";
        if (Array.isArray(j.videos) && j.videos[0]) {
            const v = j.videos[0];
            videoQuery = (typeof v === "string") ? v : (typeof v.query === "string" ? v.query : "");
        }
        if (!videoQuery) {
            videoQuery = ((j.course || "") + " " + (j.module_title || "")).toLowerCase().trim();
        }

        const modTitle = String(j.module_title || ("Module " + (j.module_number || modules.length + 1)));
        modules.push([modTitle, lessonTitles, videoQuery]);
    }

    courses.push({
        slug,
        title: String(first.course || slug),
        modules,
        moduleCount: modules.length,
        lessonCount: totalLessons
    });
}

console.log("Courses:", courses.length);

// Build D
const lines = ["var D = {"];
courses.forEach((c, i) => {
    const modulesJson = c.modules.map(m => {
        const t = escJson(m[0]);
        const lessonsArr = "[" + m[1].map(l => '"' + escJson(l) + '"').join(",") + "]";
        const vq = escJson(m[2]);
        return `["${t}",${lessonsArr},"${vq}"]`;
    }).join(",");

    const entry = `  "${c.slug}":{"n":${i+1},"t":"${escJson(c.title)}","e":"","cat":"COURSE","b":"Twelve modules, ${c.lessonCount} written lessons.","brand":"#006c35","acc":"#008a44","L":${c.lessonCount},"W":0,"Q":360,"V":12,"m":[${modulesJson}]}`;
    lines.push(entry + (i < courses.length - 1 ? "," : ""));
});
lines.push("}");
const newD = lines.join("\n");

// Validate before writing
const testFile = path.join(ROOT, "_dict_check.js");
fs.writeFileSync(testFile, newD + "\nmodule.exports = D;", "utf8");
let valid = false;
try {
    delete require.cache[require.resolve(testFile)];
    const D = require(testFile);
    const keys = Object.keys(D);
    console.log("Validate: keys =", keys.length);
    const aw = D["advanced-welding"];
    if (aw) {
        console.log("advanced-welding modules:", aw.m.length);
        console.log("m[0] title:", aw.m[0][0]);
        console.log("m[0][1] is array:", Array.isArray(aw.m[0][1]), "length:", aw.m[0][1].length);
        console.log("m[0][2]:", aw.m[0][2]);
    }
    valid = true;
} catch (e) {
    console.log("VALIDATE FAIL:", e.message);
} finally {
    try { fs.unlinkSync(testFile); } catch (e) {}
}

if (!valid) {
    console.log("Structure is invalid. Not writing.");
    process.exit(1);
}

// Replace in course-info.html
const ciPath = path.join(ROOT, "course-info.html");
let ci = fs.readFileSync(ciPath, "utf8");
const origLen = ci.length;

const dStart = ci.indexOf("var D");
if (dStart < 0) { console.log("STOP: no var D"); process.exit(1); }
const braceStart = ci.indexOf("{", dStart);
let depth = 0, braceEnd = -1;
for (let i = braceStart; i < ci.length; i++) {
    if (ci[i] === "{") depth++;
    else if (ci[i] === "}") { depth--; if (depth === 0) { braceEnd = i; break; } }
}
if (braceEnd < 0) { console.log("STOP: no matching brace"); process.exit(1); }

ci = ci.substring(0, dStart) + newD + ci.substring(braceEnd + 1);
fs.writeFileSync(ciPath, ci, "utf8");
console.log("");
console.log("course-info.html size:", origLen, "->", ci.length);
console.log("=== DONE ===");