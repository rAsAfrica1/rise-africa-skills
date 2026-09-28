const fs = require("fs");
const path = require("path");

const ROOT = "C:/Users/1st choice group/rise-africa-skills";
const JSON_ROOT = path.join(ROOT, "deep_courses");
const HOME = path.join(ROOT, "index.html");

function categorize(slug) {
    const s = slug.toLowerCase();
    if (/welding|plumbing|blacksmith|smithing|scaffold|painting|decorating|road|machinery|machinery-operation/.test(s)) return "VOCATIONAL";
    if (/construction|steel-fix|tiles|pvc/.test(s)) return "CONSTRUCTION";
    if (/language|translation|chinese|arabic|russian/.test(s)) return "LANGUAGES";
    if (/business|trade|agent|brokerage|procurement|sales|shop|market|export|purchasing|negotiation|customs|enterprise|management|township/.test(s)) return "BUSINESS";
    if (/farming|poultry|broiler|layer|cattle|goat|sheep|pig|crop|greenhouse|irrigation|manure|organic|bee|fish|dairy|duck|turkey|wok/.test(s)) return "AGRICULTURE";
    if (/food|bakery|jam|spice|juice|paste|honey|dried|brewery|distillery|chocolate|ice|yogurt|peanut|ginger|herbal-tea/.test(s)) return "FOOD PROCESSING";
    if (/soap|cosmetic|perfume|essential-oil|coconut|skincare|hair/.test(s)) return "COTTAGE INDUSTRY";
    if (/solar|energy|biogas|briquette|wind|charcoal/.test(s)) return "ENERGY";
    if (/medicine|nutraceutical|health|first-aid|herbal/.test(s)) return "HEALTH";
    if (/tech|ai-|robotics|drone|electronics/.test(s)) return "TECHNOLOGY";
    return "VOCATIONAL";
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
console.log("Total courses:", courses.length);

// Read homepage and find existing card titles
let raw = fs.readFileSync(HOME, "utf8");
const existingTitles = [];
const re = /<h3>\s*\d+\.\s*([^<]+?)\s*<\/h3>/g;
let m;
while ((m = re.exec(raw)) !== null) existingTitles.push(m[1].trim().toLowerCase());
console.log("Existing cards:", existingTitles.length);

// Find missing
const missing = courses.filter(c => {
    const t = c.title.toLowerCase();
    return !existingTitles.some(e => e === t || e.includes(t) || t.includes(e));
});
console.log("Missing cards to add:", missing.length);
missing.forEach(c => console.log("  " + c.slug + " -> " + c.title));

// Find highest existing number
let highest = 0;
const numRe = /<h3>\s*(\d+)\./g;
while ((m = numRe.exec(raw)) !== null) {
    const n = parseInt(m[1]);
    if (n > highest) highest = n;
}
console.log("Highest existing number:", highest);

// Find where the last course card ends
// Look for the last "card-btn open" and then its closing </div></div>
const lastOpen = raw.lastIndexOf('class="card-btn open"');
if (lastOpen < 0) { console.log("STOP: no existing card found"); process.exit(1); }
let idx = raw.indexOf("</div>", lastOpen);
idx = raw.indexOf("</div>", idx + 6);
const insertAt = idx + "</div>".length;

// Build new cards
let newCards = "";
let num = highest + 1;
for (const c of missing) {
    const link = c.slug + "-course.html";
    newCards += `
<div class="course-card" data-cat="${c.category}">
  <div class="course-category">${c.category}</div>
  <h3>${num}. ${c.title}</h3>
  <p>&#11088; Twelve modules, ${c.lessonCount} written lessons. Full practical training for African conditions.</p>
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

raw = raw.substring(0, insertAt) + "\n" + newCards + "\n" + raw.substring(insertAt);
fs.writeFileSync(HOME, raw, "utf8");
console.log("Appended " + missing.length + " cards. New highest number: " + (num - 1));
console.log("=== DONE ===");