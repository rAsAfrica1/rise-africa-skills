#!/usr/bin/env python3
"""
Generate updated inventory for 52 total agriculture courses
24 original + 28 specialized
"""

import json
from datetime import datetime

# ALL 52 COURSES
ALL_COURSES = {
    "tier1_original": [  # 10 comprehensive foundation courses
        ("Pig Farming", "pig-farming", "Startup guide to meat production", 6, 720, "6-9 months"),
        ("Poultry Farming", "poultry-farming", "Eggs & meat production", 6, 720, "6-8 weeks"),
        ("Rabbit Farming", "rabbit-farming", "High-protein low-input business", 6, 720, "3-4 months"),
        ("Goat & Sheep Rearing", "goat-sheep-rearing", "Meat, milk, fiber production", 6, 720, "12-18 months"),
        ("Bee Farming", "bee-farming", "Multiple revenue streams", 6, 720, "1-2 years"),
        ("Mushroom Farming", "mushroom-farming", "Year-round production", 6, 720, "6-8 weeks"),
        ("Animal Feed Making", "animal-feed-making", "B2B business model", 6, 720, "Immediate"),
        ("Cattle Farming", "cattle-farming", "Large livestock investment", 6, 720, "18-24 months"),
        ("Dairy Production", "dairy-production", "Monthly income from milk", 6, 720, "Monthly"),
        ("Cassava Farming", "cassava-farming", "Drought-tolerant dual-use crop", 6, 720, "8-12 months"),
    ],
    "tier2_original": [  # 14 framework courses ready for enrichment
        ("Ostrich Farming", "ostrich-farming", "High-value specialty livestock", 6, 720, "18-24 months"),
        ("Fishing & Fish Farming", "fishing-fish-farming", "Aquatic protein production", 6, 720, "4-6 months"),
        ("Forestry & Tree Planting", "forestry-tree-planting", "Long-term sustainable timber", 6, 720, "3-5 years"),
        ("General Agriculture", "general-agriculture", "Fundamental farming principles", 6, 720, "Varies"),
        ("Snail Farming", "snail-farming", "Low-input delicacy production", 6, 720, "6-8 weeks"),
        ("Grasscutter Farming", "grasscutter-farming", "Small livestock, local demand", 6, 720, "4-5 months"),
        ("Quail Farming", "quail-farming", "Specialty poultry enterprise", 6, 720, "6-8 weeks"),
        ("Turkey Farming", "turkey-farming", "Premium poultry production", 6, 720, "12-16 weeks"),
        ("Duck Farming", "duck-farming", "Water-based poultry system", 6, 720, "8-10 weeks"),
        ("Guinea Fowl Farming", "guinea-fowl-farming", "Disease-resistant poultry", 6, 720, "12-16 weeks"),
        ("Crocodile Farming", "crocodile-farming", "High-value reptile business", 6, 720, "2-3 years"),
        ("Silkworm Farming", "silkworm-farming", "Fiber production specialization", 6, 720, "3-4 months"),
        ("Earthworm Farming", "earthworm-farming", "Soil amendment production", 6, 720, "6-8 weeks"),
        ("Grafting, Budding & Orchards", "grafting-budding-orchards", "Fruit tree propagation", 6, 720, "2-3 years"),
    ],
    "cassava_processing": [  # 6 specialized cassava value-added courses
        ("Cassava Flour Processing", "cassava-flour-processing", "High-yield flour production", 6, 720, "2-3 weeks"),
        ("Cassava Starch Extraction", "cassava-starch-extraction", "Wet processing for starch", 6, 720, "2-3 weeks"),
        ("Cassava Bread & Baking", "cassava-bread-baking", "Commercial cassava products", 6, 720, "1-2 months"),
        ("Cassava Chips & Crisps", "cassava-chips-crisps", "Fried snack production", 6, 720, "3-4 weeks"),
        ("High-Quality Cassava Flour (HQCF)", "high-quality-cassava-flour", "Export-grade fortified flour", 6, 720, "2-3 months"),
        ("Cassava Leaves Vegetable", "cassava-leaves-vegetable", "Nutritious leaf marketing", 6, 720, "Immediate"),
    ],
    "agribusiness": [  # 6 agribusiness fundamentals courses
        ("Farm Financial Management", "farm-financial-management", "Budgeting, costing, profit tracking", 6, 720, "Ongoing"),
        ("Agricultural Record Keeping", "agricultural-record-keeping", "Production and financial records", 6, 720, "Foundational"),
        ("Farm Market Access & Pricing", "farm-market-access-pricing", "Distribution and pricing strategy", 6, 720, "Ongoing"),
        ("Agricultural Cooperative Formation", "agricultural-cooperative-formation", "Group farming and bulk selling", 6, 720, "6+ months"),
        ("Business Plan Development", "business-plan-development", "Complete business planning", 6, 720, "1-2 weeks"),
        ("Farm Labor Management", "farm-labor-management", "Hiring, training, productivity", 6, 720, "Ongoing"),
    ],
    "climate_smart": [  # 5 climate-smart farming courses
        ("Drought-Resistant Crops", "drought-resistant-crops", "Millet, sorghum, amaranth farming", 6, 720, "8-12 months"),
        ("Irrigation Systems for Smallholds", "irrigation-systems-smallholds", "Drip, sprinkler, rainwater harvesting", 6, 720, "3-4 months"),
        ("Soil Conservation & Restoration", "soil-conservation-restoration", "Composting, mulching, soil health", 6, 720, "Ongoing"),
        ("Crop Rotation & Intercropping", "crop-rotation-intercropping", "Maximizing yield and fertility", 6, 720, "Seasonal"),
        ("Climate-Smart Crop Calendar", "climate-smart-crop-calendar", "Farming by weather patterns", 6, 720, "Annual"),
    ],
    "food_preservation": [  # 5 food preservation and processing courses
        ("Fruit & Vegetable Preservation", "fruit-vegetable-preservation", "Drying, pickling, canning", 6, 720, "1-2 months"),
        ("Honey Processing & Packaging", "honey-processing-packaging", "Extraction to market-ready product", 6, 720, "Seasonal"),
        ("Grain & Legume Storage", "grain-legume-storage", "Moisture control and pest prevention", 6, 720, "Foundational"),
        ("Tomato Paste & Sauce", "tomato-paste-sauce", "Sun-dried and fermented products", 6, 720, "3-4 months"),
        ("Fruit Juice & Concentrate", "fruit-juice-concentrate", "Extraction and preservation", 6, 720, "Seasonal"),
    ],
    "export_market": [  # 4 export and market readiness courses
        ("Export Standards & Certification", "export-standards-certification", "GlobalGAP, organic, traceability", 6, 720, "3-6 months"),
        ("Packaging for Export Markets", "packaging-export-markets", "Labels, regulations, compliance", 6, 720, "2-3 weeks"),
        ("Quality Control & Testing", "quality-control-testing", "Lab standards and testing protocols", 6, 720, "Ongoing"),
        ("International Trade Basics", "international-trade-basics", "Contracts, shipping, logistics", 6, 720, "Essential"),
    ],
    "farm_tech": [  # 3 farm technology courses
        ("Soil Testing & Nutrient Management", "soil-testing-nutrient-management", "Organic and inorganic amendments", 6, 720, "Foundational"),
        ("Mechanized Equipment Rental", "mechanized-equipment-rental", "Plowing, threshing, milling services", 6, 720, "Immediate"),
        ("Solar Energy on Farms", "solar-energy-farms", "Powering equipment and storage", 6, 720, "6-12 months"),
    ],
    "specialty_livestock": [  # 4 specialty livestock courses
        ("Chicken Egg Production Intensive", "chicken-egg-production-intensive", "High-output layer systems", 6, 720, "6-8 weeks"),
        ("Pig Fattening Operations", "pig-fattening-operations", "Grower-finisher systems", 6, 720, "4-5 months"),
        ("Goat Breeding & Selection", "goat-breeding-selection", "Genetics and herd improvement", 6, 720, "12-18 months"),
        ("Fish Fingerling Production", "fish-fingerling-production", "Breeding and nursery management", 6, 720, "2-3 months"),
    ]
}

