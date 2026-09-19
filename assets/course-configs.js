window.COURSE_CONFIGS = {};

window.COURSE_CONFIGS["pork-processing-full"] = {
  "title": "Processing a Pig Fully",
  "note": "Typical small Zimbabwean pork processing operation. Adjust to your prices.",
  "startup": [
    { "item": "Stainless work tables (2m)", "qty": 3, "unit": 180 },
    { "item": "Meat bandsaw", "qty": 1, "unit": 850 },
    { "item": "Sausage stuffer (10L)", "qty": 1, "unit": 320 },
    { "item": "Bowl cutter / mincer", "qty": 1, "unit": 450 },
    { "item": "Vacuum sealer (chamber)", "qty": 1, "unit": 600 },
    { "item": "Cold room (3x2x2.4m)", "qty": 1, "unit": 3200 },
    { "item": "Smokehouse build (brick)", "qty": 1, "unit": 900 },
    { "item": "Curing fridge", "qty": 1, "unit": 700 },
    { "item": "Scales, knives, thermometers", "qty": 1, "unit": 280 },
    { "item": "Licensing and permits", "qty": 1, "unit": 150 }
  ],
  "monthlyFixed": [
    { "item": "Rent (processing space)", "amount": 150 },
    { "item": "Electricity (cold room)", "amount": 120 },
    { "item": "Water", "amount": 30 },
    { "item": "Casings, spices, cure", "amount": 180 },
    { "item": "Packaging and labels", "amount": 100 },
    { "item": "Transport", "amount": 60 },
    { "item": "Labor (1 assistant)", "amount": 180 }
  ],
  "unit": { "name": "Mixed product basket per pig (kg equivalent)", "variableCost": 120, "price": 210 },
  "volume": { "monthly": 8 }
};

window.COURSE_CONFIGS["wind-turbine-basics"] = {
  "title": "Wind Turbine Basics",
  "note": "Small-scale wind power installation. Adjust to your market.",
  "startup": [
    { "item": "Turbine kit (1-3 kW)", "qty": 1, "unit": 1800 },
    { "item": "Tower (12m, galvanised)", "qty": 1, "unit": 900 },
    { "item": "Controller + dump load", "qty": 1, "unit": 350 },
    { "item": "Battery bank (4× 200Ah)", "qty": 1, "unit": 1200 },
    { "item": "Inverter (3 kW pure sine)", "qty": 1, "unit": 400 },
    { "item": "Cables, breakers, earthing", "qty": 1, "unit": 250 },
    { "item": "Concrete base + anchors", "qty": 1, "unit": 180 },
    { "item": "Tools", "qty": 1, "unit": 350 }
  ],
  "monthlyFixed": [
    { "item": "Transport", "amount": 60 },
    { "item": "Phone + data", "amount": 20 },
    { "item": "Marketing", "amount": 15 }
  ],
  "unit": { "name": "Installed turbine system (1 customer)", "variableCost": 3800, "price": 5500 },
  "volume": { "monthly": 2 }
};

window.COURSE_CONFIGS["smelting-fundamentals"] = {
  "title": "Smelting Fundamentals",
  "note": "Small-scale metal recovery and casting operation.",
  "startup": [
    { "item": "Furnace (clay/brick, built on site)", "qty": 1, "unit": 400 },
    { "item": "Blower + tuyere", "qty": 1, "unit": 180 },
    { "item": "Crucibles (graphite)", "qty": 6, "unit": 45 },
    { "item": "Moulds (sand casting boxes)", "qty": 4, "unit": 60 },
    { "item": "Safety gear", "qty": 1, "unit": 250 },
    { "item": "Raw metal / scrap (initial)", "qty": 1, "unit": 600 },
    { "item": "Hand tools", "qty": 1, "unit": 300 }
  ],
  "monthlyFixed": [
    { "item": "Charcoal / coke", "amount": 180 },
    { "item": "Raw material top-up", "amount": 350 },
    { "item": "Labour (1 assistant)", "amount": 150 },
    { "item": "Transport", "amount": 50 }
  ],
  "unit": { "name": "kg of finished cast metal", "variableCost": 2.5, "price": 5.0 },
  "volume": { "monthly": 250 }
};

window.COURSE_CONFIGS["basic-blacksmithing"] = {
  "title": "Basic Blacksmithing",
  "note": "Home forge making agricultural and household tools.",
  "startup": [
    { "item": "Forge (brake drum or brick)", "qty": 1, "unit": 120 },
    { "item": "Anvil (50kg)", "qty": 1, "unit": 350 },
    { "item": "Hammers (3 sizes)", "qty": 1, "unit": 90 },
    { "item": "Tongs (3 pairs)", "qty": 1, "unit": 60 },
    { "item": "Chisels, punches, files", "qty": 1, "unit": 120 },
    { "item": "Post vice", "qty": 1, "unit": 180 },
    { "item": "Coal / charcoal (initial)", "qty": 1, "unit": 150 },
    { "item": "Raw steel bar (initial)", "qty": 1, "unit": 200 }
  ],
  "monthlyFixed": [
    { "item": "Fuel (coal/charcoal)", "amount": 180 },
    { "item": "Steel stock", "amount": 250 },
    { "item": "Rent (workshop)", "amount": 80 },
    { "item": "Transport", "amount": 40 }
  ],
  "unit": { "name": "Hoe, machete or hand tool", "variableCost": 6, "price": 18 },
  "volume": { "monthly": 60 }
};

window.COURSE_CONFIGS["buildings-for-preservation-10-methods-"] = {
  "title": "Buildings for Preservation (10 Methods)",
  "note": "Small construction business specialising in preservation structures.",
  "startup": [
    { "item": "Hand tools (trowels, levels, hammers)", "qty": 1, "unit": 350 },
    { "item": "Wheelbarrows + mixing tubs", "qty": 2, "unit": 90 },
    { "item": "Cement mixer (small)", "qty": 1, "unit": 550 },
    { "item": "Scaffolding (set)", "qty": 1, "unit": 400 },
    { "item": "Safety gear", "qty": 1, "unit": 180 },
    { "item": "Transport (tow hitch / trailer)", "qty": 1, "unit": 700 }
  ],
  "monthlyFixed": [
    { "item": "Vehicle fuel + maintenance", "amount": 220 },
    { "item": "Labour (2 workers)", "amount": 400 },
    { "item": "Phone + marketing", "amount": 40 },
    { "item": "Tool replacement fund", "amount": 60 }
  ],
  "unit": { "name": "Small preservation structure", "variableCost": 900, "price": 1800 },
  "volume": { "monthly": 2 }
};
