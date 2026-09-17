const fs = require('fs');

// === 1. course.html — gate: two WhatsApp buttons ===
let ch = fs.readFileSync('course.html', 'utf8');
const re = /'<a class="btn alt" href="https:\/\/wa\.me\/\d+\?text=[\s\S]+?">Pay by EcoCash<\/a>'/;
if (re.test(ch)) {
  const rep = `'<a class="btn alt" href="https://wa.me/263776881941?text=' + encodeURIComponent('Hi rAs, I want to pay for ' + slug + ' by EcoCash (Zimbabwe)') + '">💚 Pay via WhatsApp (Zimbabwe)</a>' + '<a class="btn alt" href="https://wa.me/447359724755?text=' + encodeURIComponent('Hi rAs, I want to pay for ' + slug + ' (UK)') + '">💚 Pay via WhatsApp (UK)</a>'`;
  ch = ch.replace(re, rep);
  fs.writeFileSync('course.html', ch);
  console.log('course.html: gate now has two payment buttons');
} else {
  console.log('course.html: pattern not found');
  const i = ch.indexOf('Pay by EcoCash');
  if (i >= 0) console.log('  context: ' + ch.substring(Math.max(0, i - 200), i + 20));
}

// === 2 & 3. course-info.html and all-courses.html — duplicate payment lines ===
for (const file of ['course-info.html', 'all-courses.html']) {
  let c = fs.readFileSync(file, 'utf8');
  const lines = c.split('\n');
  const out = [];
  let count = 0;
  for (const line of lines) {
    out.push(line);
    if (line.indexOf('263776881941') >= 0) {
      let uk = line.split('263776881941').join('447359724755');
      uk = uk.replace('Send Proof on WhatsApp', 'Send Proof (UK)');
      uk = uk.replace('>💬 WhatsApp</a>', '>💬 WhatsApp (UK)</a>');
      out.push(uk);
      const orig = out.length - 2;
      out[orig] = out[orig].replace('Send Proof on WhatsApp', 'Send Proof (Zimbabwe)');
      out[orig] = out[orig].replace('>💬 WhatsApp</a>', '>💬 WhatsApp (Zimbabwe)</a>');
      count++;
    }
  }
  if (count > 0) {
    fs.writeFileSync(file, out.join('\n'));
    console.log(file + ': duplicated ' + count + ' payment lines');
  } else {
    console.log(file + ': no payment lines found');
  }
}
