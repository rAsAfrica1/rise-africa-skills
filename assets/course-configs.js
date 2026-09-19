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
