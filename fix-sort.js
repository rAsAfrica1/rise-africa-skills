const fs = require('fs');
let h = fs.readFileSync('course.html', 'utf8');

if (h.indexOf('rAs-sort-fix') >= 0) {
  console.log('already patched');
  process.exit(0);
}

const anchor = "var titles = rows.map(function(r){";
if (h.indexOf(anchor) < 0) {
  console.log('ABORT: anchor not found');
  process.exit(1);
}

const insert = `/* rAs-sort-fix: sort modules numerically */
        rows.sort(function(a,b){
          var na = parseInt((a.file_path.match(/-module-(\\d+)$/)||[0,0])[1],10) || 0;
          var nb = parseInt((b.file_path.match(/-module-(\\d+)$/)||[0,0])[1],10) || 0;
          if (na !== nb) return na - nb;
          return (a.file_path||'').localeCompare(b.file_path||'');
        });
        `;

h = h.replace(anchor, insert + anchor);
fs.writeFileSync('course.html', h);
console.log('patched. size ' + h.length);
