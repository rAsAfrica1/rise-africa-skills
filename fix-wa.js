const fs = require('fs');
let h = fs.readFileSync('course.html', 'utf8');

const re = /'<a class="btn alt" href="https:\/\/wa\.me\/\d+\?text=[\s\S]+?">Pay by EcoCash<\/a>'/;

if (!re.test(h)) {
  console.log('ABORT: pattern not found');
  const i = h.indexOf('Pay by EcoCash');
  console.log('Pay by EcoCash index: ' + i);
  if (i >= 0) console.log('Context: ' + h.substring(Math.max(0, i - 300), i + 50));
  process.exit(1);
}

const replacement = `'<a class="btn alt" href="https://wa.me/263776881941?text=' + encodeURIComponent('Hi rAs, I want to pay for ' + slug + ' by EcoCash (Zimbabwe)') + '">💚 Pay via WhatsApp (Zimbabwe)</a>' + '<a class="btn alt" href="https://wa.me/447359724755?text=' + encodeURIComponent('Hi rAs, I want to pay for ' + slug + ' (UK)') + '">💚 Pay via WhatsApp (UK)</a>'`;

h = h.replace(re, replacement);
fs.writeFileSync('course.html', h);
console.log('OK: two buttons added, size ' + h.length);
