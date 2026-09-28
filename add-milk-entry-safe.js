const fs = require("fs");
const path = require("path");

const ROOT = "C:/Users/1st choice group/rise-africa-skills";
const JSON_ROOT = path.join(ROOT, "deep_courses");
const SLUG = "young-animal-milk-replacer";
const COURSE_DIR = path.join(JSON_ROOT, SLUG);
const CI = path.join(ROOT, "course-info.html");

const MIN_SIZE = 1000000; // file must be over 1 MB before and after

function esc(s) {
    return String(s == null ? "" : s)
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '\\"')
        .replace(/\r?\n/g, " ")
        .replace(/\t/g, " ");
}
function countWords(s) {
    const t = String(s || "").trim();
    if (!t) return 0;
    if (t.startsWith("<")) return 0;
    return t.split(/\s+/).filter(Boolean).length;
}

let ci = fs.readFileSync(CI, "utf8");
const origSize = ci.length;
console.log("Original size:", origSize);
if (origSize < MIN_SIZE) { console.log("STOP: file too small, restore from git first"); process.exit(1); }
if (ci.includes('"' + SLUG + '"')) { console.log("Already has this course"); process.exit(0); }

// Read 12 modules
const modFiles = fs.readdirSync(COURSE_DIR).filter(f => /^module-\d+\.json$/.test(f)).sort();
const modules = [];
let totalLessons = 0, totalWords = 0, totalQuiz = 0, totalVideos = 0;

for (const f of modFiles) {
    let j = JSON.parse(fs.readFileSync(path.join(COURSE_DIR, f), "utf8").replace(/^\uFEFF/, ""));
    const lessonTitles = [];
    if (Array.isArray(j.lessons)) {
        for (const l of j.lessons) {
            if (typeof l === "string") lessonTitles.push(l);
            else if (l && typeof l === "object" && typeof l.title === "string") {
                lessonTitles.push(l.title);
                totalWords += countWords(l.body);
            }
        }
    }
    totalLessons += lessonTitles.length;
    totalQuiz += (j.quiz || []).length;
    totalVideos += (j.videos || []).length;

    let vq = "";
    if (Array.isArray(j.videos) && j.videos[0]) {
        const v = j.videos[0];
        vq = (typeof v === "string") ? v : (v && typeof v.query === "string") ? v.query : "";
    }
    if (!vq) vq = (j.course + " " + j.module_title).toLowerCase();

    modules.push([String(j.module_title || ""), lessonTitles, vq]);
}
console.log("Modules:", modules.length, "| Lessons:", totalLessons, "| Words:", totalWords);

// Find max n
const nMatches = [...ci.matchAll(/"n":(\d+)/g)].map(m => parseInt(m[1]));
const maxN = Math.max(...nMatches);
const newN = maxN + 1;
console.log("Max n:", maxN, "-> new n:", newN);

// Build entry
const modulesJson = modules.map(m => {
    const t = esc(m[0]);
    const lessonsArr = "[" + m[1].map(l => '"' + esc(l) + '"').join(",") + "]";
    const vq = esc(m[2]);
    return `["${t}",${lessonsArr},"${vq}"]`;
}).join(",");

const entry = `"${SLUG}":{"n":${newN},"t":"Young Animal Milk Replacer and Supplement Feeding","e":"","cat":"COURSE","b":"Twelve modules, ${totalLessons} written lessons. Colostrum, milk replacer formulas, feeding schedules and safety for piglets, calves, kids, lambs, puppies and kittens.","brand":"#006c35","acc":"#008a44","L":${totalLessons},"W":${totalWords},"Q":${totalQuiz},"V":${totalVideos},"m":[${modulesJson}]}`;

// Find the closing of the D dictionary. It is exactly: \n};
// Find the FIRST one after "var D = {"
const dStart = ci.indexOf("var D");
if (dStart < 0) { console.log("STOP: var D not found"); process.exit(1); }
const closeIdx = ci.indexOf("\n};", dStart);
if (closeIdx < 0) { console.log("STOP: closing }; not found"); process.exit(1); }
console.log("Closing }; found at:", closeIdx);

// The character right before closeIdx is the last } of the last course entry.
// We insert: ,\n  <new entry>  right before that \n};
const insert = ",\n  " + entry;

const newCi = ci.substring(0, closeIdx) + insert + ci.substring(closeIdx);
const newSize = newCi.length;
const delta = newSize - origSize;
console.log("Size change:", delta, "bytes");

// Strict safety checks
if (delta < 2000 || delta > 15000) {
    console.log("STOP: size change abnormal. No write.");
    process.exit(1);
}
if (newSize < MIN_SIZE) {
    console.log("STOP: result too small. No write.");
    process.exit(1);
}

fs.writeFileSync(CI, newCi, "utf8");
console.log("WROTE. New size:", newSize);
console.log("=== DONE ===");