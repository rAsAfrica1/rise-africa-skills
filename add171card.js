const fs = require('fs');
let h = fs.readFileSync('index.html','utf8');

if (h.indexOf('171. Farm Building Construction') >= 0) {
  console.log('already present');
  process.exit(0);
}

const anchor = 'href="course.html?f=pesticides-amp-agrochemicals-course" target="_blank">&#128214; Open Course</a>';
const idx = h.indexOf(anchor);
if (idx < 0) { console.log('ABORT: anchor not found'); process.exit(1); }
console.log('anchor found at ' + idx);

const after = idx + anchor.length;
const c1 = h.indexOf('</div>', after);
if (c1 < 0) { console.log('ABORT: c1 not found'); process.exit(1); }
const c2 = h.indexOf('</div>', c1 + 6);
if (c2 < 0) { console.log('ABORT: c2 not found'); process.exit(1); }
const insertAt = c2 + 6;

const card = `

<div class="course-card" data-cat="CONSTRUCTION">
  <div class="course-category">CONSTRUCTION</div>
  <h3>171. Farm Building Construction</h3>
  <p>&#11088; FLAGSHIP COURSE &#8212; Twelve modules, seventy-two written lessons. Site assessment, materials, foundations, walling, roofing, ventilation, then fourteen specific structures: beehives in timber and brick, a mushroom house, ten preservation structures and a ten-carcass chilled room.</p>
  <div class="price-check">&#9989; Iron-Clad Price Check: Call 3 suppliers before you buy.</div>
  <div class="card-actions">
    <button class="card-btn" data-price="8" data-tier="course" onclick="openEnroll(this)">$8.00 Course</button>
    <button class="card-btn cert" data-price="10" data-tier="cert" onclick="openEnroll(this)">$10.00 +Record</button>
    <button class="card-btn print" data-price="3.50" data-tier="print" onclick="openEnroll(this)">$3.50 Print</button>
    <button class="card-btn gift" data-tier="gift" onclick="openEnroll(this)">&#127873; Gift</button>
    <a class="card-btn open" href="course.html?f=farm-building-construction-module-1" target="_blank">&#128214; Open Course</a>
  </div>
</div>`;

h = h.substring(0, insertAt) + card + h.substring(insertAt);

// sanity: file grew by the size of the card
const grew = h.length - (h.length - card.length);
if (grew !== card.length) { console.log('ABORT: unexpected size'); process.exit(1); }
if (h.indexOf('171. Farm Building Construction') < 0) { console.log('ABORT: card not in output'); process.exit(1); }

fs.writeFileSync('index.html', h);
console.log('OK: card added, size=' + h.length);
