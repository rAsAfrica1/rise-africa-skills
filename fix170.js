const fs = require('fs');
let ix = fs.readFileSync('index.html','utf8');
const before = ix.length;
let count = 0;

function rep(re, to) {
  const m = ix.match(re);
  if (m) { ix = ix.replace(re, to); count++; }
  else { console.log('  no match: ' + re); }
}

rep(/>170<\/div><div class="stat-label">Practical Courses/,
    '>171</div><div class="stat-label">Practical Courses');
rep(/Looking for all 170 courses\?/,
    'Looking for all 171 courses?');
rep(/View All 170 Courses/g,
    'View All 171 Courses');
rep(/placeholder="Search 170 courses\.\.\."/,
    'placeholder="Search 171 courses..."');
rep(/>170 complete courses/,
    '>171 complete courses');
rep(/Showing all 170 courses/g,
    'Showing all 171 courses');

if (count === 0) { console.log('ABORT: no replacements applied'); process.exit(1); }
fs.writeFileSync('index.html', ix);
console.log('Applied ' + count + ' replacements. Size ' + before + ' -> ' + ix.length);
