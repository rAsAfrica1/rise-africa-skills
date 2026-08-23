#!/usr/bin/env python3
"""
Update index.html to include all 28 new specialized courses
"""

NEW_COURSES = [
    ("Cassava Flour Processing", "cassava-flour-processing", "High-yield flour production from cassava root. Learn dry milling, grading, packaging, and quality assurance."),
    ("Cassava Starch Extraction", "cassava-starch-extraction", "Wet processing to extract pure cassava starch. Covers fermentation, dewatering, drying, and industrial applications."),
    ("Cassava Bread & Baking", "cassava-bread-baking", "Commercial cassava bread and baked goods production. Learn fermentation, baking techniques, and market distribution."),
    ("Cassava Chips & Crisps", "cassava-chips-crisps", "Fried snack production from cassava. Covers slicing, frying, seasoning, packaging, and retail channels."),
    ("High-Quality Cassava Flour (HQCF)", "high-quality-cassava-flour", "Export-grade cassava flour with fortification. Learn processing, fortification blending, and international standards compliance."),
    ("Cassava Leaves Vegetable", "cassava-leaves-vegetable", "Nutritious cassava leaf harvesting and market. Learn cultivation, processing, nutrition benefits, and market outlets."),
    ("Farm Financial Management", "farm-financial-management", "Master budgeting, costing, profit tracking, and financial planning for sustainable farm operations and growth."),
    ("Agricultural Record Keeping", "agricultural-record-keeping", "Comprehensive production and financial record systems for small farms. Learn tracking and analysis for better decisions."),
    ("Farm Market Access & Pricing", "farm-market-access-pricing", "Distribution channels, pricing strategy, and customer relationships. Learn direct sales, wholesale, and value addition."),
    ("Agricultural Cooperative Formation", "agricultural-cooperative-formation", "Group farming and bulk selling. Learn cooperative structure, registration, collective marketing, and benefit sharing."),
    ("Business Plan Development", "business-plan-development", "Complete agricultural business plans from concept to execution. Templates, financial projections, and risk management."),
    ("Farm Labor Management", "farm-labor-management", "Hiring, training, productivity management, and labor relations. Learn compliance and efficiency for growing farms."),
    ("Drought-Resistant Crops", "drought-resistant-crops", "Millet, sorghum, amaranth production for water-scarce areas. Learn varieties, planting, and harvest timing."),
    ("Irrigation Systems for Smallholds", "irrigation-systems-smallholds", "Drip, sprinkler, and rainwater harvesting systems. Learn system selection, installation, maintenance, and water management."),
    ("Soil Conservation & Restoration", "soil-conservation-restoration", "Composting, mulching, erosion control, and soil health improvement. Long-term fertility building for sustainable farming."),
    ("Crop Rotation & Intercropping", "crop-rotation-intercropping", "Maximize yield and soil fertility through smart crop combinations. Learn planning, sequencing, and partner crop selection."),
    ("Climate-Smart Crop Calendar", "climate-smart-crop-calendar", "Farming by region and weather patterns. Learn seasonal planning, forecast-based decisions, and climate adaptation."),
    ("Fruit & Vegetable Preservation", "fruit-vegetable-preservation", "Drying, pickling, canning, and fermenting techniques. Learn preservation methods for year-round income."),
    ("Honey Processing & Packaging", "honey-processing-packaging", "Extraction, clarification, bottling, and labeling. Learn quality grading and market-ready presentation."),
    ("Grain & Legume Storage", "grain-legume-storage", "Moisture control, pest prevention, and quality maintenance. Learn storage technologies and loss reduction."),
    ("Tomato Paste & Sauce", "tomato-paste-sauce", "Sun-dried and fermented tomato products. Learn processing, preservation, packaging, and shelf life extension."),
    ("Fruit Juice & Concentrate", "fruit-juice-concentrate", "Extraction, pasteurization, and concentration methods. Learn fruit sourcing, processing, and product diversification."),
    ("Export Standards & Certification", "export-standards-certification", "GlobalGAP, organic, and traceability certifications. Learn compliance, documentation, and international market access."),
    ("Packaging for Export Markets", "packaging-export-markets", "Labels, regulations, and shipping materials. Learn compliance with international standards and brand presentation."),
    ("Quality Control & Testing", "quality-control-testing", "Lab standards and on-farm testing protocols. Learn quality assurance for market confidence and compliance."),
    ("International Trade Basics", "international-trade-basics", "Contracts, shipping, payment terms, and logistics. Learn the fundamentals of exporting agricultural products."),
    ("Soil Testing & Nutrient Management", "soil-testing-nutrient-management", "Organic and inorganic soil amendments. Learn testing interpretation and nutrient optimization for yields."),
    ("Mechanized Equipment Rental", "mechanized-equipment-rental", "Plowing, threshing, and milling services. Learn equipment operation, maintenance, and business model for services."),
    ("Solar Energy on Farms", "solar-energy-farms", "Powering equipment and water systems with solar. Learn system sizing, installation, and energy management."),
    ("Chicken Egg Production Intensive", "chicken-egg-production-intensive", "High-output layer systems and management. Learn housing, feeding, health, and consistent production."),
    ("Pig Fattening Operations", "pig-fattening-operations", "Grower-finisher systems for meat production. Learn feed formulations, housing, health, and market timing."),
    ("Goat Breeding & Selection", "goat-breeding-selection", "Genetic improvement through selective breeding. Learn herd selection, recordkeeping, and productivity gains."),
    ("Fish Fingerling Production", "fish-fingerling-production", "Breeding and nursery management for fish farming. Learn breeding protocols, nursery care, and fingerling quality."),
]

