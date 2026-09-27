const fs = require('fs');
const html = fs.readFileSync('./course-info.html', 'utf8');
const varIdx = html.indexOf('var D = ');
const braceStart = html.indexOf('{', varIdx);
let depth = 0, inStr = false, i = braceStart, commaCount = 0;
for (; i < html.length; i++) {
  const c = html[i];
  if (inStr) {
    if (c === '\\') { i++; continue; }
    if (c === '"') inStr = false;
    continue;
  }
  if (c === '"') { inStr = true; continue; }
  if (c === '{') depth++;
  else if (c === '}') { depth--; if (depth === 0) { i++; break; } }
}
const body = html.slice(braceStart, i);
const D = Function('return ' + body + ';')();
console.log('Keys in D: ' + Object.keys(D).length);
console.log('bee-farming present: ' + ('bee-farming' in D));
console.log('food-preservation present: ' + ('food-preservation' in D));
console.log('street-food present: ' + ('street-food' in D));
console.log('business-plan-development present: ' + ('business-plan-development' in D));
