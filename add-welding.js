const fs = require('fs');

const course = {
  n: 172,
  t: "172. Welding Fundamentals",
  e: "\uD83D\uDD25",
  cat: "VOCATIONAL",
  b: "Twelve modules, seventy-two written lessons. Safety, the physics of welding, the four processes, equipment, consumables, metal identification, running a bead, joint types, out-of-position work, distortion, defects, and cutting, grinding and finishing. Written for farm and workshop welding in Africa.",
  brand: "#d4af37",
  acc: "#f0d27a",
  L: 72, W: 42000, Q: 360, V: 12,
  m: [
    ["Safety Before Anything Else",["Why This Module Comes First","The Arc, Your Eyes and Your Skin","Fume: The Hazard You Cannot See Working","Fire, Explosion and Hot Work","Electric Shock","PPE, Workshop Set-Up and Emergency Planning"],"welding safety"],
    ["How Welding Works",["Fusion: What a Weld Actually Is","The Weld Pool","Heat Input: The Three Things You Control","The Heat Affected Zone","Shielding: Why Molten Metal Must Be Protected","Cooling: Shrinkage, Distortion and Cracking"],"welding physics"],
    ["The Processes",["The Four Processes at a Glance","Stick Welding (SMAW)","MIG / MAG (GMAW)","TIG (GTAW)","Oxy-Fuel Gas Welding","Choosing a Process"],"stick MIG TIG welding"],
    ["Equipment",["The Welding Machine","Leads, Holders and Earth Clamps","Buying a Stick Welder","Buying a MIG Set","Personal Protective Equipment","Setting Up a Workshop"],"welding equipment"],
    ["Consumables",["What an Electrode Actually Is","Coating Types","Moisture: The Hidden Cause of Most Weld Failures","MIG Wire","Shielding Gases","Buying and Storing Consumables"],"welding electrodes"],
    ["Metal Identification and Preparation",["Why Identify the Metal","Mild Steel: The Default","The Steels That Bite","Coatings and Platings","Preparation: Cleaning, Bevels, Fit-Up","The Preparation Checklist"],"welding metal prep"],
    ["Striking and Running a Bead",["Striking the Arc","Arc Length","Travel Angle and Work Angle","Travel Speed","Reading the Bead","Practice That Actually Improves You"],"welding technique"],
    ["The Joint Types",["The Five Joints","Butt Joints","Lap and Tee Joints","Corner and Edge Joints","Fit-Up, Gap and Root Face","Choosing the Joint"],"welding joints"],
    ["Out of Position",["Why Position Matters","Flat Position","Horizontal Position","Vertical Position","Overhead Position","Choosing Position and Technique"],"welding positions"],
    ["Distortion and How to Control It",["Why Metal Distorts","The Three Forms of Distortion","Five Techniques to Control Distortion","Planning for Distortion","Straightening Distorted Work","Distortion and the Practical Weld"],"welding distortion"],
    ["Defects",["Why Defects Happen","Porosity","Slag Inclusion","Lack of Fusion and Lack of Penetration","Undercut, Overlap, Underfill","Cracking, Repair and Testing"],"welding defects"],
    ["Cutting, Grinding and Finishing",["Cutting Methods","Grinding: Wheels, Discs and Safety","Preparing an Edge by Grinding","Finishing the Weld","Estimating a Job","Course Review"],"welding finishing"]
  ]
};

const json = JSON.stringify(course);

// 1. all-courses.html
let ac = fs.readFileSync('all-courses.html','utf8');
if (ac.indexOf('"welding-fundamentals"') < 0) {
  const anchor = '"Prepare a loan application"]]}';
  const p = ac.indexOf(anchor);
  if (p < 0) { console.log('all-courses: anchor not found'); }
  else {
    const at = p + anchor.length;
    const objEnd = ac.indexOf('};', at);
    if (objEnd < 0) { console.log('all-courses: close not found'); }
    else if (!/^\s*$/.test(ac.substring(at, objEnd))) { console.log('all-courses: unexpected content'); }
    else {
      ac = ac.substring(0, at) + ',\n    "welding-fundamentals":' + json + ac.substring(at);
      fs.writeFileSync('all-courses.html', ac);
      console.log('all-courses: added (size ' + ac.length + ')');
    }
  }
} else console.log('all-courses: already present');

