const fs = require("fs");
const path = require("path");

const ROOT = "C:/Users/1st choice group/rise-africa-skills";
const JSON_ROOT = path.join(ROOT, "deep_courses");
const HOME = path.join(ROOT, "index.html");

function esc(s) {
    return String(s == null ? "" : s)
        .replace(/&/g, "&amp;").replace(/</g, "&lt;")
        .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function categorize(slug) {
    const s = slug.toLowerCase();
    if (/welding|plumbing|blacksmith|smithing|scaffold|painting|decorating|road-construction|machinery-operation/.test(s)) return "VOCATIONAL";
    if (/steel-fixing|tiles|pvc|cement/.test(s)) return "CONSTRUCTION";
    if (/translation|chinese|arabic|russian/.test(s)) return "LANGUAGES";
    if (/business|trade|agent|brokerage|procurement|sales-agent|small-shop|market-trading|export|purchasing|negotiation|customs|township|enterprise-management/.test(s)) return "BUSINESS";
    if (/greenhouse|irrigation|manure|wok-pan|broiler-production|layers-production/.test(s)) return "AGRICULTURE";
    return "AGRICULTURE";
}

// Read all 225 courses
const courses = [];
for (const slug of fs.readdirSync(JSON_ROOT).sort()) {
    const dir = path.join(JSON_ROOT, slug);
    if (!fs.statSync(dir).isDirectory()) continue;
    const mods = fs.readdirSync(dir).filter(f => /^module-\d+\.json$/.test(f));
    if (mods.length === 0) continue;
    let first;
    try { first = JSON.parse(fs.readFileSync(path.join(dir, mods[0]), "utf8").replace(/^\uFEFF/, "")); }
    catch (e) { continue; }
    courses.push({
        slug,
        title: first.course || slug,
        category: categorize(slug),
        moduleCount: mods.length,
        lessonCount: mods.length * 6
    });
}
console.log("Total courses in deep_courses:", courses.length);

let raw = fs.readFileSync(HOME, "utf8");
const origLen = raw.length;

// Find first card with number 226 or higher
const h3Re = /<h3>\s*(\d+)\.\s*[^<]*<\/h3>/g;
let cutFrom = -1;
let m;
while ((m = h3Re.exec(raw)) !== null) {
    if (parseInt(m[1]) >= 226) {
        const before = raw.substring(0, m.index);
        const lastCardStart = before.lastIndexOf('<div class="course-card"');
        if (lastCardStart >= 0) cutFrom = lastCardStart;
        break;
    }
}

if (cutFrom >= 0) {
    const afterCut = raw.substring(cutFrom);
    const lastBtn = afterCut.lastIndexOf('class="card-btn open"');
    let cutEnd;
    if (lastBtn >= 0) {
        cutEnd = afterCut.indexOf("</div>", lastBtn);
        cutEnd = afterCut.indexOf("</div>", cutEnd + 6);
        cutEnd = cutFrom + cutEnd + "</div>".length;
    } else {
        cutEnd = raw.length;
    }
    const removedBlock = raw.substring(cutFrom, cutEnd);
    const removedCount = (removedBlock.match(/<h3>\d+\./g) || []).length;
    console.log("Removing cards >=226. Count:", removedCount);
    raw = raw.substring(0, cutFrom) + "\n" + raw.substring(cutEnd);
} else {
    console.log("No cards >= 226 found");
}

// Check what is actually on the page now
const existingTitles = [];
const titleRe = /<h3>\s*\d+\.\s*([^<]+?)\s*<\/h3>/g;
while ((m = titleRe.exec(raw)) !== null) existingTitles.push(m[1].trim().toLowerCase());
console.log("Cards on homepage after cleanup:", existingTitles.length);

// Which of the 20 new courses are still not on the homepage?
const newSlugs = [
    "broiler-production","layers-production","knife-blacksmith",
    "steel-fixing-rebar","scaffolding","plumbing","road-construction",
    "painting-and-decorating","greenhouse-vegetable-farming",
    "agricultural-irrigation-technician","machinery-operation-and-repair",
    "township-and-village-enterprise-management",
    "business-chinese-arabic-russian-translation",
    "small-shop-and-market-trading","export-sales-agent",
    "customs-brokerage","purchasing-and-procurement",
    "foreign-trade-negotiation","wok-pan-blacksmith",
    "organic-manure-33-ingredients"
];

const missing = [];
for (const slug of newSlugs) {
    const c = courses.find(x => x.slug === slug);
    if (!c) continue;
    const t = c.title.toLowerCase();
    const exists = existingTitles.some(e => e === t || e.includes(t) || t.includes(e));
    if (!exists) missing.push(c);
}
console.log("New courses still missing from homepage:", missing.length);
missing.forEach(c => console.log("  MISSING: " + c.slug + " -> " + c.title));

// Find the highest current card number
let highest = 0;
const numRe = /<h3>\s*(\d+)\./g;
while ((m = numRe.exec(raw)) !== null) {
    const n = parseInt(m[1]);
    if (n > highest) highest = n;
}
console.log("Highest card number on page:", highest);

// Build the new cards
let newCards = "";
let num = highest + 1;
for (const c of missing) {
    const link = c.slug + "-course.html";
    newCards += `
<div class="course-card" data-cat="${c.category}">
  <div class="course-category">${c.category}</div>
  <h3>${num}. ${esc(c.title)}</h3>
  <p>Twelve modules, ${c.lessonCount} written lessons. Full practical training for African conditions.</p>
  <div class="price-check">&#9989; Iron-Clad Price Check: Call 3 suppliers before you buy.</div>
  <div class="card-actions">
    <button class="card-btn" data-price="8" data-tier="course" onclick="openEnroll(this)">$8.00 Course</button>
    <button class="card-btn cert" data-price="10" data-tier="cert" onclick="openEnroll(this)">$10.00 +Record</button>
    <button class="card-btn print" data-price="3.50" data-tier="print" onclick="openEnroll(this)">$3.50 Print</button>
    <button class="card-btn gift" data-tier="gift" onclick="openEnroll(this)">&#127873; Gift</button>
    <a class="card-btn open" href="${link}" target="_blank">&#128214; Open Course</a>
  </div>
</div>`;
    num++;
}

// Insert after the last existing card
if (newCards) {
    const lastOpen = raw.lastIndexOf('class="card-btn open"');
    let insertAt;
    if (lastOpen >= 0) {
        insertAt = raw.indexOf("</div>", lastOpen);
        insertAt = raw.indexOf("</div>", insertAt + 6);
        insertAt = insertAt + "</div>".length;
    } else {
        insertAt = raw.length;
    }
    raw = raw.substring(0, insertAt) + "\n" + newCards + "\n" + raw.substring(insertAt);
    console.log("Added " + missing.length + " new cards.");
} else {
    console.log("No new cards needed.");
}

// Fix all remaining 203 -> 225 mentions in index.html
const before203 = (raw.match(/\b203\b/g) || []).length;
raw = raw.replace(/\b203\b/g, "225");
const after203 = (raw.match(/\b203\b/g) || []).length;
console.log("Replaced 203->225:", before203, "| remaining:", after203);

fs.writeFileSync(HOME, raw, "utf8");
console.log("index.html size:", origLen, "->", raw.length);

// ---------- Now verify the WHOLE SITE ----------
console.log("");
console.log("=== SITE-WIDE CHECK ===");

const allHtml = fs.readdirSync(ROOT).filter(f => f.endsWith(".html"));
let stillHas203 = [];
for (const f of allHtml) {
    const c = fs.readFileSync(path.join(ROOT, f), "utf8");
    if (/\b203\b/.test(c)) stillHas203.push(f);
}
console.log("Pages still mentioning 203:", stillHas203.length);
if (stillHas203.length > 0) stillHas203.slice(0, 10).forEach(f => console.log("  " + f));

let stillHasFlagship = [];
for (const f of allHtml) {
    const c = fs.readFileSync(path.join(ROOT, f), "utf8");
    if (/FLAGSHIP COURSE/.test(c)) stillHasFlagship.push(f);
}
console.log("Pages still with FLAGSHIP badges:", stillHasFlagship.length);
if (stillHasFlagship.length > 0) stillHasFlagship.slice(0, 10).forEach(f => console.log("  " + f));

// Count total course cards on homepage
const totalCards = (raw.match(/class="course-card"/g) || []).length;
console.log("Total course cards on homepage now:", totalCards);

console.log("");
console.log("=== DONE ===");