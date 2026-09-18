const fs = require('fs');
let h = fs.readFileSync('course.html', 'utf8');
const before = h.length;

const idx = h.indexOf('// Raw REST query');
if (idx < 0) { console.log('ABORT: anchor missing'); process.exit(1); }

const pre = h.substring(Math.max(0, idx - 30), idx);
console.log('Before: ' + JSON.stringify(pre));

let fixed = h;
const variants = [
  ['}}\n\n  // Raw REST query', '}\n\n  // Raw REST query'],
  ['}}\r\n\r\n  // Raw REST query', '}\r\n\r\n  // Raw REST query'],
  ['}}\n\n// Raw REST query', '}\n\n// Raw REST query'],
  ['}}\n  // Raw REST query', '}\n  // Raw REST query'],
  ['}}\r\n  // Raw REST query', '}\r\n  // Raw REST query']
];

let done = false;
for (const [from, to] of variants) {
  if (fixed.indexOf(from) >= 0) {
    fixed = fixed.split(from).join(to);
    console.log('Matched variant: ' + JSON.stringify(from));
    done = true;
    break;
  }
}

if (!done) {
  console.log('No variant matched — paste the "Before:" line back to me');
  process.exit(1);
}

fs.writeFileSync('course.html', fixed);
console.log('Fixed. ' + before + ' -> ' + fixed.length + ' (should shrink by 1)');
