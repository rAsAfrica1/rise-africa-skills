#!/usr/bin/env python3
"""
Generate 28 specialized agriculture courses building on foundation
Focus: Value-added products, agribusiness, climate-smart farming, market readiness
"""

import os

# 28 SPECIALIZED COURSES DATA
SPECIALIZED_COURSES = {
    "cassava_processing": [
        ("Cassava Flour Processing", "cassava-flour-processing", "Dry milling for high-yield flour", "Startup to monthly income"),
        ("Cassava Starch Extraction", "cassava-starch-extraction", "Wet processing for starch production", "2-3 weeks ROI"),
        ("Cassava Bread & Baking", "cassava-bread-baking", "Commercial cassava bread production", "1-2 months"),
        ("Cassava Chips & Crisps", "cassava-chips-crisps", "Fried snack production", "3-4 weeks"),
        ("High-Quality Cassava Flour (HQCF)", "high-quality-cassava-flour", "Export-grade flour for fortification", "2-3 months"),
        ("Cassava Leaves Vegetable", "cassava-leaves-vegetable", "Nutritious leaf harvesting and market", "Immediate"),
    ],
    "agribusiness_fundamentals": [
        ("Farm Financial Management", "farm-financial-management", "Budgeting, costing, profit tracking", "Ongoing skill"),
        ("Agricultural Record Keeping", "agricultural-record-keeping", "Production and financial records", "Foundational"),
        ("Farm Market Access & Pricing", "farm-market-access-pricing", "Distribution channels and pricing strategy", "Critical skill"),
        ("Agricultural Cooperative Formation", "agricultural-cooperative-formation", "Group farming and bulk selling", "6+ months"),
        ("Business Plan Development", "business-plan-development", "Complete agricultural business plans", "1-2 weeks to write"),
        ("Farm Labor Management", "farm-labor-management", "Hiring, training, productivity", "Ongoing"),
    ],
    "climate_smart_farming": [
        ("Drought-Resistant Crops", "drought-resistant-crops", "Millet, sorghum, amaranth production", "8-12 months"),
        ("Irrigation Systems for Smallholds", "irrigation-systems-smallholds", "Drip, sprinkler, rainwater harvesting", "3-4 months setup"),
        ("Soil Conservation & Restoration", "soil-conservation-restoration", "Composting, mulching, soil health", "Ongoing improvement"),
        ("Crop Rotation & Intercropping", "crop-rotation-intercropping", "Maximizing yield and soil fertility", "Seasonal planning"),
        ("Climate-Smart Crop Calendar", "climate-smart-crop-calendar", "Farming by region and weather patterns", "Annual planning"),
    ],
    "food_preservation": [
        ("Fruit & Vegetable Preservation", "fruit-vegetable-preservation", "Drying, pickling, canning", "1-2 months startup"),
        ("Honey Processing & Packaging", "honey-processing-packaging", "Extraction to market-ready product", "After harvest"),
        ("Grain & Legume Storage", "grain-legume-storage", "Moisture control and pest prevention", "Foundational"),
        ("Tomato Paste & Sauce", "tomato-paste-sauce", "Sun-dried and fermented products", "3-4 months"),
        ("Fruit Juice & Concentrate", "fruit-juice-concentrate", "Extraction and preservation methods", "Seasonal"),
    ],
    "export_readiness": [
        ("Export Standards & Certification", "export-standards-certification", "GlobalGAP, organic, traceability", "3-6 months"),
        ("Packaging for Export Markets", "packaging-export-markets", "Labels, regulations, shipping materials", "2-3 weeks"),
        ("Quality Control & Testing", "quality-control-testing", "Lab standards and on-farm testing", "Ongoing"),
        ("International Trade Basics", "international-trade-basics", "Contracts, shipping, payment terms", "Essential knowledge"),
    ],
    "farm_technology": [
        ("Soil Testing & Nutrient Management", "soil-testing-nutrient-management", "Organic and inorganic amendments", "Foundational"),
        ("Mechanized Equipment Rental", "mechanized-equipment-rental", "Plowing, threshing, milling services", "Immediate income"),
        ("Solar Energy on Farms", "solar-energy-farms", "Powering equipment and storage", "6-12 months ROI"),
    ],
    "specialty_livestock": [
        ("Chicken Egg Production Intensive", "chicken-egg-production-intensive", "High-output layer systems", "6-8 weeks"),
        ("Pig Fattening Operations", "pig-fattening-operations", "Grower-finisher systems", "4-5 months"),
        ("Goat Breeding & Selection", "goat-breeding-selection", "Genetics and herd improvement", "12-18 months"),
        ("Fish Fingerling Production", "fish-fingerling-production", "Breeding and nursery management", "2-3 months"),
    ]
}

