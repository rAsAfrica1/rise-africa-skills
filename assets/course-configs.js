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

window.COURSE_CONFIGS["fish-pond-construction"] = {
  "title": "Fish Pond Construction",
  "note": "Small-scale pond aquaculture setup. Adjust to your local prices.",
  "startup": [
    { "item": "Excavation (1 hectare pond)", "qty": 1, "unit": 1800 },
    { "item": "Liner (HDPE 1mm, 2000 m²)", "qty": 1, "unit": 2400 },
    { "item": "Inlet/outlet pipes + valves", "qty": 1, "unit": 450 },
    { "item": "Aerator (1 HP paddle wheel)", "qty": 2, "unit": 550 },
    { "item": "Water pump + plumbing", "qty": 1, "unit": 700 },
    { "item": "Test kit (pH, DO, ammonia)", "qty": 1, "unit": 220 },
    { "item": "First stocking: tilapia fingerlings", "qty": 5000, "unit": 0.12 },
    { "item": "Initial feed (50kg bags)", "qty": 30, "unit": 32 }
  ],
  "monthlyFixed": [
    { "item": "Feed (grow-out)", "amount": 620 },
    { "item": "Electricity (aerators)", "amount": 180 },
    { "item": "Labor (1 worker)", "amount": 150 },
    { "item": "Water testing + meds", "amount": 40 }
  ],
  "unit": { "name": "kg of harvested tilapia", "variableCost": 1.8, "price": 3.5 },
  "volume": { "monthly": 350 }
};

window.COURSE_CONFIGS["beehive-construction"] = {
  "title": "Beehive Construction",
  "note": "Building and selling beehives plus honey production from your own hives.",
  "startup": [
    { "item": "Timber (pine, per hive)", "qty": 30, "unit": 18 },
    { "item": "Wire, nails, hinges", "qty": 1, "unit": 180 },
    { "item": "Table saw + hand tools", "qty": 1, "unit": 650 },
    { "item": "Frames + foundation sheets", "qty": 300, "unit": 2.5 },
    { "item": "Protective suits", "qty": 4, "unit": 45 },
    { "item": "Smoker + hive tool", "qty": 2, "unit": 30 },
    { "item": "Bee colonies (starter)", "qty": 10, "unit": 65 },
    { "item": "Workshop rent deposit", "qty": 1, "unit": 200 }
  ],
  "monthlyFixed": [
    { "item": "Workshop rent", "amount": 120 },
    { "item": "Transport", "amount": 60 },
    { "item": "Electricity", "amount": 40 }
  ],
  "unit": { "name": "Complete beehive (sold)", "variableCost": 32, "price": 75 },
  "volume": { "monthly": 25 }
};

window.COURSE_CONFIGS["cold-room-for-410-beasts"] = {
  "title": "Cold Room for 410 Beasts",
  "note": "Cold storage service — slaughterhouse chilled room running at capacity.",
  "startup": [
    { "item": "Cold room panels (100mm, 12 m²)", "qty": 1, "unit": 4200 },
    { "item": "Condensing unit (5 HP)", "qty": 2, "unit": 1800 },
    { "item": "Evaporators + piping", "qty": 2, "unit": 750 },
    { "item": "Racking (stainless)", "qty": 1, "unit": 1200 },
    { "item": "Temperature monitoring", "qty": 1, "unit": 350 },
    { "item": "Backup generator (10 kVA)", "qty": 1, "unit": 2500 },
    { "item": "Installation + electrical", "qty": 1, "unit": 1400 }
  ],
  "monthlyFixed": [
    { "item": "Electricity (main load)", "amount": 850 },
    { "item": "Generator fuel (backup)", "amount": 200 },
    { "item": "Maintenance + refrigerant", "amount": 180 },
    { "item": "Labor (1 attendant)", "amount": 220 },
    { "item": "Insurance", "amount": 90 }
  ],
  "unit": { "name": "Carcass stored per day (per beast)", "variableCost": 3.5, "price": 9.0 },
  "volume": { "monthly": 410 }
};

