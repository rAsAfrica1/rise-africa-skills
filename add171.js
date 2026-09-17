const fs = require('fs');
let h = fs.readFileSync('all-courses.html','utf8');

const anchor = '"Prepare a loan application"]]}';
const p = h.indexOf(anchor);
if (p < 0) { console.log('ABORT: anchor not found'); process.exit(1); }
const insertPos = p + anchor.length;
const objEnd = h.indexOf('};', insertPos);
if (objEnd < 0) { console.log('ABORT: object close not found'); process.exit(1); }
if (!/^\s*$/.test(h.substring(insertPos, objEnd))) {
  console.log('ABORT: unexpected content after anchor'); process.exit(1);
}

const course = {
  n: 171,
  t: "171. Farm Building Construction",
  e: "\uD83C\uDFD7\uFE0F",
  cat: "CONSTRUCTION",
  b: "Twelve modules, seventy-two written lessons. Site assessment, materials, foundations, walling, roofing and ventilation, then fourteen specific structures: timber and masonry beehives, a brick mushroom house, ten preservation structures and a ten-carcass chilled room.",
  brand: "#d4af37",
  acc: "#f0d27a",
  L: 72, W: 45000, Q: 360, V: 12,
  m: [
    ["Before You Lay a Brick",["Why Buildings Fail","Reading Your Ground","Orientation","Access and Mistakes","Permission and Who to Ask","Site Assessment"],"farm building site"],
    ["Materials and What They Cost",["Walling Materials Compared","Judging a Brick","Mortar and Mixes","Timber and Termites","Roofing Sheet","Bill of Quantities"],"farm building materials"],
    ["Setting Out and Foundations",["3-4-5 Method","Profile Boards","Excavation Depth","The Footing","Damp-Proof Course","Checking Before Building"],"building foundations"],
    ["Walling",["Bond and Overlap","Plumb Level Line","Mortar Joints","Openings","Lintels","Junctions and Curing"],"brick walling"],
    ["Roofing and Ventilation",["Roof Shape Pitch Overhang","Roof Structure","Tie-Down and Wind","Purlins and Sheet Fixing","Ventilation","Rainwater"],"roofing farm buildings"],
    ["Beehives in Timber",["Bee Space","Langstroth","Kenyan Top Bar","Timber and Food Rule","Components and Stand","Costing"],"beehive timber"],
    ["Beehives in Brick and Mud",["Why Masonry","Thermal Mass","Design","Building","Moisture Pests","Costing"],"beehive brick"],
    ["A Brick Mushroom House",["What It Must Deliver","Two-Room Principle","Growing Chamber","Shelving Layout","Air and Humidity","Pasteurisation Room"],"mushroom house"],
    ["Five Dry Preservation Structures",["Why Drying","Solar Dryer","Smokehouse","Grain Crib","Curing and Rack Sheds","Siting and Costing"],"solar dryer smokehouse"],
    ["Five Cool and Wet Preservation Structures",["Three Ways to Cool","Evaporative Cooler","Root Cellar","Potato Store","Fermentation and Salting","Damp and Hygiene"],"root cellar"],
    ["A 10-Carcass Chilled Room",["Sizing the Room","Insulation and Vapour Barrier","Floor and Drainage","Rails and Layout","Doors and Safety Release","Refrigeration Spec"],"cold room"],
    ["Costing Compliance Build Plan",["Bill of Quantities","Labour and Programme","Phasing","Compliance","Economic Case","Your Build Plan"],"building business plan"]
  ]
};

const entry = ',\n    "farm-building-construction":' + JSON.stringify(course);
h = h.substring(0, insertPos) + entry + h.substring(insertPos);

let b=0,br=0,s=false,sc='',e=false;
for(let i=0;i<h.length;i++){const c=h[i];if(e){e=false;continue}if(s){if(c==='\\'){e=true;continue}if(c===sc)s=false;continue}if(c==='"'||c==="'"){s=true;sc=c;continue}if(c==='{')b++;if(c==='}')b--;if(c==='[')br++;if(c===']')br--;}
if(b!==0||br!==0){console.log('ABORT: brace='+b+' bracket='+br+' - not saving');process.exit(1);}

fs.writeFileSync('all-courses.html',h);
console.log('OK: brace=0 bracket=0 size='+h.length);
