const fs = require("fs");
const path = require("path");

const ROOT = "C:/Users/1st choice group/rise-africa-skills";
const JSON_ROOT = path.join(ROOT, "deep_courses");
const HOME = path.join(ROOT, "index.html");

// Category mapping from slug keywords
function categorize(slug) {
    const s = slug.toLowerCase();
    if (/welding|plumbing|blacksmith|smithing|carpentry|masonry|painting|decorating|scaffold|roofing|glass|cooling|refriger/.test(s)) return "VOCATIONAL";
    if (/construction|road|brick|cement|concrete|block|scaffold|steel-fix|roofing|tiles|pvc/.test(s)) return "CONSTRUCTION";
    if (/business|trade|agent|brokerage|procurement|sales|shop|market|export|purchasing|negotiation|customs|enterprise|management|record|project/.test(s)) return "BUSINESS";
    if (/language|translation|chinese|arabic|russian|swahili|shona|spanish/.test(s)) return "LANGUAGES";
    if (/farming|poultry|broiler|layer|cattle|goat|sheep|pig|crop|greenhouse|irrigation|manure|organic|fertil|bee|fish|dairy|rabbit|duck|turkey|grasscutter|guinea|crocodile|horse|worm|mushroom/.test(s)) return "AGRICULTURE";
    if (/food|bakery|butchery|jam|spice|juice|paste|sauce|honey|dried|brewery|distillery|chocolate|ice|yogurt|peanut|ginger|herbal-tea/.test(s)) return "FOOD PROCESSING";
    if (/soap|cosmetic|perfume|essential-oil|coconut|skincare|hair-care/.test(s)) return "COTTAGE INDUSTRY";
    if (/solar|energy|biogas|briquette|wind|charcoal/.test(s)) return "ENERGY";
    if (/medicine|nutraceutical|health|first-aid|herbal-medicine/.test(s)) return "HEALTH";
    if (/tech|ai-|robotics|drone|electronics|digital/.test(s)) return "TECHNOLOGY";
    return "VOCATIONAL";
}

function slugForLink(slug) {
    // point to the slug-course.html file we generated
    const candidates = [
        slug + "-course.html",
        slug + "-business.html"
    ];
    for (const c of candidates) {
        if (fs.existsSync(path.join(ROOT, c))) return c;
    }
    return slug + "-course.html";
}

// Read all courses
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
        category: categorize(slug)
    });
}
console.log("Total courses in deep_courses:", courses.length);

let raw = fs.readFileSync(HOME, "utf8");

// Find all titles already on page (h3 tags with "NNN. Title")
const existingTitles = [];
const re = /<h3>\s*\d+\.\s*([^<]+?)\s*<\/h3>/g;
let m;
while ((m = re.exec(raw)) !== null) existingTitles.push(m[1].trim().toLowerCase());

console.log("Titles already on page:", existingTitles.length);

// Find missing
const missing = courses.filter(c => {
    const t = c.title.toLowerCase();
    return !existingTitles.some(e => e === t || e.includes(t) || t.includes(e));
});
console.log("Missing cards to add:", missing.length);

// Find the highest existing number so we continue from there
let highest = 0;
const numRe = /<h3>\s*(\d+)\./g;
while ((m = numRe.exec(raw)) !== null) {
    const n = parseInt(m[1]);
    if (n > highest) highest = n;
}
console.log("Highest existing number:", highest);

// Build new cards
let newCards = "";
let num = highest + 1;
missing.forEach(c => {
    const link = slugForLink(c.slug);
    newCards += `
<div class="course-card" data-cat="${c.category}">
  <div class="course-category">${c.category}</div>
  <h3>${num}. ${c.title}</h3>
  <p>&#11088; FLAGSHIP COURSE &#8212; Twelve modules, seventy-two written lessons, 360 quiz questions. ${c.title} - full practical training for African conditions.</p>
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
});

// Find the last existing course-card closing </div> and insert after it
// The simplest reliable anchor: find the last course card by looking for the last
// occurrence of 'class="card-btn open"' and its enclosing </div></div>
const lastOpen = raw.lastIndexOf('class="card-btn open"');
if (lastOpen < 0) { console.log("STOP: no existing card found"); process.exit(1); }

// Find the closing </div></div> after the last card-btn open
let idx = raw.indexOf("</div>", lastOpen);
idx = raw.indexOf("</div>", idx + 6);  // second </div> closes the card
if (idx < 0) { console.log("STOP: could not find card close"); process.exit(1); }
const insertAt = idx + "</div>".length;

raw = raw.substring(0, insertAt) + "\n" + newCards + "\n" + raw.substring(insertAt);

fs.writeFileSync(HOME, raw, "utf8");
console.log("Appended " + missing.length + " cards. New highest number: " + (num - 1));
console.log("");
console.log("=== DONE ===");