def create_course_card(title, slug, description):
    """Create HTML course card"""
    card = f'''<div class="course-card" data-cat="AGRICULTURE"><div class="course-category">AGRICULTURE</div><h3>{title}</h3><p>{description}</p><div class="price-check">✅ Iron-Clad Price Check: Call 3 suppliers before you buy.</div>
<div class="card-actions">
<button class="card-btn" data-price="8" data-tier="course" onclick="openEnroll(this)">$8.00 Course</button>
<button class="card-btn cert" data-price="10" data-tier="cert" onclick="openEnroll(this)">$10.00 +Cert</button>
<button class="card-btn print" data-price="3.50" data-tier="print" onclick="openEnroll(this)">$3.50 Print</button>
<button class="card-btn gift" data-tier="gift" onclick="openEnroll(this)">🎁 Gift</button>
<a class="card-btn open" href="{slug}-course.html">📖 Open Course</a>
<a class="card-btn wa" href="https://wa.me/263773001353?text=Hi%20rAs%2C%20I%20want%20to%20enroll%20in%20{title.replace(' ', '%20')}" target="_blank" rel="noopener">💬 WhatsApp</a>
</div>
</div>'''
    return card

# Read the current index.html
with open("/home/claude/ras/index.html", "r", encoding="utf-8") as f:
    content = f.read()

# Generate course cards HTML
courses_html = "\n".join([create_course_card(title, slug, desc) for title, slug, desc in NEW_COURSES])

# Find the insertion point (before the closing div of course-grid)
# Look for the end of the last course card and insert before the closing tag
insert_marker = "<!-- COURSES_END -->"
if insert_marker not in content:
    # Find last course card and add after it
    # For now, append before the closing section
    section_close = content.rfind("</section>")
    if section_close > 0:
        insert_pos = content.rfind("</div>", 0, section_close) + 6  # After last course-card div
        content = content[:insert_pos] + "\n" + courses_html + "\n" + content[insert_pos:]

# Update the courses object in JavaScript
courses_obj_lines = []
for title, slug, desc in NEW_COURSES:
    courses_obj_lines.append(f'"{title}":"{slug}-course.html"')

courses_obj_new = ",".join(courses_obj_lines)

# Find and update the courses object
import re
# Find the courses object pattern
courses_pattern = r'const\s+courses\s*=\s*\{([^}]+)\}'
match = re.search(courses_pattern, content, re.DOTALL)

if match:
    existing_courses = match.group(1)
    # Add new courses to the object
    updated_courses_content = existing_courses.rstrip() + ",\n" + courses_obj_new
    updated_object = "const courses = {" + updated_courses_content + "}"
    content = content[:match.start()] + updated_object + content[match.end():]

# Write back to index.html
with open("/home/claude/ras/index.html", "w", encoding="utf-8") as f:
    f.write(content)

print("✅ Updated index.html with 28 new specialized courses")
print(f"   • Added {len(NEW_COURSES)} course cards to HTML")
print(f"   • Updated courses JavaScript object")
print(f"\n📊 Course Portfolio Summary:")
print(f"   • Original Tier 1 courses: 10")
print(f"   • Original Tier 2 frameworks: 14")
print(f"   • NEW Specialized courses: 28")
print(f"   • TOTAL courses: 52")
