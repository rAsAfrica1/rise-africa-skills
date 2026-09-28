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

function cat(slug) {
    const s = slug.toLowerCase();
    if (/welding|plumbing|blacksmith|smithing|scaffold|painting|decorating|road-construction|machinery-operation/.test(s)) return "VOCATIONAL";
    if (/steel-fixing|tiles|pvc|cement/.test(s)) return "CONSTRUCTION";
    if (/translation|chinese|arabic|russian|swahili|shona|spanish|language/.test(s)) return "LANGUAGES";
    if (/business|trade|agent|brokerage|procurement|sales-agent|small-shop|market-trading|export|purchasing|negotiation|customs|township|enterprise|record-keeping|project-management|farm-labor|business-plan|entrepreneur/.test(s)) return "BUSINESS";
    if (/solar|energy|biogas|briquette|wind|charcoal/.test(s)) return "ENERGY";
    if (/soap|cosmetic|perfume|essential-oil|coconut|skincare|hair/.test(s)) return "COTTAGE INDUSTRY";
    if (/medicine|nutraceutical|first-aid|herbal-medicine|massage|crisis|spa/.test(s)) return "HEALTH";
    if (/tech|ai-|robotics|drone|electronics|digital/.test(s)) return "TECHNOLOGY";
    if (/manufacturing|furniture|sanitary|fabrication|aluminum|glass/.test(s)) return "MANUFACTURING";
    if (/packaging/.test(s)) return "PACKAGING";
    if (/tissues|paper/.test(s)) return "PAPER";
    if (/fish-process|canning/.test(s)) return "FOOD PRESERVATION";
    if (/food|bakery|butchery|jam|spice|juice|paste|honey|dried|brewery|distillery|chocolate|ice|yogurt|peanut|ginger|herbal-tea|breakfast|cooking-oil|sugar|rice|flour|soft-drinks|bottled-water|dairy|fortified/.test(s)) return "FOOD PROCESSING";
    if (/automotive|auto-|ev-motorbike|engine|car-/.test(s)) return "AUTOMOTIVE";
    if (/chemicals|paint|detergent|pharmaceutical|pesticide/.test(s)) return "CHEMICALS";
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
        category: cat(slug),
        modules: mods.length,
        lessons: mods.length * 6
    });
}
console.log("Courses loaded:", courses.length);

// Build fresh cards
let cards = "";
courses.forEach((c, i) => {
    const num = i + 1;
    cards += `<div class="course-card" data-cat="${c.category}">
  <div class="course-category">${c.category}</div>
  <h3>${num}. ${esc(c.title)}</h3>
  <p>Twelve modules, ${c.lessons} written lessons. Complete practical training for African conditions.</p>
  <div class="price-check">&#9989; Iron-Clad Price Check: Call 3 suppliers before you buy.</div>
  <div class="card-actions">
    <button class="card-btn" data-price="8" data-tier="course" onclick="openEnroll(this)">$8.00 Course</button>
    <button class="card-btn cert" data-price="10" data-tier="cert" onclick="openEnroll(this)">$10.00 +Record</button>
    <button class="card-btn print" data-price="3.50" data-tier="print" onclick="openEnroll(this)">$3.50 Print</button>
    <button class="card-btn gift" data-tier="gift" onclick="openEnroll(this)">&#127873; Gift</button>
    <a class="card-btn open" href="${c.slug}-course.html" target="_blank">&#128214; Open Course</a>
  </div>
</div>
`;
});

// Replace the cards section
let raw = fs.readFileSync(HOME, "utf8");
const origLen = raw.length;

const firstCard = raw.indexOf('<div class="course-card"');
if (firstCard < 0) { console.log("STOP: no cards found"); process.exit(1); }

const lastBtn = raw.lastIndexOf('class="card-btn open"');
if (lastBtn < 0) { console.log("STOP: no last card found"); process.exit(1); }

let endIdx = raw.indexOf("</div>", lastBtn);
endIdx = raw.indexOf("</div>", endIdx + 6);
endIdx = endIdx + "</div>".length;

const oldCount = (raw.substring(firstCard, endIdx).match(/class="course-card"/g) || []).length;
console.log("Old cards replaced:", oldCount);

raw = raw.substring(0, firstCard) + cards + raw.substring(endIdx);
raw = raw.replace(/\b203\b/g, "225");

fs.writeFileSync(HOME, raw, "utf8");
const newCount = (raw.match(/class="course-card"/g) || []).length;
console.log("New cards on homepage:", newCount);
console.log("Size:", origLen, "->", raw.length);
console.log("=== DONE ===");