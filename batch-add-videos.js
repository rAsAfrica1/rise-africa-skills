const fs = require('fs');
const path = require('path');
const videoMapping = JSON.parse(fs.readFileSync('video-mapping.json', 'utf8'));
const courseFiles = fs.readdirSync('.').filter(f => f.endsWith('-course.html') && f !== 'flagship-course-template.html').sort();
console.log(`Found ${courseFiles.length} courses\n`);
let updated = 0, skipped = 0;
courseFiles.forEach((file, idx) => {
  const name = file.replace('-course.html','').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  try {
    let content = fs.readFileSync(file, 'utf8');
    const videos = videoMapping[name];
    if (!videos) { skipped++; return; }
    videos.forEach((v, i) => {
      const embed = `<div style="margin:1.5rem 0;background:rgba(201,162,39,0.08);border-left:3px solid #c9a227;padding:1rem;"><h4 style="color:#c9a227;">?? ${v.title}</h4><iframe style="width:100%;height:400px;border-radius:6px;" src="https://www.youtube.com/embed/${v.videoId}?modestbranding=1&rel=0" frameborder="0" allowfullscreen=""></iframe></div>`;
      const regex = new RegExp(`(<h3>MODULE ${i+1}:[^<]*</h3>)`, 'i');
      if (regex.test(content)) { content = content.replace(regex, `$1${embed}`); }
    });
    fs.writeFileSync(file, content);
    updated++;
    process.stdout.write('.');
  } catch(e) { process.stdout.write('E'); }
  if ((idx+1) % 50 === 0) console.log(` ${idx+1}/${courseFiles.length}`);
});
console.log(`\n? DONE: ${updated} updated, ${skipped} skipped\n`);