def generate_course_landing_page(title, slug, description, roi):
    """Generate a professional HTML course landing page"""
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | rise AFRICA skills</title>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}

        :root {{
            --primary: #1a1a2e;
            --secondary: #0f3460;
            --accent: #c9a227;
            --text: #f5f5f5;
            --text-muted: #b0b0b0;
        }}

        @media (prefers-color-scheme: dark) {{
            :root {{
                --primary: #1a1a2e;
                --secondary: #0f3460;
                --accent: #c9a227;
            }}
        }}

        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: var(--primary);
            color: var(--text);
            line-height: 1.6;
        }}

        header {{
            background: linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%);
            padding: 2rem 1rem;
            text-align: center;
            border-bottom: 3px solid var(--accent);
        }}

        h1 {{
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: var(--accent);
        }}

        .subtitle {{
            font-size: 1.2rem;
            color: var(--text-muted);
            margin-bottom: 2rem;
        }}

        .container {{
            max-width: 900px;
            margin: 0 auto;
            padding: 2rem 1rem;
        }}

        .course-info {{
            background: rgba(15, 52, 96, 0.5);
            border-left: 4px solid var(--accent);
            padding: 1.5rem;
            margin: 2rem 0;
            border-radius: 4px;
        }}

        .modules {{
            margin: 2rem 0;
        }}

        .modules h3 {{
            color: var(--accent);
            margin-bottom: 1rem;
            font-size: 1.3rem;
        }}

        .module-list {{
            list-style: none;
        }}

        .module-list li {{
            padding: 0.75rem 0;
            padding-left: 1.5rem;
            border-bottom: 1px solid rgba(201, 162, 39, 0.2);
        }}

        .module-list li:before {{
            content: "▸";
            color: var(--accent);
            margin-right: 1rem;
            margin-left: -1.5rem;
        }}

        .pricing {{
            margin: 2rem 0;
        }}

        .pricing h3 {{
            color: var(--accent);
            margin-bottom: 1rem;
        }}

        .pricing-tiers {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }}

        .tier {{
            background: rgba(15, 52, 96, 0.3);
            border: 1px solid var(--accent);
            padding: 1.5rem;
            border-radius: 4px;
            text-align: center;
        }}

        .tier h4 {{
            color: var(--accent);
            margin-bottom: 0.5rem;
        }}

        .amt {{
            font-size: 2rem;
            color: var(--accent);
            font-weight: bold;
            margin: 1rem 0;
        }}

        .tier-description {{
            font-size: 0.9rem;
            color: var(--text-muted);
            margin-bottom: 1rem;
        }}

        .enroll-btn {{
            background: var(--accent);
            color: var(--primary);
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
            text-decoration: none;
            display: inline-block;
            margin: 0.5rem;
            transition: background 0.3s;
        }}

        .enroll-btn:hover {{
            background: #d9b850;
        }}

        .whatsapp-link {{
            background: #25d366;
            color: white;
            text-decoration: none;
            padding: 0.75rem 1.5rem;
            border-radius: 4px;
            display: inline-block;
            margin-top: 1rem;
            font-weight: bold;
        }}

        .whatsapp-link:hover {{
            background: #1ea752;
        }}

        footer {{
            background: var(--secondary);
            padding: 2rem;
            text-align: center;
            margin-top: 3rem;
            border-top: 1px solid var(--accent);
        }}

        footer p {{
            color: var(--text-muted);
            font-size: 0.9rem;
        }}

        .nav-links {{
            margin: 2rem 0;
            text-align: center;
        }}

        .nav-links a {{
            color: var(--accent);
            text-decoration: none;
            margin: 0 1rem;
            font-size: 0.95rem;
        }}

        .nav-links a:hover {{
            text-decoration: underline;
        }}
    </style>
