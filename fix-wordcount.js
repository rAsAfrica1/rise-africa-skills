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

function countWords(s) {
    const t = String(s || "").trim();
    if (!t) return 0;
    // Skip HTML bodies (Practical Reference)
    if (t.startsWith("<")) return 0;
    return t.split(/\s+/).filter(Boolean).length;
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
    let totalLessons = 0;
    let totalWords = 0;

    for (const f of modFiles) {
        let j;
        try { j = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8").replace(/^\uFEFF/, "")); }
        catch (e) { continue; }

        let lessonTitles = [];
        if (Array.isArray(j.lessons)) {
            for (const l of j.lessons) {
                let title = "", body = "";
                if (typeof l === "string") { title = l; }
                else if (l && typeof l === "object") {
                    title = (typeof l.title === "string") ? l.title : "";
                    body = (typeof l.body === "string") ? l.body : "";
                }
                if (title) lessonTitles.push(title);
                totalWords += countWords(body);
            }
        }
        totalLessons += lessonTitles.length;

        let videoQuery = "";
        if (Array.isArray(j.videos) && j.videos[0]) {
            const v = j.videos[0];
            videoQuery = (typeof v === "string") ? v : (typeof v.query === "string" ? v.query : "");
        }
        if (!videoQuery) videoQuery = ((j.course || "") + " " + (j.module_title || "")).toLowerCase().trim();

        modules.push([String(j.module_title || ""), lessonTitles, videoQuery]);
    }

    courses.push({
        slug,
        title: String(first.course || slug),
        modules,
        moduleCount: modules.length,
        lessonCount: totalLessons,
        wordCount: totalWords
    });
}

console.log("Courses:", courses.length);
console.log("Sample word counts:");
courses.slice(0, 5).forEach(c => console.log("  " + c.slug + ": " + c.wordCount + " words, " + c.lessonCount + " lessons"));

const lines = ["var D = {"];
courses.forEach((c, i) => {
    const modulesJson = c.modules.map(m => {
        const t = escJson(m[0]);
        const lessonsArr = "[" + m[1].map(l => '"' + escJson(l) + '"').join(",") + "]";
        const vq = escJson(m[2]);
        return `["${t}",${lessonsArr},"${vq}"]`;
    }).join(",");

    const entry = `  "${c.slug}":{"n":${i+1},"t":"${escJson(c.title)}","e":"","cat":"COURSE","b":"Twelve modules, ${c.lessonCount} written lessons.","brand":"#006c35","acc":"#008a44","L":${c.lessonCount},"W":${c.wordCount},"Q":360,"V":12,"m":[${modulesJson}]}`;
    lines.push(entry + (i < courses.length - 1 ? "," : ""));
});
lines.push("}");
const newD = lines.join("\n");

// Validate
const testFile = path.join(ROOT, "_dict_check2.js");
fs.writeFileSync(testFile, newD + "\nmodule.exports = D;", "utf8");
try {
    delete require.cache[require.resolve(testFile)];
    const D = require(testFile);
    console.log("");
    console.log("Validate keys:", Object.keys(D).length);
    console.log("advanced-welding W:", D["advanced-welding"].W, "L:", D["advanced-welding"].L);
    console.log("pig-farming W:", D["pig-farming"].W);
} catch (e) {
    console.log("VALIDATE FAIL:", e.message);
    try { fs.unlinkSync(testFile); } catch (e) {}
    process.exit(1);
}
try { fs.unlinkSync(testFile); } catch (e) {}

const ciPath = path.join(ROOT, "course-info.html");
let ci = fs.readFileSync(ciPath, "utf8");
const origLen = ci.length;

const dStart = ci.indexOf("var D");
const braceStart = ci.indexOf("{", dStart);
let depth = 0, braceEnd = -1;
for (let i = braceStart; i < ci.length; i++) {
    if (ci[i] === "{") depth++;
    else if (ci[i] === "}") { depth--; if (depth === 0) { braceEnd = i; break; } }
}

ci = ci.substring(0, dStart) + newD + ci.substring(braceEnd + 1);
fs.writeFileSync(ciPath, ci, "utf8");
console.log("");
console.log("course-info.html:", origLen, "->", ci.length);
console.log("=== DONE ===");