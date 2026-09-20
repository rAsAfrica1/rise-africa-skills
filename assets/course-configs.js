window.COURSE_CONFIGS = {};

window.COURSE_CONFIGS["aluminium-welding-fundamentals"] = {
  "title": "Aluminium Welding Fundamentals",
  "note": "Small aluminium welding workshop.",
  "startup": [
    { "item": "TIG welder (AC/DC, 200A)", "qty": 1, "unit": 1400 },
    { "item": "MIG welder with spool gun", "qty": 1, "unit": 950 },
    { "item": "Argon cylinder + regulator", "qty": 1, "unit": 280 },
    { "item": "Tools, PPE, jigs", "qty": 1, "unit": 950 }
  ],
  "monthlyFixed": [
    { "item": "Workshop rent", "amount": 150 },
    { "item": "Electricity", "amount": 120 },
    { "item": "Gas + consumables", "amount": 180 }
  ],
  "unit": { "name": "Aluminium gate or frame", "variableCost": 90, "price": 220 },
  "volume": { "monthly": 12 }
};

window.COURSE_CONFIGS["cold-room-for-10-beasts"] = {
  "title": "Cold Room for 4-10 Beasts",
  "note": "Small walk-in cold room.",
  "startup": [
    { "item": "Cold room panels (6 m2)", "qty": 1, "unit": 1400 },
    { "item": "Condensing unit (2 HP)", "qty": 1, "unit": 700 },
    { "item": "Evaporator + piping", "qty": 1, "unit": 400 },
    { "item": "Racking + fittings + install", "qty": 1, "unit": 1300 }
  ],
  "monthlyFixed": [
    { "item": "Electricity", "amount": 220 },
    { "item": "Maintenance", "amount": 70 },
    { "item": "Labor + insurance", "amount": 160 }
  ],
  "unit": { "name": "Carcass stored per day", "variableCost": 2.0, "price": 5.5 },
  "volume": { "monthly": 300 }
};

window.COURSE_CONFIGS["pizza-oven-construction-wood-fired-12-pizza"] = {
  "title": "Pizza Oven Construction",
  "note": "Building and selling wood-fired pizza ovens.",
  "startup": [
    { "item": "Fire bricks + mortar", "qty": 1, "unit": 600 },
    { "item": "Insulation + chimney", "qty": 1, "unit": 330 },
    { "item": "Stone base + tools", "qty": 1, "unit": 460 },
    { "item": "Pizza peels + serving kit", "qty": 1, "unit": 130 }
  ],
  "monthlyFixed": [
    { "item": "Workshop rent", "amount": 100 },
    { "item": "Fuel + transport", "amount": 140 },
    { "item": "Marketing", "amount": 40 }
  ],
  "unit": { "name": "Completed oven (sold)", "variableCost": 1100, "price": 2200 },
  "volume": { "monthly": 2 }
};

window.COURSE_CONFIGS["fish-pond-construction"] = {
  "title": "Fish Pond Construction",
  "note": "Small-scale pond aquaculture.",
  "startup": [
    { "item": "Excavation (1 hectare)", "qty": 1, "unit": 1800 },
    { "item": "HDPE liner (2000 m2)", "qty": 1, "unit": 2400 },
    { "item": "Pipes, valves, pump", "qty": 1, "unit": 1150 },
    { "item": "Aerators + test kit", "qty": 1, "unit": 1320 },
    { "item": "First stocking + feed", "qty": 1, "unit": 1560 }
  ],
  "monthlyFixed": [
    { "item": "Feed (grow-out)", "amount": 620 },
    { "item": "Electricity (aerators)", "amount": 180 },
    { "item": "Labor + water testing", "amount": 190 }
  ],
  "unit": { "name": "kg of harvested tilapia", "variableCost": 1.8, "price": 3.5 },
  "volume": { "monthly": 350 }
};

window.COURSE_CONFIGS["beehive-construction"] = {
  "title": "Beehive Construction",
  "note": "Building beehives + honey production.",
  "startup": [
    { "item": "Timber (30 hives)", "qty": 30, "unit": 18 },
    { "item": "Table saw + hand tools", "qty": 1, "unit": 650 },
    { "item": "Frames + foundation", "qty": 300, "unit": 2.5 },
    { "item": "Suits, smoker, hive tools", "qty": 1, "unit": 240 },
    { "item": "10 bee colonies", "qty": 10, "unit": 65 }
  ],
  "monthlyFixed": [
    { "item": "Workshop rent", "amount": 120 },
    { "item": "Transport + electricity", "amount": 100 }
  ],
  "unit": { "name": "Complete beehive (sold)", "variableCost": 32, "price": 75 },
  "volume": { "monthly": 25 }
};