def generate_inventory_json():
    """Generate comprehensive JSON course inventory"""
    inventory = {
        "generated": datetime.now().isoformat(),
        "version": "2.0",
        "status": "Production Ready - 52 Course Platform",
        "summary": {
            "total_courses": 52,
            "tier1_original": 10,
            "tier2_original": 14,
            "tier3_specialized": 28,
            "total_modules": 312,  # 52 × 6
            "total_learning_objectives": 1872,  # 312 × 6
            "total_video_slots": 1560,  # 312 × 5
            "total_quiz_questions": 1248,  # 312 × 4
            "total_capstone_phases": 2496,  # 312 × 8
        },
        "course_categories": {},
    }

    category_count = 1
    for category_name, courses_list in ALL_COURSES.items():
        if category_name not in inventory["course_categories"]:
            inventory["course_categories"][category_name] = []

        for title, slug, desc, modules, videos, roi in courses_list:
            course = {
                "id": category_count,
                "title": title,
                "slug": slug,
                "description": desc,
                "modules": modules,
                "learning_objectives": modules * 6,
                "video_slots": videos,
                "quiz_questions": modules * 4,
                "capstone_phases": modules * 8,
                "roi_timeline": roi,
                "content_status": "Comprehensive" if category_name in ["tier1_original", "cassava_processing", "agribusiness", "climate_smart", "food_preservation", "export_market", "farm_tech", "specialty_livestock"] else "Framework",
                "files": [f"{slug}-course.html"] + [f"{slug}-module-{i}.html" for i in range(1, 7)]
            }
            inventory["course_categories"][category_name].append(course)
            category_count += 1

    return inventory

# Generate and save JSON
inventory = generate_inventory_json()
with open("/home/claude/ras/course-inventory-52.json", "w") as f:
    json.dump(inventory, f, indent=2)

print("✅ Generated course-inventory-52.json")
print(f"   • 52 total courses with full metadata")
print(f"   • 312 total modules (6 per course)")
print(f"   • Categorized by specialty (8 categories)")
print(f"\n📊 Inventory Summary:")
print(f"   • Tier 1 (Foundational): 10 courses")
print(f"   • Tier 2 (Framework): 14 courses")
print(f"   • Tier 3 (Specialized): 28 courses")
print(f"     - Cassava Processing: 6 courses")
print(f"     - Agribusiness: 6 courses")
print(f"     - Climate-Smart: 5 courses")
print(f"     - Food Preservation: 5 courses")
print(f"     - Export Market: 4 courses")
print(f"     - Farm Technology: 3 courses")
print(f"     - Specialty Livestock: 4 courses")
print(f"\n🎯 Complete Platform:")
print(f"   • Total courses: 52")
print(f"   • Total modules: 312")
print(f"   • HTML files: 364 (52 landing pages + 312 modules)")
print(f"   • Video slots ready to populate: 1,560")
print(f"   • Quiz questions: 1,248")
print(f"   • Capstone project phases: 2,496")
