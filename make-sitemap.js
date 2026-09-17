const fs = require('fs');
const base = 'https://www.riseafricaskills.com';
const ac = fs.readFileSync('all-courses.html', 'utf8');
const slugs = [];
const re = /"([a-z0-9-]+)":\{"n":\d+/g;
let m;
while ((m = re.exec(ac)) !== null) slugs.push(m[1]);
console.log('Found ' + slugs.length + ' courses');

const today = new Date().toISOString().split('T')[0];
const statics = [
  ['/', 1.0, 'weekly'],
  ['/all-courses.html', 0.9, 'weekly'],
  ['/my-courses.html', 0.6, 'monthly'],
  ['/enroll.html', 0.5, 'monthly'],
  ['/support-us.html', 0.5, 'monthly'],
  ['/request-course.html', 0.5, 'monthly'],
  ['/newsletter.html', 0.5, 'monthly'],
  ['/advertise.html', 0.5, 'monthly'],
  ['/privacy.html', 0.3, 'yearly'],
  ['/terms.html', 0.3, 'yearly']
];

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
for (const [u, p, f] of statics) {
  xml += '  <url><loc>' + base + u + '</loc><lastmod>' + today + '</lastmod><changefreq>' + f + '</changefreq><priority>' + p.toFixed(1) + '</priority></url>\n';
}
for (const s of slugs) {
  xml += '  <url><loc>' + base + '/course-info.html?c=' + s + '</loc><lastmod>' + today + '</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>\n';
}
xml += '</urlset>\n';
fs.writeFileSync('sitemap.xml', xml);
console.log('sitemap.xml written ' + xml.length + ' bytes');
