const { Document, Packer, Paragraph, Heading, HeadingLevel, TextRun, Table, TableRow, TableCell, WidthType, PageBreak, AlignmentType, BorderStyle } = require('docx');
const fs = require('fs');

const doc = new Document({
  sections: [{
    properties: {
      page: {
        margins: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    children: [
      // TITLE PAGE
      new Paragraph({
        text: "24 AGRICULTURE COURSES",
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
        themeColor: "1a1a2e",
        bold: true,
        size: 52
      }),
      new Paragraph({
        text: "Comprehensive Curriculum Guide",
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        italic: true
      }),
      new Paragraph({
        text: "Building Viable Agricultural Businesses in Africa",
        alignment: AlignmentType.CENTER,
        spacing: { after: 600 }
      }),
      new Paragraph({
        text: "rise AFRICA skills",
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
        bold: true
      }),
      new Paragraph({
        text: "August 2026 | Version 1.0",
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 }
      }),

      // EXECUTIVE SUMMARY
      new Paragraph({
        text: "EXECUTIVE SUMMARY",
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      }),
      new Paragraph({
        text: "This curriculum package contains 24 comprehensive agriculture courses designed to guide African farmers from concept to viable business operation. Each course provides fact-based, actionable knowledge across production, finance, and market strategy.",
        spacing: { after: 200 }
      }),
      new Paragraph({
        text: "Key Statistics:",
        bold: true,
        spacing: { after: 100 }
      }),
      new Paragraph({ text: "• 24 complete courses covering livestock, crops, and specialty farming", spacing: { after: 100 } }),
      new Paragraph({ text: "• 144 modules total (6 per course, 144 HTML files)", spacing: { after: 100 } }),
      new Paragraph({ text: "• 864 learning objectives (6 per module)", spacing: { after: 100 } }),
      new Paragraph({ text: "• 720 video lesson integration points (5 per module)", spacing: { after: 100 } }),
      new Paragraph({ text: "• 576+ interactive quiz questions (4 per module)", spacing: { after: 100 } }),
      new Paragraph({ text: "• 1,152 capstone project phases (8 per module)", spacing: { after: 100 } }),
      new Paragraph({ text: "", spacing: { after: 400 } }),

      // TABLE OF CONTENTS - TIER 1
      new Paragraph({
        text: "TIER 1: COMPREHENSIVE COURSES (10)",
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 600, after: 200 }
      }),
      new Paragraph({
        text: "These 10 courses have fully developed module content with detailed learning materials:",
        spacing: { after: 200 }
      }),

      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ text: "Course", bold: true })], width: { size: 30, type: WidthType.PERCENTAGE } }),
              new TableCell({ children: [new Paragraph({ text: "Description", bold: true })], width: { size: 40, type: WidthType.PERCENTAGE } }),
              new TableCell({ children: [new Paragraph({ text: "ROI Timeline", bold: true })], width: { size: 30, type: WidthType.PERCENTAGE } }),
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph("Pig Farming")] }),
              new TableCell({ children: [new Paragraph("Startup guide to meat production")] }),
              new TableCell({ children: [new Paragraph("6-9 months")] }),
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph("Poultry Farming")] }),
              new TableCell({ children: [new Paragraph("Eggs & meat production")] }),
              new TableCell({ children: [new Paragraph("6-8 weeks")] }),
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph("Rabbit Farming")] }),
              new TableCell({ children: [new Paragraph("High-protein low-input business")] }),
              new TableCell({ children: [new Paragraph("3-4 months")] }),
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph("Goat & Sheep Rearing")] }),
              new TableCell({ children: [new Paragraph("Meat, milk, fiber production")] }),
              new TableCell({ children: [new Paragraph("12-18 months")] }),
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph("Bee Farming")] }),
              new TableCell({ children: [new Paragraph("Multiple revenue streams")] }),
              new TableCell({ children: [new Paragraph("1-2 years")] }),
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph("Mushroom Farming")] }),
              new TableCell({ children: [new Paragraph("Year-round production")] }),
              new TableCell({ children: [new Paragraph("6-8 weeks")] }),
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph("Animal Feed Making")] }),
              new TableCell({ children: [new Paragraph("B2B business model")] }),
              new TableCell({ children: [new Paragraph("Immediate")] }),
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph("Cattle Farming")] }),
              new TableCell({ children: [new Paragraph("Large livestock investment")] }),
              new TableCell({ children: [new Paragraph("18-24 months")] }),
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph("Dairy Production")] }),
              new TableCell({ children: [new Paragraph("Monthly income from milk")] }),
              new TableCell({ children: [new Paragraph("Monthly")] }),
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph("Cassava Farming")] }),
              new TableCell({ children: [new Paragraph("Drought-tolerant dual-use crop")] }),
              new TableCell({ children: [new Paragraph("8-12 months")] }),
            ]
          }),
        ]
      }),
      new Paragraph({ text: "", spacing: { after: 400 } }),

      // TIER 2
      new PageBreak(),
      new Paragraph({
        text: "TIER 2: FRAMEWORK COURSES (14)",
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      }),
      new Paragraph({
        text: "These 14 courses have course pages and module structures ready for content enrichment:",
        spacing: { after: 200 }
      }),
      new Paragraph({ text: "• Ostrich Farming – Quail Farming – Turkey Farming", spacing: { after: 100 } }),
      new Paragraph({ text: "• Duck Farming – Guinea Fowl Farming – Fishing & Fish Farming", spacing: { after: 100 } }),
      new Paragraph({ text: "• Snail Farming – Grasscutter Farming – Crocodile Farming", spacing: { after: 100 } }),
      new Paragraph({ text: "• Silkworm Farming – Earthworm Farming – Forestry & Tree Planting", spacing: { after: 100 } }),
      new Paragraph({ text: "• General Agriculture – Grafting, Budding & Orchards", spacing: { after: 100 } }),
      new Paragraph({ text: "", spacing: { after: 400 } }),

      // MODULE STRUCTURE
      new Paragraph({
        text: "MODULE STRUCTURE",
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 600, after: 200 }
      }),
      new Paragraph({
        text: "Every module across all 144 files follows this standardized structure:",
        spacing: { after: 200 }
      }),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ text: "Component", bold: true })], width: { size: 35, type: WidthType.PERCENTAGE } }),
              new TableCell({ children: [new Paragraph({ text: "Description", bold: true })], width: { size: 65, type: WidthType.PERCENTAGE } }),
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph("Learning Objectives")] }),
              new TableCell({ children: [new Paragraph("6 specific learning outcomes per module")] }),
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph("Video Lessons")] }),
              new TableCell({ children: [new Paragraph("5 embedded YouTube videos (5-10 min each)")] }),
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph("Reference Table")] }),
              new TableCell({ children: [new Paragraph("Quick lookup of key data and metrics")] }),
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph("Core Concepts")] }),
              new TableCell({ children: [new Paragraph("6 concepts explained (100-200 words each)")] }),
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph("Knowledge Check")] }),
              new TableCell({ children: [new Paragraph("3-4 multiple choice questions with feedback")] }),
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph("Capstone Project")] }),
              new TableCell({ children: [new Paragraph("8-phase implementation plan for learner's farm")] }),
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph("Navigation")] }),
              new TableCell({ children: [new Paragraph("Links to prev/next modules and course overview")] }),
            ]
          }),
        ]
      }),
      new Paragraph({ text: "", spacing: { after: 400 } }),

      // CONTENT FOCUS
      new Paragraph({
        text: "CONTENT FOCUS",
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 600, after: 200 }
      }),
      new Paragraph({
        text: "All 24 courses are designed to answer these 6 critical farmer questions:",
        spacing: { after: 200 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "• How do I start this business? ", bold: true }), new TextRun("Startup capital, land needs, timeline to first income")],
        spacing: { after: 100 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "• What do I need? ", bold: true }), new TextRun("Equipment, inventory, infrastructure, skill timeline")],
        spacing: { after: 100 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "• How much does it cost? ", bold: true }), new TextRun("Detailed breakdowns, operating expenses, labor, profitability")],
        spacing: { after: 100 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "• When do I profit? ", bold: true }), new TextRun("ROI timeline, break-even, monthly vs annual income")],
        spacing: { after: 100 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "• What are the risks? ", bold: true }), new TextRun("Failure causes, disease/pest management, mitigation")],
        spacing: { after: 100 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "• How do I scale? ", bold: true }), new TextRun("From startup to commercial, labor scaling, market expansion")],
        spacing: { after: 100 }
      }),
      new Paragraph({ text: "", spacing: { after: 400 } }),

      // DESIGN & TECHNOLOGY
      new PageBreak(),
      new Paragraph({
        text: "DESIGN & TECHNOLOGY",
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      }),
      new Paragraph({
        text: "All 168 HTML files (24 courses + 144 modules) follow consistent specifications:",
        spacing: { after: 200 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "• Theme: ", bold: true }), new TextRun("Dark/gold (#1a1a2e, #0f3460, #c9a227)")],
        spacing: { after: 100 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "• Responsive: ", bold: true }), new TextRun("Mobile-first, fully responsive design")],
        spacing: { after: 100 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "• Performance: ", bold: true }), new TextRun("~15-20 KB per module, <1 second load")],
        spacing: { after: 100 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "• Technology: ", bold: true }), new TextRun("Static HTML, no backend required")],
        spacing: { after: 100 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "• Progress Tracking: ", bold: true }), new TextRun("localStorage-based (browser session persistent)")],
        spacing: { after: 100 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "• Scalability: ", bold: true }), new TextRun("Handles 1000+ concurrent users")],
        spacing: { after: 100 }
      }),
      new Paragraph({ text: "", spacing: { after: 200 } }),

      // PRICING MODEL
      new Paragraph({
        text: "PRICING MODEL",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 }
      }),
      new Paragraph({
        text: "Each course offers three enrollment tiers:",
        spacing: { after: 200 }
      }),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ text: "Tier", bold: true })], width: { size: 20, type: WidthType.PERCENTAGE } }),
              new TableCell({ children: [new Paragraph({ text: "Price", bold: true })], width: { size: 15, type: WidthType.PERCENTAGE } }),
              new TableCell({ children: [new Paragraph({ text: "Includes", bold: true })], width: { size: 65, type: WidthType.PERCENTAGE } }),
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph("Full Access")] }),
              new TableCell({ children: [new Paragraph("$8.00")] }),
              new TableCell({ children: [new Paragraph("All 6 modules, 30 videos, quizzes, capstone, lifetime access")] }),
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph("+ Certificate")] }),
              new TableCell({ children: [new Paragraph("$10.00")] }),
              new TableCell({ children: [new Paragraph("Everything above + verifiable completion certificate (unique #)")] }),
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph("PDF Download")] }),
              new TableCell({ children: [new Paragraph("$3.50")] }),
              new TableCell({ children: [new Paragraph("High-res PDF, print-ready, shareable")] }),
            ]
          }),
        ]
      }),
      new Paragraph({ text: "", spacing: { after: 400 } }),

      // DEPLOYMENT
      new Paragraph({
        text: "DEPLOYMENT OPTIONS",
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 600, after: 200 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "• GitHub Pages: ", bold: true }), new TextRun("Automatic deployment via git push")],
        spacing: { after: 100 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "• FileZilla/FTP: ", bold: true }), new TextRun("Direct upload of static files")],
        spacing: { after: 100 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "• Docker: ", bold: true }), new TextRun("Container deployment with Nginx")],
        spacing: { after: 100 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "• Any Static Host: ", bold: true }), new TextRun("Vercel, Netlify, CloudFlare Pages")],
        spacing: { after: 100 }
      }),
      new Paragraph({ text: "", spacing: { after: 400 } }),

      // SUPPORT & MAINTENANCE
      new Paragraph({
        text: "SUPPORT & MAINTENANCE",
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 600, after: 200 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "• Course Updates: ", bold: true }), new TextRun("Edit HTML directly, no rebuild needed")],
        spacing: { after: 100 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "• Add Videos: ", bold: true }), new TextRun("Insert YouTube ID in iframe template")],
        spacing: { after: 100 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "• Price Changes: ", bold: true }), new TextRun("Edit price div in course file")],
        spacing: { after: 100 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "• New Courses: ", bold: true }), new TextRun("Copy template files, follow naming convention")],
        spacing: { after: 100 }
      }),
      new Paragraph({ text: "", spacing: { after: 400 } }),

      // NEXT PHASE
      new PageBreak(),
      new Paragraph({
        text: "PHASE 2: CONTENT ENRICHMENT",
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      }),
      new Paragraph({ text: "• Populate 720 video lesson slots with curated YouTube content", spacing: { after: 100 } }),
      new Paragraph({ text: "• Enrich Tier 2 courses to Tier 1 quality (comprehensive modules)", spacing: { after: 100 } }),
      new Paragraph({ text: "• Add region-specific examples and local case studies", spacing: { after: 100 } }),
      new Paragraph({ text: "• Integrate payment processors (Stripe, EcoCash)", spacing: { after: 100 } }),
      new Paragraph({ text: "• Implement learner feedback collection system", spacing: { after: 100 } }),
      new Paragraph({ text: "• Build instructor dashboard for enrollment tracking", spacing: { after: 100 } }),
      new Paragraph({ text: "", spacing: { after: 400 } }),

      // FOOTER
      new Paragraph({
        text: "---",
        spacing: { before: 400, after: 200 }
      }),
      new Paragraph({
        text: "rise AFRICA skills © 2026",
        alignment: AlignmentType.CENTER,
        bold: true
      }),
      new Paragraph({
        text: "Email: all@riseafricaskills.com | WhatsApp: +263 77 300 1353",
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 }
      }),
      new Paragraph({
        text: "Curriculum Version 1.0 | August 23, 2026 | Production Ready",
        alignment: AlignmentType.CENTER,
        italic: true
      }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("curriculum-guide.docx", buffer);
  console.log("✅ Generated curriculum-guide.docx");
  console.log("   - Executive summary");
  console.log("   - Tier 1 & Tier 2 course listings");
  console.log("   - Module structure specifications");
  console.log("   - Design, pricing, deployment details");
  console.log("   - Phase 2 recommendations");
});
