const fs = require('fs');

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
const json = JSON.stringify(course);

function braceCheck(s){
  let b=0,br=0,ins=false,sc='',e=false;
  for(let i=0;i<s.length;i++){const c=s[i];
    if(e){e=false;continue}
    if(ins){if(c==='\\'){e=true;continue}if(c===sc)ins=false;continue}
    if(c==='"'||c==="'"){ins=true;sc=c;continue}
    if(c==='{')b++;if(c==='}')b--;if(c==='[')br++;if(c===']')br--;
  }
  return [b,br];
}

// --- 1. course-info.html ---
let ci = fs.readFileSync('course-info.html','utf8');
if (ci.indexOf('"farm-building-construction"') >= 0) {
  console.log('course-info.html: already has 171');
} else {
  // Find the courses object: look for `var X = {` where the next content includes `"n":1,`
  const m = ci.match(/var\s+(\w+)\s*=\s*\{/);
  if (!m) { console.log('ABORT: no var X = { found in course-info.html'); process.exit(1); }
  const varname = m[1];
  console.log('course-info.html: found object var ' + varname);
  // Find the matching close of that object
  let start = m.index + m[0].length - 1; // position of the {
  let depth=0, inStr=false, strCh='', esc=false, end=-1;
  for (let i=start;i<ci.length;i++){const c=ci[i];
    if(esc){esc=false;continue}
    if(inStr){if(c==='\\'){esc=true;continue}if(c===strCh)inStr=false;continue}
    if(c==='"'||c==="'"){inStr=true;strCh=c;continue}
    if(c==='{')depth++;
    else if(c==='}'){depth--;if(depth===0){end=i;break}}
  }
  if(end<0){console.log('ABORT: could not find close of object');process.exit(1);}
  let pos = end-1;
  while(pos>=start && /\s/.test(ci[pos])) pos--;
  // Require a comma here so we know we're inside the object still
  ci = ci.substring(0,pos+1) + ',\n    "farm-building-construction":' + json + ci.substring(pos+1);
  const [b,br] = braceCheck(ci);
  if(b!==0||br!==0){console.log('ABORT course-info: brace='+b+' bracket='+br);process.exit(1);}
  fs.writeFileSync('course-info.html', ci);
  console.log('course-info.html: 171 added, brace=0 bracket=0, size=' + ci.length);
}

// --- 2. index.html: 170 -> 171 in visible text ---
let ix = fs.readFileSync('index.html','utf8');
const before = ix.length;
ix = ix
  .replace(/>170<\/div><div class="stat-label">Practical Courses/, '>171</div><div class="stat-label">Practical Courses')
  .replace(/Looking for all 170 courses\?/, 'Looking for all 171 courses?')
  .replace(/View All 170 Courses/g, 'View All 171 Courses')
  .replace(/placeholder="Search 170 courses\.\.\."/, 'placeholder="Search 171 courses..."')
  .replace(/>170 complete courses/, '>171 complete courses')
  .replace(/Showing all 170 courses/g, 'Showing all 171 courses');
if (ix.length === before) { console.log('index.html: no visible-text 170s changed (patterns may differ)'); }
else { fs.writeFileSync('index.html', ix); console.log('index.html: 170 -> 171 applied (' + (before-ix.length) + ' bytes diff)'); }

// --- 3. index.html: verify grid sort exists and report ---
const sortMatch = ix.match(/var sorted = keys\.map\([^;]+\.sort\(function[^;]+;/);
if (sortMatch) {
  console.log('index.html grid sort: found -> ' + sortMatch[0].substring(0,120));
} else {
  console.log('index.html grid sort: pattern not found in expected form');
}