// 2. course-info.html
let ci = fs.readFileSync('course-info.html','utf8');
if (ci.indexOf('"welding-fundamentals"') < 0) {
  const m = ci.match(/var\s+(\w+)\s*=\s*\{/);
  if (!m) { console.log('course-info: no object'); }
  else {
    const start = m.index + m[0].length - 1;
    let depth=0,inStr=false,strCh='',esc=false,end=-1;
    for (let i=start;i<ci.length;i++){const c=ci[i];
      if(esc){esc=false;continue}
      if(inStr){if(c==='\\'){esc=true;continue}if(c===strCh)inStr=false;continue}
      if(c==='"'||c==="'"){inStr=true;strCh=c;continue}
      if(c==='{')depth++;
      else if(c==='}'){depth--;if(depth===0){end=i;break}}
    }
    if(end<0){console.log('course-info: no close');}
    else{
      let pos=end-1;
      while(pos>=start&&/\s/.test(ci[pos]))pos--;
      ci = ci.substring(0,pos+1) + ',\n    "welding-fundamentals":' + json + ci.substring(pos+1);
      fs.writeFileSync('course-info.html', ci);
      console.log('course-info: added (size ' + ci.length + ')');
    }
  }
} else console.log('course-info: already present');

// 3. index.html card
let ix = fs.readFileSync('index.html','utf8');
if (ix.indexOf('172. Welding Fundamentals') >= 0) {
  console.log('index: card already present');
} else {
  const anchor = 'href="course.html?f=farm-building-construction-module-1" target="_blank">&#128214; Open Course</a>';
  const idx = ix.indexOf(anchor);
  if (idx < 0) { console.log('index: anchor not found'); }
  else {
    const after = idx + anchor.length;
    const c1 = ix.indexOf('</div>', after);
    const c2 = ix.indexOf('</div>', c1 + 6);
    if (c2 < 0) { console.log('index: close not found'); }
    else {
      const insertAt = c2 + 6;
      const card = '\n\n<div class="course-card" data-cat="VOCATIONAL">\n  <div class="course-category">VOCATIONAL</div>\n  <h3>172. Welding Fundamentals</h3>\n  <p>&#11088; FLAGSHIP COURSE &#8212; Twelve modules, seventy-two written lessons. Safety, physics, the four processes, equipment, consumables, metal identification, running a bead, joint types, out-of-position work, distortion, defects, and finishing.</p>\n  <div class="price-check">&#9989; Iron-Clad Price Check: Call 3 suppliers before you buy.</div>\n  <div class="card-actions">\n    <button class="card-btn" data-price="8" data-tier="course" onclick="openEnroll(this)">$8.00 Course</button>\n    <button class="card-btn cert" data-price="10" data-tier="cert" onclick="openEnroll(this)">$10.00 +Record</button>\n    <button class="card-btn print" data-price="3.50" data-tier="print" onclick="openEnroll(this)">$3.50 Print</button>\n    <button class="card-btn gift" data-tier="gift" onclick="openEnroll(this)">&#127873; Gift</button>\n    <a class="card-btn open" href="course.html?f=welding-fundamentals-module-1" target="_blank">&#128214; Open Course</a>\n  </div>\n</div>';
      ix = ix.substring(0, insertAt) + card + ix.substring(insertAt);
      ix = ix.replace(/>171</div><div class="stat-label">Practical Courses/,'>172</div><div class="stat-label">Practical Courses');
      ix = ix.replace(/Looking for all 171 courses\?/,'Looking for all 172 courses?');
      ix = ix.replace(/View All 171 Courses/g,'View All 172 Courses');
      ix = ix.replace(/placeholder="Search 171 courses\.\.\."/,'placeholder="Search 172 courses..."');
      ix = ix.replace(/>171 complete courses/,'>172 complete courses');
      ix = ix.replace(/Showing all 171 courses/g,'Showing all 172 courses');
      fs.writeFileSync('index.html', ix);
      console.log('index: card + counter updated (size ' + ix.length + ')');
    }
  }
}
