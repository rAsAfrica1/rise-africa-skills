window.COURSE_CONFIGS = window.COURSE_CONFIGS || {};

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
  "unit": { "name": "Aluminium gate or frame (job)", "variableCost": 90, "price": 220 },
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

window.COURSE_CONFIGS["pizza-oven-construction-wood-fired-12-pizza"] = {
  "title": "Pizza Oven Construction",
  "note": "Building and selling wood-fired pizza ovens.",
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
    { "item": "Fuel (wood)", "amount": 80 },
    { "item": "Transport + delivery", "amount": 60 },
    { "item": "Marketing", "amount": 40 }
  ],
  "unit": { "name": "Completed oven (sold)", "variableCost": 1100, "price": 2200 },
  "volume": { "monthly": 2 }
};
