const fs = require('fs');
let h = fs.readFileSync('course.html', 'utf8');
const before = h.length;

// The syntax error is caused by a double closing brace before "// Raw REST query"
// Pattern: "  }}\n\n  // Raw REST query"  should be "  }\n\n  // Raw REST query"

const anchor = '// Raw REST query';
const anchorIdx = h.indexOf(anchor);
if (anchorIdx < 0) { console.log('ABORT: anchor not found'); process.exit(1); }

// Look at the 40 chars before the anchor
const contextBefore = h.substring(Math.max(0, anchorIdx - 40), anchorIdx);
console.log('Before anchor: ' + JSON.stringify(contextBefore));

// Try to remove the extra }
const patterns = [
  ['  }}\n\n  ', '  }\n\n  '],
  ['  }}\r\n\r\n  ', '  }\r\n\r\n  '],
  ['  }}\n  ', '  }\n  '],
  ['  }}\r\n  ', '  }\r\n  ']
];

let fixed = h;
let matched = false;
for (const [from, to] of patterns) {
  if (fixed.includes(from) && fixed.indexOf(from) < anchorIdx && fixed.lastIndexOf(from) >= anchorIdx - 40) {
    fixed = fixed.replace(from, to);
    matched = true;
    console.log('Matched pattern: ' + JSON.stringify(from));
    break;
  }
}

if (!matched) {
  console.log('No pattern matched. Manual inspection needed.');
  process.exit(1);
}

fs.writeFileSync('course.html', fixed);
console.log('Fixed. ' + before + ' -> ' + fixed.length);
