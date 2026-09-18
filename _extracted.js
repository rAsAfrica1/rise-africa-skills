
(function(){
  var SUPA = 'https://lsvmykrentkbcdrzsaqj.supabase.co';
  var KEY  = 'sb_publishable_zAO9Nei4xwd_aCdqF0tNlg_Be2SYl5K';
  var FREE = ['arabic-language','chinese-language','russian-language','shona-language','swahili-language'];

  var sb = null;
  try { sb = supabase.createClient(SUPA, KEY); } catch(e){}
  var msg = document.getElementById('msg');
  var frame = document.getElementById('frame');

  var params = new URLSearchParams(window.location.search);
  var filePath = (params.get('f') || '').replace(/\.html$/,'');
  if(!filePath){
    msg.innerHTML = '<div class="icon">❓</div><h1>No course specified</h1><p>Open a course from the homepage.</p><a class="btn" href="/">Back to all courses</a>';
    return;
  }

  var slug = filePath.replace(/-lessons$/,'').replace(/-module-\d+$/,'').replace(/-course$/,'');
  var pretty = slug.replace(/-/g,' ').replace(/\b\w/g, function(c){ return c.toUpperCase(); });
  var isFree = FREE.indexOf(slug) >= 0;

  function showContent(html){
    html = String(html).replace(/<script[^>]*course-lock\.js[^>]*><\/script>/gi, '');
    msg.style.display = 'none';
    frame.srcdoc = html;
    frame.classList.add('on');
  }

  function notFound(){
    msg.innerHTML = '<div class="icon">📄</div><h1>Course not found</h1><p>' + pretty + ' has not been uploaded yet.</p><a class="btn" href="/">Back to all courses</a>';
    msg.style.display = 'block';
    frame.classList.remove('on');
  }

  function locked(notLoggedIn){
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
          var m = p.match(/-module-(\d+)$/);
          if (m) return 'Module ' + m[1];
          if (/-course$/.test(p)) return 'Course overview';
          if (/-lessons$/.test(p)) return 'All lessons';
          return p;
        });
        var list = titles.map(function(t){ return '<span style="display:inline-block;margin:0.15rem 0.4rem 0.15rem 0;padding:0.25rem 0.6rem;border:1px solid #333;border-radius:6px;font-size:0.8rem;color:#ccc">' + t + '</span>'; }).join('');
        el.innerHTML = '<div style="margin-bottom:0.4rem"><strong style="color:#d4a017">' + rows.length + '</strong> modules in this course</div><div>' + list + '</div>';
      })
      .catch(function(){});
  }

  // Raw REST query — same call your browser just proved works.
  function fetchContent(){
    var url = SUPA + '/rest/v1/course_content?select=html&file_path=eq.'
            + encodeURIComponent(filePath)
            + '&apikey=' + encodeURIComponent(KEY);
    return fetch(url)
      .then(function(r){ return r.json(); })
      .then(function(rows){
        if(!rows || !rows.length || !rows[0] || !rows[0].html) return null;
        return rows[0].html;
      });
  }

  frame.addEventListener('load', function(){
    try {
      var fdoc = frame.contentDocument || frame.contentWindow.document;
      if(!fdoc) return;
      fdoc.addEventListener('click', function(e){
        var a = e.target.closest('a');
        if(!a) return;
        var href = a.getAttribute('href');
        if(!href) return;
        if(!/\.html?(\?|#|$)/i.test(href)) return;
        e.preventDefault();
        var target = href.split(/[?#]/)[0].replace(/\.html?$/i,'').replace(/^.*\//,'');
        if(/(^|-)module-\d+$|-lessons$|-course$/.test(target)){
          window.location.href = 'course.html?f=' + encodeURIComponent(target);
        }
      }, true);
    } catch(e){}
  });

  if(isFree){
    fetchContent().then(function(html){
      if(!html){ notFound(); return; }
      showContent(html);
    }).catch(function(){ notFound(); });
    return;
  }

  if(!sb){ locked(true); return; }
  sb.auth.getSession().then(function(res){
    var session = res && res.data && res.data.session;
    if(!session || !session.user){ locked(true); return; }
    fetchContent().then(function(html){
      if(!html){ locked(false); return; }
      showContent(html);
    }).catch(function(){ locked(false); });
  }).catch(function(){ locked(true); });
})();
