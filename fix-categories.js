const fs = require("fs");
const path = require("path");

const ROOT = "C:/Users/1st choice group/rise-africa-skills";

function categorize(slug) {
    const s = slug.toLowerCase();
    if (/welding|blacksmith|smithing|painting|decorating|machinery|engine|car-engine|rivet|sheet-metal|metal-sculpt|metal-casting|tool-making|gate|ornamental|smelting|gold-mining|gold-smelt|car-breakers|barbering|hair-salon|conversion|petrol|diesel|auto-parts|ev-motorbike|car-washing/.test(s)) return "VOCATIONAL";
    if (/construction|road|scaffold|steel-fixing|plumbing|water-tank|tiles|cement|roofing|brick|pvc|farm-building|buildings-for-preservation|pizza-oven|fish-pond|beehive|wok-pan/.test(s)) return "CONSTRUCTION";
    if (/language|translation|chinese|arabic|russian|swahili|shona|spanish/.test(s)) return "LANGUAGES";
    if (/business|trade|agent|brokerage|procurement|sales|shop|market|export|purchasing|negotiation|customs|township|enterprise|record-keeping|project-management|farm-labor|business-plan|entrepreneur|kiosk|influencer|reselling|errands|cooperative|education-and-training|sourcing|transport-and-logistics|recycling|event-services|packaging-for-export|international-trade|supply-chain|farm-market|export-standards/.test(s)) return "BUSINESS";
    if (/solar|energy|biogas|briquette|wind|charcoal/.test(s)) return "ENERGY";
    if (/soap|cosmetic|perfume|essential-oil|coconut-oil|skincare|hair-care|dj-and-event|cleaning/.test(s)) return "COTTAGE INDUSTRY";
    if (/medicine|nutraceutical|first-aid|massage|spa|crisis-response|herbal-medicine/.test(s)) return "HEALTH";
    if (/tech|ai-|robotics|drone|electronics|digital/.test(s)) return "TECHNOLOGY";
    if (/steel-fabrication|furniture|sanitary|aluminum|glass-processing|metal-furniture/.test(s)) return "MANUFACTURING";
    if (/packaging-materials/.test(s)) return "PACKAGING";
    if (/tissues|paper/.test(s)) return "PAPER";
    if (/paint|detergent|pharmaceutical|pesticide|pest-control/.test(s)) return "CHEMICALS";
    if (/auto-parts|ev-motorbike|car-washing/.test(s)) return "AUTOMOTIVE";
    if (/food|bakery|butchery|jam|spice|juice|paste|honey|dried|brewery|distillery|chocolate|ice-cream|yogurt|peanut|ginger|herbal-tea|breakfast|cooking-oil|sugar|rice-milling|flour|soft-drink|bottled-water|dairy|fortified|cassava|moringa|baobab|hibiscus|soy|porridge|street-food/.test(s)) return "FOOD PROCESSING";
    if (/fish-processing|smoking-canning|preservation/.test(s)) return "FOOD PRESERVATION";
    return "AGRICULTURE";
}

// Build slug -> category
const slugs = fs.readdirSync(path.join(ROOT, "deep_courses")).filter(d => {
    return fs.statSync(path.join(ROOT, "deep_courses", d)).isDirectory();
});

const map = {};
for (const s of slugs) map[s] = categorize(s);

// Update all-courses.html
const acPath = path.join(ROOT, "all-courses.html");
let ac = fs.readFileSync(acPath, "utf8");

for (const slug of Object.keys(map)) {
    const cat = map[slug];
    // Match the card for this slug
    const re = new RegExp('(href="' + slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '-course\\.html">[\\s\\S]*?<p>)[A-Z ]+(&middot;|<)', 'g');
    ac = ac.replace(re, '$1' + cat + ' $2');
}
fs.writeFileSync(acPath, ac, "utf8");
console.log("all-courses.html categories updated");

// Count by category
const counts = {};
for (const s of Object.keys(map)) counts[map[s]] = (counts[map[s]] || 0) + 1;
console.log("Category counts:");
for (const c of Object.keys(counts).sort()) console.log("  " + c + ": " + counts[c]);
console.log("");
console.log("=== DONE ===");