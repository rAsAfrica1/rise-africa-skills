const fs = require('fs');
let h = fs.readFileSync('course.html', 'utf8');
const before = h.length;

const anchor = '// Raw REST query';
const idx = h.indexOf(anchor);
if (idx < 0) { console.log('ABORT: anchor not found'); process.exit(1); }

console.log('Context before anchor: ' + JSON.stringify(h.substring(Math.max(0, idx - 30), idx)));

let fixed = h;
const patterns = [
  ['}}\n\n  // Raw REST query', '}\n\n  // Raw REST query'],
  ['}}\r\n\r\n  // Raw REST query', '}\r\n\r\n  // Raw REST query'],
  ['}}  \n\n  // Raw REST query', '}  \n\n  // Raw REST query']
];

let matched = false;
for (const [from, to] of patterns) {
  if (fixed.includes(from)) {
    fixed = fixed.replace(from, to);
    console.log('Matched: ' + JSON.stringify(from));
    matched = true;
    break;
  }
}

if (!matched) {
  console.log('No pattern matched — pasting context above for review');
  process.exit(1);
}

fs.writeFileSync('course.html', fixed);
console.log('Fixed. ' + before + ' -> ' + fixed.length);
