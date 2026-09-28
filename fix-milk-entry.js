const fs = require("fs");
const path = require("path");

const ROOT = "C:/Users/1st choice group/rise-africa-skills";
const JSON_ROOT = path.join(ROOT, "deep_courses");
const SLUG = "young-animal-milk-replacer";
const COURSE_DIR = path.join(JSON_ROOT, SLUG);

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

// Read the 12 modules
const modules = [];
let totalLessons = 0;
let totalWords = 0;
let totalQuiz = 0;
let totalVideos = 0;

const modFiles = fs.readdirSync(COURSE_DIR).filter(f => /^module-\d+\.json$/.test(f)).sort();
for (const f of modFiles) {
    let j = JSON.parse(fs.readFileSync(path.join(COURSE_DIR, f), "utf8").replace(/^\uFEFF/, ""));

    const lessonTitles = [];
    if (Array.isArray(j.lessons)) {
        for (const l of j.lessons) {
            if (typeof l === "string") { lessonTitles.push(l); }
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

console.log("Modules read:", modules.length);
console.log("Sample m[0]:", JSON.stringify(modules[0]).substring(0, 200));
console.log("Sample m[0][1] is array:", Array.isArray(modules[0][1]));

// Find the highest n in the dictionary
const ciPath = path.join(ROOT, "course-info.html");
let ci = fs.readFileSync(ciPath, "utf8");

const nMatches = [...ci.matchAll(/"n":(\d+)/g)].map(m => parseInt(m[1]));
const maxN = Math.max(...nMatches);
console.log("Max n in dict:", maxN);

// Build the correct entry
const modulesJson = modules.map(m => {
    const t = esc(m[0]);
    const lessonsArr = "[" + m[1].map(l => '"' + esc(l) + '"').join(",") + "]";
    const vq = esc(m[2]);
    return `["${t}",${lessonsArr},"${vq}"]`;
}).join(",");

const entry = `"${SLUG}":{"n":${maxN + 1},"t":"Young Animal Milk Replacer and Supplement Feeding","e":"","cat":"COURSE","b":"Twelve modules, ${totalLessons} written lessons. Colostrum, milk replacer formulas, feeding schedules and safety for piglets, calves, kids, lambs, puppies and kittens.","brand":"#006c35","acc":"#008a44","L":${totalLessons},"W":${totalWords},"Q":${totalQuiz},"V":${totalVideos},"m":[${modulesJson}]}`;

console.log("New entry length:", entry.length);

// Find the malformed entry and replace it
// Old shape starts with: "young-animal-milk-replacer": { t:
// We look for that and find the closing `}`
const startMarker = `"${SLUG}":`;
const startIdx = ci.indexOf(startMarker);
if (startIdx < 0) { console.log("STOP: entry not found"); process.exit(1); }

// From startIdx, find the matching closing brace
const braceStart = ci.indexOf("{", startIdx);
let depth = 0, braceEnd = -1;
for (let i = braceStart; i < ci.length; i++) {
    if (ci[i] === "{") depth++;
    else if (ci[i] === "}") { depth--; if (depth === 0) { braceEnd = i; break; } }
}
if (braceEnd < 0) { console.log("STOP: no closing brace"); process.exit(1); }

const oldEntry = ci.substring(startIdx, braceEnd + 1);
console.log("Old entry length:", oldEntry.length);
console.log("Old entry preview:", oldEntry.substring(0, 120));

ci = ci.substring(0, startIdx) + entry + ci.substring(braceEnd + 1);
fs.writeFileSync(ciPath, ci, "utf8");

console.log("");
console.log("=== DONE ===");
console.log("Replaced entry for", SLUG);
console.log("New size:", ci.length);