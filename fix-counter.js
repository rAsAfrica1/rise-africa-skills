const fs = require('fs');
let h = fs.readFileSync('index.html', 'utf8');
const before = h.length;
let n = 0;

function rep(from, to) {
  if (h.indexOf(from) >= 0) {
    h = h.split(from).join(to);
    n++;
    console.log('  replaced: ' + from.substring(0, 50));
  }
}

rep('>173</div><div class="stat-label">Practical Courses', '>172</div><div class="stat-label">Practical Courses');
rep('Looking for all 173 courses?', 'Looking for all 172 courses?');
rep('View All 173 Courses', 'View All 172 Courses');
rep('placeholder="Search 173 courses..."', 'placeholder="Search 172 courses..."');
rep('>173 complete courses', '>172 complete courses');
rep('Showing all 173 courses', 'Showing all 172 courses');

fs.writeFileSync('index.html', h);
console.log('Fixed ' + n + ' counter occurrences. Size ' + before + ' -> ' + h.length);
