const fs = require("fs");
const path = require("path");

const ROOT = "C:/Users/1st choice group/rise-africa-skills";
const JSON_ROOT = path.join(ROOT, "deep_courses");

// Build slug -> real lesson count
const realCounts = {};
for (const slug of fs.readdirSync(JSON_ROOT)) {
    const dir = path.join(JSON_ROOT, slug);
    if (!fs.statSync(dir).isDirectory()) continue;
    const modFiles = fs.readdirSync(dir).filter(f => /^module-\d+\.json$/.test(f));
    let total = 0;
    let perModule = 0;
    for (const f of modFiles) {
        try {
            const j = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8").replace(/^\uFEFF/, ""));
            const n = Array.isArray(j.lessons) ? j.lessons.length : 0;
            total += n;
            if (n > perModule) perModule = n;
        } catch (e) {}
    }
    realCounts[slug] = { total, perModule, modules: modFiles.length };
}
console.log("Courses computed:", Object.keys(realCounts).length);

// Sample
const sampleKeys = ["advanced-welding", "pig-farming", "water-tank-construction", "young-animal-milk-replacer"];
for (const k of sampleKeys) {
    if (realCounts[k]) {
        console.log("  " + k + ": " + realCounts[k].total + " total, " + realCounts[k].perModule + " per module");
    }
}

// Build slug-from-filename function
function slugFromFilename(filename) {
    return filename.replace(/-module-\d+\.html$/, "").replace(/-course\.html$/, "").replace(/-business\.html$/, "").replace(/\.html$/, "");
}

const htmlFiles = fs.readdirSync(ROOT).filter(f => f.endsWith(".html"));
let scanned = 0;
let changed = 0;
let totalReplacements = 0;
const sampleChanges = [];

for (const f of htmlFiles) {
    scanned++;
    const full = path.join(ROOT, f);
    let raw = fs.readFileSync(full, "utf8");
    const orig = raw;

    const isModule = /-module-\d+\.html$/.test(f);
    const isCourse = /-course\.html$/.test(f) || /-business\.html$/.test(f);

    if (!isModule && !isCourse) {
        // Skip non-course pages: homepage, 404, enroll, etc.
        continue;
    }

    const slug = slugFromFilename(f);
    const info = realCounts[slug];
    if (!info) continue;

    const correctTotal = info.total;      // for course landing pages
    const correctPerMod = info.perModule; // for module pages

    // Determine what number this page should say
    const target = isModule ? correctPerMod : correctTotal;

    // Replace "72 written lessons" -> "N written lessons"
    // Replace "72 lessons" -> "N lessons"
    // Replace "sixty written lessons" -> "N written lessons" (for old wording)
    // Only replace if the number is wrong
    const before = raw;

    // Fix "72 written lessons"
    if (raw.match(/\b72 written lessons/g)) {
        raw = raw.replace(/\b72 written lessons/g, target + " written lessons");
    }
    // Fix "72 lessons"
    if (raw.match(/\b72 lessons/g)) {
        raw = raw.replace(/\b72 lessons/g, target + " lessons");
    }
    // Fix "60 written lessons" / "60 lessons"
    if (raw.match(/\b60 written lessons/g)) {
        raw = raw.replace(/\b60 written lessons/g, target + " written lessons");
    }
    if (raw.match(/\b60 lessons/g)) {
        raw = raw.replace(/\b60 lessons/g, target + " lessons");
    }
    // "Six written lessons" -> "Seven written lessons" if per-module is 7
    if (isModule) {
        raw = raw.replace(/\bSix lessons\b/g, (correctPerMod === 7 ? "Seven" : target.toString()) + " lessons");
        raw = raw.replace(/\bsix lessons\b/g, (correctPerMod === 7 ? "seven" : target.toString()) + " lessons");
    }

    if (raw !== before) {
        fs.writeFileSync(full, raw, "utf8");
        changed++;
        const n = (before.length !== raw.length) ? "byte changed" : "same length";
        if (sampleChanges.length < 5) sampleChanges.push(f + " -> " + target);
        totalReplacements++;
    }
}

console.log("");
console.log("Files scanned: " + scanned);
console.log("Files changed: " + changed);
console.log("Total replacements: " + totalReplacements);
console.log("Sample changes:");
sampleChanges.forEach(s => console.log("  " + s));
console.log("=== DONE ===");