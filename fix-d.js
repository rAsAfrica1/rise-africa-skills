const fs = require('fs');
const p = './course-info.html';
let html = fs.readFileSync(p, 'utf8');

function walkObject(str, openIdx) {
  // openIdx points at the '{'; returns index AFTER matching '}'
  let depth = 0, inStr = false, i = openIdx;
  for (; i < str.length; i++) {
    const c = str[i];
    if (inStr) {
      if (c === '\\') { i++; continue; }
      if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') { inStr = true; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) { return i + 1; } }
  }
  throw new Error('unmatched brace at ' + openIdx);
}

function removeKey(html, key) {
  const needle = '"' + key + '":';
  let idx = html.indexOf(needle);
  if (idx < 0) { console.log('  skip (not found): ' + key); return html; }
  const braceStart = html.indexOf('{', idx);
  const braceEnd = walkObject(html, braceStart);
  // Consume trailing comma+whitespace, or leading comma+whitespace
  let end = braceEnd;
  while (end < html.length && /\s/.test(html[end])) end++;
  if (html[end] === ',') end++;
  else {
    // no trailing comma - remove preceding comma too
    let s = idx;
    while (s > 0 && /\s/.test(html[s-1])) s--;
    if (html[s-1] === ',') s--;
    idx = s;
  }
  console.log('  removed: ' + key);
  return html.slice(0, idx) + html.slice(end);
}

function addKey(html, key, objText) {
  if (html.indexOf('"' + key + '":') >= 0) { console.log('  skip (exists): ' + key); return html; }
  const varIdx = html.indexOf('var D = ');
  const braceStart = html.indexOf('{', varIdx);
  const braceEnd = walkObject(html, braceStart);
  let insertAt = braceEnd - 1;
  while (insertAt > 0 && /\s/.test(html[insertAt-1])) insertAt--;
  const prefix = (html[insertAt-1] === '{') ? '' : ',';
  const addition = prefix + '\n      "' + key + '":' + objText + '\n    ';
  console.log('  added: ' + key);
  return html.slice(0, insertAt) + addition + html.slice(insertAt);
}

html = removeKey(html, 'bee-farming');
html = removeKey(html, 'food-preservation');
html = removeKey(html, 'street-food');

const newEntry = '{"n":50,"t":"50. Business Plan Development","e":"\\uD83D\\uDCD8","cat":"BUSINESS","b":"","brand":"#c9a227","acc":"#f0d27a","L":72,"W":42000,"Q":360,"V":12,"m":[]}';
html = addKey(html, 'business-plan-development', newEntry);

fs.writeFileSync(p, html, 'utf8');

// Verify
const varIdx = html.indexOf('var D = ');
const bs = html.indexOf('{', varIdx);
const be = walkObject(html, bs);
const body = html.slice(bs, be);
const count = (body.match(/"[a-z0-9][a-z0-9-]+":\s*\{/g) || []).length;
console.log('Top-level entries in D: ' + count);