window.COURSE_CONFIGS["wind-turbine-basics"] = {
  "title": "Wind Turbine Basics",
  "note": "Small-scale wind power installation.",
  "startup": [
    { "item": "Turbine kit (1-3 kW)", "qty": 1, "unit": 1800 },
    { "item": "Tower (12m)", "qty": 1, "unit": 900 },
    { "item": "Controller + inverter", "qty": 1, "unit": 750 },
    { "item": "Battery bank (4x 200Ah)", "qty": 1, "unit": 1200 },
    { "item": "Cables + install + tools", "qty": 1, "unit": 780 }
  ],
  "monthlyFixed": [
    { "item": "Transport + data", "amount": 80 },
    { "item": "Marketing", "amount": 15 }
  ],
  "unit": { "name": "Installed turbine system", "variableCost": 3800, "price": 5500 },
  "volume": { "monthly": 2 }
};

window.COURSE_CONFIGS["smelting-fundamentals"] = {
  "title": "Smelting Fundamentals",
  "note": "Small-scale metal recovery and casting.",
  "startup": [
    { "item": "Furnace (clay/brick)", "qty": 1, "unit": 400 },
    { "item": "Blower + tuyere", "qty": 1, "unit": 180 },
    { "item": "Crucibles + moulds", "qty": 1, "unit": 510 },
    { "item": "Safety gear + tools", "qty": 1, "unit": 550 },
    { "item": "Initial scrap metal", "qty": 1, "unit": 600 }
  ],
  "monthlyFixed": [
    { "item": "Charcoal / coke", "amount": 180 },
    { "item": "Raw material", "amount": 350 },
    { "item": "Labour + transport", "amount": 200 }
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
    { "item": "Hammers, tongs, chisels", "qty": 1, "unit": 270 },
    { "item": "Post vice", "qty": 1, "unit": 180 },
    { "item": "Fuel + steel stock", "qty": 1, "unit": 350 }
  ],
  "monthlyFixed": [
    { "item": "Fuel (coal/charcoal)", "amount": 180 },
    { "item": "Steel stock", "amount": 250 },
    { "item": "Rent + transport", "amount": 120 }
  ],
  "unit": { "name": "Hoe, machete or hand tool", "variableCost": 6, "price": 18 },
  "volume": { "monthly": 60 }
};

window.COURSE_CONFIGS["buildings-for-preservation-10-methods-"] = {
  "title": "Buildings for Preservation (10 Methods)",
  "note": "Small construction for preservation structures.",
  "startup": [
    { "item": "Hand tools + mixing tubs", "qty": 1, "unit": 530 },
    { "item": "Cement mixer (small)", "qty": 1, "unit": 550 },
    { "item": "Scaffolding + safety gear", "qty": 1, "unit": 580 },
    { "item": "Transport (trailer)", "qty": 1, "unit": 700 }
  ],
  "monthlyFixed": [
    { "item": "Vehicle fuel + maintenance", "amount": 220 },
    { "item": "Labour (2 workers)", "amount": 400 },
    { "item": "Phone + tool fund", "amount": 100 }
  ],
  "unit": { "name": "Small preservation structure", "variableCost": 900, "price": 1800 },
  "volume": { "monthly": 2 }
};

window.COURSE_CONFIGS["pork-processing-full"] = {
  "title": "Processing a Pig Fully",
  "note": "Small pork processing operation.",
  "startup": [
    { "item": "Work tables + bandsaw", "qty": 1, "unit": 1390 },
    { "item": "Stuffer + mincer + sealer", "qty": 1, "unit": 1370 },
    { "item": "Cold room + curing fridge", "qty": 1, "unit": 3900 },
    { "item": "Smokehouse build", "qty": 1, "unit": 900 },
    { "item": "Tools, licenses, misc", "qty": 1, "unit": 580 }
  ],
  "monthlyFixed": [
    { "item": "Rent + electricity + water", "amount": 300 },
    { "item": "Casings, spices, cure", "amount": 180 },
    { "item": "Packaging + transport", "amount": 160 },
    { "item": "Labor (1 assistant)", "amount": 180 }
  ],
  "unit": { "name": "Mixed product basket per pig", "variableCost": 120, "price": 210 },
  "volume": { "monthly": 8 }
};