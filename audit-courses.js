const fs = require('fs');
const k = fs.readFileSync('key.txt', 'utf8').trim();
const base = 'https://lsvmykrentkbcdrzsaqj.supabase.co';

(async () => {
  let all = [], from = 0, pageSize = 1000;
  while (true) {
    const url = base + '/rest/v1/course_content?select=course_slug,file_path&order=course_slug.asc&limit=' + pageSize + '&offset=' + from + '&apikey=' + encodeURIComponent(k);
    const res = await fetch(url);
    if (!res.ok) { console.log('FAIL ' + res.status + ' ' + (await res.text()).slice(0,200)); return; }
    const rows = await res.json();
    all = all.concat(rows);
    if (rows.length < pageSize) break;
    from += pageSize;
  }
  console.log('Total rows fetched: ' + all.length);

  const by = {};
  for (const r of all) {
    if (!by[r.course_slug]) by[r.course_slug] = { total: 0, modules: 0, hasCourse: false, hasLessons: false };
    by[r.course_slug].total++;
    if (/-module-\d+$/.test(r.file_path)) by[r.course_slug].modules++;
    if (/-course$/.test(r.file_path)) by[r.course_slug].hasCourse = true;
    if (/-lessons$/.test(r.file_path)) by[r.course_slug].hasLessons = true;
  }

  const slugs = Object.keys(by).sort();
  console.log('Distinct courses in DB: ' + slugs.length);
  console.log('');

  const thin = slugs.filter(s => by[s].modules < 10);
  if (thin.length === 0) {
    console.log('All courses have 10+ modules.');
  } else {
    console.log('=== Courses with fewer than 10 modules (' + thin.length + ') ===');
    for (const s of thin) {
      const b = by[s];
      console.log('  ' + s + '  |  modules: ' + b.modules + '  |  course page: ' + (b.hasCourse?'yes':'no') + '  |  lessons: ' + (b.hasLessons?'yes':'no'));
    }
  }

  console.log('');
  console.log('=== Full list (modules per course) ===');
  for (const s of slugs) console.log('  ' + s + ': ' + by[s].modules);
})();
