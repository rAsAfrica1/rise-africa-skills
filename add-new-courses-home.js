const fs = require("fs");
const path = require("path");

const ROOT = "C:/Users/1st choice group/rise-africa-skills";
const HOME = path.join(ROOT, "index.html");

const NEW_COURSES = [
    { num: 204, cat: "AGRICULTURE", title: "Broiler Production", slug: "broiler-production", desc: "Twelve modules, 72 written lessons, 360 quiz questions. Day-old chick to market in 42 days. Housing, feeding, vaccination, biosecurity, FCR, processing and marketing." },
    { num: 205, cat: "AGRICULTURE", title: "Layers Production", slug: "layers-production", desc: "Twelve modules, 72 written lessons, 360 quiz questions. Pullet rearing, layer feeding, egg quality, lighting programme, disease control and egg marketing." },
    { num: 206, cat: "VOCATIONAL", title: "Knife Blacksmith", slug: "knife-blacksmith", desc: "Twelve modules, 72 written lessons, 360 quiz questions. Forge setup, steel selection, forging, grinding, heat treatment, handles and selling hand-forged knives." },
    { num: 207, cat: "CONSTRUCTION", title: "Steel Fixing (Rebar)", slug: "steel-fixing-rebar", desc: "Twelve modules, 72 written lessons, 360 quiz questions. Rebar schedules, cutting, bending, tying, spacing, laps, column and slab fixing, safety and inspection." },
    { num: 208, cat: "CONSTRUCTION", title: "Scaffolding", slug: "scaffolding", desc: "Twelve modules, 72 written lessons, 360 quiz questions. Scaffold types, tube and fitting, cuplock, bracing, ties, working platforms, inspection and safety." },
    { num: 209, cat: "CONSTRUCTION", title: "Plumbing", slug: "plumbing", desc: "Twelve modules, 72 written lessons, 360 quiz questions. Water supply, drainage, pipe fitting, fixtures, pumps, water heating, sanitation and running a plumbing business." },
    { num: 210, cat: "CONSTRUCTION", title: "Road Construction", slug: "road-construction", desc: "Twelve modules, 72 written lessons, 360 quiz questions. Survey, earthworks, subbase, base course, drainage, compaction, surfacing, quality control and costing." },
    { num: 211, cat: "VOCATIONAL", title: "Painting and Decorating", slug: "painting-and-decorating", desc: "Twelve modules, 72 written lessons, 360 quiz questions. Surface prep, primers, paints, spray and brush methods, decorative finishes, wallpaper, costing and marketing." },
    { num: 212, cat: "AGRICULTURE", title: "Greenhouse Vegetable Farming", slug: "greenhouse-vegetable-farming", desc: "Twelve modules, 72 written lessons, 360 quiz questions. Greenhouse design, climate control, hydroponics, drip irrigation, pest control, year-round production and selling." },
    { num: 213, cat: "AGRICULTURE", title: "Agricultural Irrigation Technician", slug: "agricultural-irrigation-technician", desc: "Twelve modules, 72 written lessons, 360 quiz questions. Pump selection, drip, sprinkler, furrow, system design, installation, maintenance and servicing farms." },
    { num: 214, cat: "VOCATIONAL", title: "Machinery Operation and Repair", slug: "machinery-operation-and-repair", desc: "Twelve modules, 72 written lessons, 360 quiz questions. Tractor and engine operation, diesel systems, hydraulics, servicing, fault finding and repair business." },
    { num: 215, cat: "BUSINESS", title: "Township and Village Enterprise Management", slug: "township-and-village-enterprise-management", desc: "Twelve modules, 72 written lessons, 360 quiz questions. Small enterprise planning, stock, cash control, staff, customer care, growth and community markets." },
    { num: 216, cat: "LANGUAGES", title: "Business Chinese, Arabic and Russian Translation", slug: "business-chinese-arabic-russian-translation", desc: "Twelve modules, 72 written lessons, 360 quiz questions. Trade vocabulary, contracts, negotiation phrases, emails and interpretation for African exporters." },
    { num: 217, cat: "BUSINESS", title: "Small Shop and Market Trading", slug: "small-shop-and-market-trading", desc: "Twelve modules, 72 written lessons, 360 quiz questions. Site choice, stock, pricing, cash control, market stalls, record keeping and scaling." },
    { num: 218, cat: "BUSINESS", title: "Export Sales Agent", slug: "export-sales-agent", desc: "Twelve modules, 72 written lessons, 360 quiz questions. Finding buyers, quoting, contracts, shipping terms, commissions and building an export book." },
    { num: 219, cat: "BUSINESS", title: "Customs Brokerage", slug: "customs-brokerage", desc: "Twelve modules, 72 written lessons, 360 quiz questions. HS codes, import and export documentation, duties, clearing, compliance and running a brokerage." },
    { num: 220, cat: "BUSINESS", title: "Purchasing and Procurement", slug: "purchasing-and-procurement", desc: "Twelve modules, 72 written lessons, 360 quiz questions. Sourcing, supplier vetting, tenders, negotiation, purchase orders, quality and cost control." },
    { num: 221, cat: "BUSINESS", title: "Foreign Trade Negotiation", slug: "foreign-trade-negotiation", desc: "Twelve modules, 72 written lessons, 360 quiz questions. Cross-cultural negotiation, price and terms, INCOTERMS, contracts and dispute handling." },
    { num: 222, cat: "VOCATIONAL", title: "Yok and Pan Blacksmith", slug: "yok-pan-blacksmith", desc: "Twelve modules, 72 written lessons, 360 quiz questions. Traditional yok and pan forging, tooling, heat treatment, finishes and marketing to local markets." },
    { num: 223, cat: "AGRICULTURE", title: "Organic Manure with 33 Ingredients", slug: "organic-manure-33-ingredients", desc: "Twelve modules, 72 written lessons, 360 quiz questions. Blending charcoal, soil, green leaves and other inputs into a 33-ingredient organic manure. Ratios, safety and selling." }
];

