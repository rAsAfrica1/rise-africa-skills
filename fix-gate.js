const fs = require('fs');
let ch = fs.readFileSync('course.html', 'utf8');

const start = "Pay $8 to unlock</a><a class=\"btn alt\" href=\"https://wa.me/263773001353?text=";
const pos = ch.indexOf(start);
if (pos < 0) { console.log('anchor not found'); process.exit(1); }

// find the end of the pay-by-ecocash anchor (the closing </a> plus the quote terminator)
const endMark = "Pay by EcoCash</a>'";
const end = ch.indexOf(endMark, pos);
if (end < 0) { console.log('end not found'); process.exit(1); }
const endIdx = end + endMark.length;

const replacement = "Pay $8 to unlock</a>' + " +
  "'<a class=\"btn alt\" href=\"https://wa.me/263776881941?text=' + encodeURIComponent('Hi rAs, I want to pay for ' + slug + ' (Zimbabwe) by EcoCash') + '\">\ud83d\udc9a Pay via WhatsApp (Zimbabwe)</a>' + " +
  "'<a class=\"btn alt\" href=\"https://wa.me/447359724755?text=' + encodeURIComponent('Hi rAs, I want to pay for ' + slug + ' (UK)') + '\">\ud83d\udc9a Pay via WhatsApp (UK)</a>'";

const out = ch.substring(0, pos) + replacement + ch.substring(endIdx);
fs.writeFileSync('course.html', out);
console.log('course.html patched. Size ' + ch.length + ' -> ' + out.length);