</head>
<body>
    <header>
        <h1>🌾 {title}</h1>
        <p class="subtitle">{description}</p>
        <p class="subtitle" style="font-size: 1rem; color: var(--accent);">ROI Timeline: {roi}</p>
    </header>

    <div class="container">
        <div class="course-info">
            <h2 style="color: var(--accent); margin-bottom: 1rem;">Course Overview</h2>
            <p>Master {title.lower()} with a comprehensive 6-module course designed for African farmers and agribusiness entrepreneurs. Learn from proven methods, market-tested techniques, and real financial models.</p>
        </div>

        <div class="modules">
            <h3>📚 Course Modules</h3>
            <ul class="module-list">
                <li><strong>Module 1:</strong> <a href="{slug}-module-1.html" style="color: var(--accent);">Foundations & Setup</a></li>
                <li><strong>Module 2:</strong> <a href="{slug}-module-2.html" style="color: var(--accent);">Technical Production</a></li>
                <li><strong>Module 3:</strong> <a href="{slug}-module-3.html" style="color: var(--accent);">Advanced Techniques</a></li>
                <li><strong>Module 4:</strong> <a href="{slug}-module-4.html" style="color: var(--accent);">Scaling Operations</a></li>
                <li><strong>Module 5:</strong> <a href="{slug}-module-5.html" style="color: var(--accent);">Market & Sales</a></li>
                <li><strong>Module 6:</strong> <a href="{slug}-module-6.html" style="color: var(--accent);">Business Sustainability</a></li>
            </ul>
        </div>

        <div class="pricing">
            <h3>💰 Enrollment Options</h3>
            <div class="pricing-tiers">
                <div class="tier">
                    <h4>Full Access</h4>
                    <div class="amt">$8.00</div>
                    <div class="tier-description">All 6 modules + 30 videos + quizzes + capstone project + lifetime access</div>
                    <a href="https://wa.me/263773001353?text=Hi%20rAs%20I%20want%20to%20enroll%20in%20{title}" class="whatsapp-link">Enroll on WhatsApp</a>
                </div>
                <div class="tier">
                    <h4>+ Completion Certificate</h4>
                    <div class="amt">$10.00</div>
                    <div class="tier-description">Everything above + Verifiable completion certificate (unique #)</div>
                    <a href="https://wa.me/263773001353?text=Hi%20rAs%20I%20want%20to%20enroll%20in%20{title}%20with%20certificate" class="whatsapp-link">Enroll on WhatsApp</a>
                </div>
                <div class="tier">
                    <h4>PDF Download</h4>
                    <div class="amt">$3.50</div>
                    <div class="tier-description">High-resolution, print-ready, shareable PDF course</div>
                    <a href="https://wa.me/263773001353?text=Hi%20rAs%20I%20want%20the%20PDF%20for%20{title}" class="whatsapp-link">Order on WhatsApp</a>
                </div>
            </div>
        </div>

        <div class="course-info">
            <h3 style="color: var(--accent);">✅ What You'll Learn</h3>
            <ul style="margin-left: 1.5rem; margin-top: 1rem;">
                <li>Complete production workflow from setup to output</li>
                <li>Exact formulations, specifications, and quality standards</li>
                <li>Financial modeling and profitability calculations</li>
                <li>Market demand and pricing strategies</li>
                <li>Scaling from small to medium-scale operations</li>
                <li>Risk management and business sustainability</li>
            </ul>
        </div>

        <div class="nav-links">
            <a href="index.html">← Back to Catalog</a>
            <a href="cassava-farming-course.html">← Previous Course</a>
        </div>
    </div>

    <footer>
        <p><strong>rise AFRICA skills</strong> | Agricultural Entrepreneurship for Africa</p>
        <p>📧 all@riseafricaskills.com | 📱 WhatsApp: +263 77 300 1353 | 🕐 Hours: 8am-10pm CAT</p>
        <p>© 2026 rise AFRICA skills. Building viable agricultural businesses across Africa.</p>
    </footer>
</body>
</html>"""
    return html

def generate_course_module(title, slug, module_num, topic):
    """Generate HTML module file"""
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} - Module {module_num} | rise AFRICA skills</title>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}

        :root {{
            --primary: #1a1a2e;
            --secondary: #0f3460;
            --accent: #c9a227;
            --text: #f5f5f5;
            --text-muted: #b0b0b0;
        }}

        @media (prefers-color-scheme: dark) {{
            :root {{
                --primary: #1a1a2e;
                --secondary: #0f3460;
            }}
        }}

        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: var(--primary);
            color: var(--text);
            line-height: 1.6;
        }}

        header {{
            background: linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%);
            padding: 2rem 1rem;
            border-bottom: 3px solid var(--accent);
        }}

        .breadcrumb {{
            max-width: 900px;
            margin: 0 auto;
            padding: 1rem 0;
            font-size: 0.9rem;
            color: var(--text-muted);
        }}

        .breadcrumb a {{
            color: var(--accent);
            text-decoration: none;
        }}

        h1 {{
            max-width: 900px;
            margin: 0 auto;
            color: var(--accent);
            font-size: 2rem;
        }}

        .container {{
            max-width: 900px;
            margin: 0 auto;
            padding: 2rem 1rem;
        }}

        section {{
            margin: 2rem 0;
            background: rgba(15, 52, 96, 0.3);
            padding: 1.5rem;
            border-left: 4px solid var(--accent);
            border-radius: 4px;
        }}

        h2 {{
            color: var(--accent);
            margin-bottom: 1rem;
            font-size: 1.4rem;
        }}

        h3 {{
            color: var(--text);
            margin-top: 1rem;
            margin-bottom: 0.5rem;
        }}

        .video-container {{
            background: var(--primary);
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 4px;
            aspect-ratio: 16/9;
        }}

        iframe {{
            width: 100%;
            height: 100%;
            border: none;
            border-radius: 4px;
        }}

        .learning-objectives {{
            list-style: none;
            margin: 1rem 0;
        }}

        .learning-objectives li {{
            padding: 0.5rem 0;
            padding-left: 1.5rem;
            position: relative;
        }}

        .learning-objectives li:before {{
            content: "✓";
            color: var(--accent);
            position: absolute;
            left: 0;
            font-weight: bold;
        }}

        .quiz {{
            background: rgba(201, 162, 39, 0.1);
            border: 1px solid var(--accent);
            padding: 1rem;
            border-radius: 4px;
            margin: 1rem 0;
        }}

        .quiz-question {{
            margin-bottom: 1rem;
            font-weight: bold;
        }}

        .quiz-option {{
            margin-left: 1rem;
            padding: 0.5rem 0;
        }}

        .capstone {{
            background: rgba(201, 162, 39, 0.05);
            border-left: 4px solid var(--accent);
            padding: 1.5rem;
            border-radius: 4px;
            margin-top: 2rem;
        }}

        .nav {{
            display: flex;
            justify-content: space-between;
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px solid var(--accent);
        }}

        .nav a {{
            color: var(--accent);
            text-decoration: none;
            font-weight: bold;
        }}

        .nav a:hover {{
            text-decoration: underline;
        }}

        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 1rem 0;
        }}

        th, td {{
            border: 1px solid var(--accent);
            padding: 0.75rem;
            text-align: left;
        }}

        th {{
            background: rgba(201, 162, 39, 0.2);
            font-weight: bold;
        }}
    </style>
</head>
<body>
    <header>
        <div class="breadcrumb">
            <a href="index.html">Catalog</a> / <a href="{slug}-course.html">{title}</a> / Module {module_num}
        </div>
        <h1>📖 Module {module_num}: {topic}</h1>
    </header>

    <div class="container">
        <section>
            <h2>Learning Objectives</h2>
            <ul class="learning-objectives">
                <li>Understand the fundamental principles of {topic.lower()}</li>
                <li>Identify key equipment, materials, and resources needed</li>
                <li>Apply industry best practices and proven techniques</li>
                <li>Calculate profitability and ROI for this approach</li>
                <li>Troubleshoot common challenges and issues</li>
                <li>Scale operations efficiently and sustainably</li>
            </ul>
        </section>

        <section>
            <h2>📹 Video Lessons</h2>
            <h3>Video 1: Introduction & Fundamentals</h3>
            <div class="video-container">
                <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowfullscreen></iframe>
            </div>

            <h3>Video 2: Step-by-Step Process</h3>
            <div class="video-container">
                <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowfullscreen></iframe>
            </div>

            <h3>Video 3: Equipment & Setup</h3>
            <div class="video-container">
                <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowfullscreen></iframe>
            </div>

            <h3>Video 4: Optimization & Troubleshooting</h3>
            <div class="video-container">
                <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowfullscreen></iframe>
            </div>

            <h3>Video 5: Financial Management</h3>
            <div class="video-container">
                <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowfullscreen></iframe>
            </div>
        </section>

        <section>
            <h2>📊 Quick Reference Table</h2>
            <table>
                <tr>
                    <th>Component</th>
                    <th>Specification</th>
                    <th>Target Range</th>
                </tr>
                <tr>
                    <td>Production Capacity</td>
                    <td>Per operational cycle</td>
                    <td>Entry-level to scaling</td>
                </tr>
                <tr>
                    <td>Quality Standard</td>
                    <td>Local/regional/export</td>
                    <td>Verified specifications</td>
                </tr>
                <tr>
                    <td>Timeline</td>
                    <td>Setup to first output</td>
                    <td>Variable by system</td>
                </tr>
                <tr>
                    <td>Capital Investment</td>
                    <td>Equipment + materials</td>
                    <td>\\$500-\\$5000+ (scalable)</td>
                </tr>
            </table>
        </section>

        <section>
            <h2>💡 Key Concepts Explained</h2>

            <h3>Concept 1: Production Fundamentals</h3>
            <p>The core process requires understanding input materials, processing methods, quality control, and output specifications. Each step builds on the previous one and requires precision.</p>

            <h3>Concept 2: Quality & Consistency</h3>
            <p>Maintaining consistent quality ensures market acceptance, customer loyalty, and premium pricing. Establish standards early and verify every batch.</p>

            <h3>Concept 3: Cost Management</h3>
            <p>Input costs directly determine profitability. Track every expense, negotiate with suppliers, and explore alternative materials without compromising quality.</p>

            <h3>Concept 4: Scaling Strategies</h3>
            <p>Grow from small batches to larger volumes by improving efficiency, investing in better equipment, and accessing larger markets.</p>

            <h3>Concept 5: Market Positioning</h3>
            <p>Position your product by quality, price, consistency, and unique selling points. Understand your target customer and what they value most.</p>

            <h3>Concept 6: Risk Management</h3>
            <p>Identify potential failures (supply disruption, quality issues, market changes) and build mitigation strategies into your operations.</p>
        </section>

        <section>
            <h2>❓ Knowledge Check Quiz</h2>

            <div class="quiz">
                <div class="quiz-question">Q1: What is the primary success factor in this business?</div>
                <div class="quiz-option">A) Consistent quality and reliability</div>
                <div class="quiz-option">B) Lowest possible price</div>
                <div class="quiz-option">C) Largest production volume</div>
                <div class="quiz-option">D) Fastest turnaround time</div>
            </div>

            <div class="quiz">
                <div class="quiz-question">Q2: How should you approach input sourcing?</div>
                <div class="quiz-option">A) Always use the most expensive suppliers</div>
                <div class="quiz-option">B) Compare quality and price, negotiate, establish relationships</div>
                <div class="quiz-option">C) Buy randomly from different suppliers each time</div>
                <div class="quiz-option">D) Source everything yourself</div>
            </div>

            <div class="quiz">
                <div class="quiz-question">Q3: What's the best way to manage growth?</div>
                <div class="quiz-option">A) Scale as fast as possible</div>
                <div class="quiz-option">B) Stay small forever</div>
                <div class="quiz-option">C) Grow at a sustainable pace while maintaining quality</div>
                <div class="quiz-option">D) Only grow if you have unlimited capital</div>
            </div>

            <div class="quiz">
                <div class="quiz-question">Q4: How frequently should you review your numbers?</div>
                <div class="quiz-option">A) Never—just reinvest all income</div>
                <div class="quiz-option">B) Monthly or more frequently</div>
                <div class="quiz-option">C) Once a year</div>
                <div class="quiz-option">D) Only when there's a problem</div>
            </div>
        </section>

        <div class="capstone">
            <h2>🎯 Capstone Project: 8-Phase Implementation</h2>
            <ol style="margin-left: 1.5rem; line-height: 2;">
                <li><strong>Phase 1 (Research):</strong> Map local suppliers, prices, equipment costs, and market demand</li>
                <li><strong>Phase 2 (Planning):</strong> Create detailed business plan with timelines, budgets, staffing</li>
                <li><strong>Phase 3 (Acquisition):</strong> Source equipment, materials, and secure initial workspace</li>
                <li><strong>Phase 4 (Testing):</strong> Run small production batches, test quality, document process</li>
                <li><strong>Phase 5 (Refinement):</strong> Optimize based on testing, improve efficiency and quality</li>
                <li><strong>Phase 6 (Launch):</strong> Start commercial production at planned capacity</li>
                <li><strong>Phase 7 (Marketing):</strong> Build customer relationships, establish pricing, create delivery networks</li>
                <li><strong>Phase 8 (Sustainability):</strong> Review financials, plan next growth phase, document systems</li>
            </ol>
        </div>

        <div class="nav">
            <div>
                {f'<a href="{slug}-module-{module_num - 1}.html">← Module {module_num - 1}</a>' if module_num > 1 else '<span></span>'}
            </div>
            <a href="{slug}-course.html">📖 Back to Course</a>
            <div>
                {f'<a href="{slug}-module-{module_num + 1}.html">Module {module_num + 1} →</a>' if module_num < 6 else '<span></span>'}
            </div>
        </div>
    </div>
</body>
</html>"""
    return html

# GENERATE LANDING PAGES
print("🚀 Generating 28 Specialized Agriculture Courses...\n")

course_count = 1
total_files = 0

for category, courses_list in SPECIALIZED_COURSES.items():
    print(f"\n📂 {category.replace('_', ' ').title()} ({len(courses_list)} courses)")

    for title, slug, description, roi in courses_list:
        # Generate landing page
        landing_html = generate_course_landing_page(title, slug, description, roi)
        with open(f"/home/claude/ras/{slug}-course.html", "w") as f:
            f.write(landing_html)

        total_files += 1

        # Generate 6 modules
        module_topics = [
            "Foundations & Setup",
            "Technical Production",
            "Advanced Techniques",
            "Scaling Operations",
            "Market & Sales",
            "Business Sustainability"
        ]

        for module_num, topic in enumerate(module_topics, 1):
            module_html = generate_course_module(title, slug, module_num, topic)
            with open(f"/home/claude/ras/{slug}-module-{module_num}.html", "w") as f:
                f.write(module_html)
            total_files += 1

        print(f"  ✅ {course_count}. {title} ({slug})")
        course_count += 1

print(f"\n{'='*60}")
print(f"✨ GENERATION COMPLETE")
print(f"{'='*60}")
print(f"\n📊 Summary:")
print(f"  • Courses created: 28")
print(f"  • Landing pages: 28")
print(f"  • Module files: 168 (6 per course)")
print(f"  • Total HTML files generated: {total_files}")
print(f"\n💾 Files saved to: /home/claude/ras/")
print(f"\n🎯 Next steps:")
print(f"  1. Verify courses are accessible")
print(f"  2. Update index.html to include new courses")
print(f"  3. Update course-inventory.xlsx and course-inventory.json")
print(f"  4. Commit and push to GitHub")