let raw = fs.readFileSync(HOME, "utf8");
const before203 = (raw.match(/\b203\b/g) || []).length;
raw = raw.replace(/\b203\b/g, "225");
const after203 = (raw.match(/\b203\b/g) || []).length;
console.log("Replaced 203->225:", before203, "occurrences. Remaining:", after203);

// Find the last "African Street Food Business" card and its closing </div>
// The card pattern looks like:
// VOCATIONAL
// 203. African Street Food Business
// ...
// 📖 Open Course
// </div>

const marker = "203. African Street Food Business";
const idx = raw.indexOf(marker);
if (idx < 0) {
    console.log("STOP: could not find last course card ('203. African Street Food Business').");
    process.exit(1);
}

// find the NEXT "</div>" after a bunch of content (the card close)
// usually after "Open Course" there is a </div> for the card
const afterMarker = raw.indexOf("Open Course", idx);
if (afterMarker < 0) {
    console.log("STOP: could not find 'Open Course' after last card.");
    process.exit(1);
}
// find the first </div> after that
const cardClose = raw.indexOf("</div>", afterMarker);
if (cardClose < 0) {
    console.log("STOP: could not find card closing div.");
    process.exit(1);
}
const insertAt = cardClose + "</div>".length;

// build the new cards in the same style
function buildCard(c) {
    return `
    <div class="course-card">
      <div class="course-cat">${c.cat}</div>
      <h3>${c.num}. ${c.title}</h3>
      <p>${c.desc}</p>
      <div class="course-actions">
        <span class="price">$8.00 Course</span>
        <span class="price">$10.00 +Record</span>
        <span class="price">$3.50 Print</span>
        <a class="gift" href="#">🎁 Gift</a>
        <a class="open" href="${c.slug}-course.html">📖 Open Course</a>
      </div>
    </div>`;
}

const newCards = NEW_COURSES.map(buildCard).join("\n");

const newRaw = raw.substring(0, insertAt) + "\n" + newCards + "\n" + raw.substring(insertAt);

fs.writeFileSync(HOME, newRaw, "utf8");
console.log("Appended " + NEW_COURSES.length + " new course cards to index.html.");
console.log("Done.");