const fs = require('fs');
let c = fs.readFileSync('course-info.html', 'utf8');
const lines = c.split('\n');
const out = [];
const seen = new Set();
let removed = 0;

function key(line) {
  const phone = (line.match(/wa\.me\/(\d+)/) || [])[1] || '';
  const intent = line.includes('have%20paid') ? 'paid'
               : line.includes('want%20to%20enroll') ? 'enroll'
               : 'other';
  return phone + '|' + intent;
}

for (const l of lines) {
  if (l.includes('wa.me/')) {
    const k = key(l);
    if (seen.has(k)) { removed++; continue; }
    seen.add(k);
  }
  out.push(l);
}

fs.writeFileSync('course-info.html', out.join('\n'));
console.log('Removed ' + removed + ' duplicate wa.me lines. Size ' + c.length + ' -> ' + out.length);