window.COURSE_CONFIGS["pizza-oven-construction-wood-fired-12-pizza"] = {
  "title": "Pizza Oven Construction",
  "note": "Building and selling wood-fired pizza ovens, plus running a pizza service from a demo oven.",
  "startup": [
    { "item": "Fire bricks (250 pcs)", "qty": 1, "unit": 380 },
    { "item": "Refractory mortar + cement", "qty": 1, "unit": 220 },
    { "item": "Insulation (ceramic fibre)", "qty": 1, "unit": 180 },
    { "item": "Chimney pipe + cap", "qty": 1, "unit": 150 },
    { "item": "Stone base materials", "qty": 1, "unit": 260 },
    { "item": "Tools (trowels, levels)", "qty": 1, "unit": 200 },
    { "item": "Pizza peels + serving kit", "qty": 1, "unit": 130 }
  ],
  "monthlyFixed": [
    { "item": "Workshop rent", "amount": 100 },
    { "item": "Fuel (wood for curing + demo)", "amount": 80 },
    { "item": "Transport + delivery", "amount": 60 },
    { "item": "Marketing", "amount": 40 }
  ],
  "unit": { "name": "Completed oven (sold to customer)", "variableCost": 1100, "price": 2200 },
  "volume": { "monthly": 2 }
};

window.COURSE_CONFIGS["aluminium-welding-fundamentals"] = {
  "title": "Aluminium Welding Fundamentals",
  "note": "Small welding workshop doing aluminium gates, frames and repairs.",
  "startup": [
    { "item": "TIG welder (AC/DC, 200A)", "qty": 1, "unit": 1400 },
    { "item": "MIG welder with spool gun", "qty": 1, "unit": 950 },
    { "item": "Argon gas cylinder + regulator", "qty": 1, "unit": 280 },
    { "item": "Cutting saw + angle grinder", "qty": 1, "unit": 350 },
    { "item": "Stainless brushes, clamps, tools", "qty": 1, "unit": 220 },
    { "item": "Welding table + jigs", "qty": 1, "unit": 400 },
    { "item": "PPE (helmet, gloves, apron)", "qty": 1, "unit": 180 },
    { "item": "Initial aluminium stock", "qty": 1, "unit": 500 }
  ],
  "monthlyFixed": [
    { "item": "Workshop rent", "amount": 150 },
    { "item": "Electricity", "amount": 120 },
    { "item": "Gas refills + consumables", "amount": 180 },
    { "item": "Transport", "amount": 60 }
  ],
  "unit": { "name": "Aluminium gate or frame (typical job)", "variableCost": 90, "price": 220 },
  "volume": { "monthly": 12 }
};

window.COURSE_CONFIGS["cold-room-for-10-beasts"] = {
  "title": "Cold Room for 4-10 Beasts",
  "note": "Small walk-in cold room for a butcher or small abattoir.",
  "startup": [
    { "item": "Cold room panels (100mm, 6 m2)", "qty": 1, "unit": 1400 },
    { "item": "Condensing unit (2 HP)", "qty": 1, "unit": 700 },
    { "item": "Evaporator + piping", "qty": 1, "unit": 400 },
    { "item": "Stainless racking (4 tiers)", "qty": 1, "unit": 450 },
    { "item": "Temperature monitor + alarm", "qty": 1, "unit": 180 },
    { "item": "Electrical + installation", "qty": 1, "unit": 550 },
    { "item": "Door seals + fittings", "qty": 1, "unit": 120 }
  ],
  "monthlyFixed": [
    { "item": "Electricity", "amount": 220 },
    { "item": "Maintenance + refrigerant", "amount": 70 },
    { "item": "Labor (part-time)", "amount": 120 },
    { "item": "Insurance + misc", "amount": 40 }
  ],
  "unit": { "name": "Carcass stored per day", "variableCost": 2.0, "price": 5.5 },
  "volume": { "monthly": 300 }
};
