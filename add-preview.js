const fs = require('fs');
let h = fs.readFileSync('course.html', 'utf8');

if (h.indexOf('rAs-preview') >= 0) {
  console.log('already patched');
  process.exit(0);
}

// Find the locked function
const oldStart = "  function locked(notLoggedIn){";
const oldEnd = "  }\n\n  // Raw REST query";
const startIdx = h.indexOf(oldStart);
const endIdx = h.indexOf(oldEnd, startIdx);
if (startIdx < 0 || endIdx < 0) {
  console.log('ABORT: locked() function not found');
  process.exit(1);
}

const NEW = `  function locked(notLoggedIn){
    var courseInfoUrl = 'course-info.html?c=' + encodeURIComponent(slug);
    var syllabus = '<a class="btn alt" href="' + courseInfoUrl + '">📚 See Full Syllabus</a>';
    var actions = notLoggedIn
      ? '<a class="btn" href="my-courses.html">Log in or create account</a>' + syllabus
      : '<a class="btn" href="enroll.html?course=' + encodeURIComponent(slug) + '&tier=course">Pay $8 to unlock</a>' +
        '<a class="btn alt" href="https://wa.me/263776881941?text=' + encodeURIComponent('Hi rAs, I want to pay for ' + slug + ' (Zimbabwe) by EcoCash') + '">💚 Pay via WhatsApp (Zimbabwe)</a>' +
        '<a class="btn alt" href="https://wa.me/447359724755?text=' + encodeURIComponent('Hi rAs, I want to pay for ' + slug + ' (UK)') + '">💚 Pay via WhatsApp (UK)</a>' +
        syllabus;
    msg.innerHTML = '<div class="icon">🔒</div><h1>' + pretty + ' is locked</h1>' +
      '<p>Pay once, $8, to unlock all modules and lifetime access.</p>' +
      '<div id="rAs-preview" style="margin:1.5rem 0;padding:1rem 1.25rem;border:1px solid #333;border-radius:10px;text-align:left;background:rgba(255,255,255,0.02)">' +
        '<div style="color:#d4a017;font-weight:700;margin-bottom:0.6rem;font-size:0.9rem;letter-spacing:0.05em;text-transform:uppercase">What this course covers</div>' +
        '<div id="rAs-preview-list" style="color:#bbb;font-size:0.9rem;line-height:1.7">Loading module list…</div>' +
      '</div>' +
      actions;
    msg.style.display = 'block';
    frame.classList.remove('on');

    // Fetch module list (file_path only — no lesson content) from Supabase
    fetch(SUPA + '/rest/v1/course_content?course_slug=eq.' + encodeURIComponent(slug) + '&select=file_path&order=file_path.asc&apikey=' + encodeURIComponent(KEY))
      .then(function(r){ return r.json(); })
      .then(function(rows){
        var el = document.getElementById('rAs-preview-list');
        if (!el) return;
        if (!rows || !rows.length) { el.innerHTML = 'Module list will appear here.'; return; }
        var titles = rows.map(function(r){
          var p = r.file_path || '';
          var m = p.match(/-module-(\\d+)$/);
          if (m) return 'Module ' + m[1];
          if (/-course$/.test(p)) return 'Course overview';
          if (/-lessons$/.test(p)) return 'All lessons';
          return p;
        });
        var list = titles.map(function(t){ return '<span style="display:inline-block;margin:0.15rem 0.4rem 0.15rem 0;padding:0.25rem 0.6rem;border:1px solid #333;border-radius:6px;font-size:0.8rem;color:#ccc">' + t + '</span>'; }).join('');
        el.innerHTML = '<div style="margin-bottom:0.4rem"><strong style="color:#d4a017">' + rows.length + '</strong> modules in this course</div><div>' + list + '</div>';
      })
      .catch(function(){});
  }`;

h = h.substring(0, startIdx) + NEW + h.substring(endIdx + 2);
fs.writeFileSync('course.html', h);
console.log('patched. size ' + h.length);
