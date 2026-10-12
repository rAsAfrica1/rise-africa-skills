p = 'enroll.html'
html = open(p, encoding='utf-8').read()

if 'rAsCourseSearch' in html:
    print('Picker already present. Nothing to do.')
else:
    css = """<style>
.rAs-course-picker{position:relative;margin:1rem 0;}
.rAs-course-picker input{width:100%;padding:12px 16px;font-size:1rem;border:2px solid #444;border-radius:8px;background:#0f0f1a;color:#e0e0e0;box-sizing:border-box;}
.rAs-course-picker input:focus{outline:none;border-color:#C9A227;}
.rAs-suggestions{display:none;position:absolute;top:100%;left:0;right:0;max-height:320px;overflow-y:auto;background:#1e1e1e;border:1px solid #C9A227;border-radius:8px;z-index:100;margin-top:4px;box-shadow:0 8px 24px rgba(0,0,0,.5);}
.rAs-suggestion{padding:10px 16px;cursor:pointer;color:#e0e0e0;font-size:.95rem;border-bottom:1px solid #2a2a2a;}
.rAs-suggestion:hover,.rAs-suggestion.active{background:#C9A227;color:#111;}
.rAs-suggestion:last-child{border-bottom:none;}
.rAs-no-match{padding:12px 16px;color:#888;font-style:italic;}
</style>"""

    js = """<script>
(function(){
  var COURSE_LIST = [];
  function loadCourses(){
    fetch('/index.html').then(function(r){return r.text();}).then(function(h){
      var doc = new DOMParser().parseFromString(h,'text/html');
      var seen = {};
      doc.querySelectorAll('.course-card h3').forEach(function(el){
        var t = el.textContent.replace(/^\\s*\\d+\\.\\s*/,'').trim();
        if (t && !seen[t]) { seen[t] = 1; COURSE_LIST.push(t); }
      });
      COURSE_LIST.sort();
      buildPicker();
    }).catch(function(){ buildPicker(); });
  }
  function buildPicker(){
    var targets = [];
    document.querySelectorAll('h1,h2,.course-name,#courseName,#selectedCourse,[data-course-name],.checkout-course-name').forEach(function(el){
      if (el.textContent.trim() === 'Select a course below' || el.textContent.trim() === 'Unknown Course' || el.id === 'courseName') {
        targets.push(el);
      }
    });
    if (!targets.length) return;
    var target = targets[0];
    var wrap = document.createElement('div');
    wrap.className = 'rAs-course-picker';
    wrap.innerHTML = '<input type="text" id="rAsCourseSearch" placeholder="Type to search ' + COURSE_LIST.length + ' courses..." autocomplete="off"/><div class="rAs-suggestions" id="rAsSuggestions"></div>';
    target.textContent = '';
    target.appendChild(wrap);
    var input = document.getElementById('rAsCourseSearch');
    var sugg = document.getElementById('rAsSuggestions');
    var activeIdx = -1;
    function render(q){
      sugg.innerHTML = ''; activeIdx = -1;
      if (!q) { sugg.style.display = 'none'; return; }
      var ql = q.toLowerCase();
      var matches = [];
      for (var i = 0; i < COURSE_LIST.length; i++){
        if (COURSE_LIST[i].toLowerCase().indexOf(ql) !== -1) {
          matches.push(COURSE_LIST[i]);
          if (matches.length >= 30) break;
        }
      }
      if (!matches.length) {
        sugg.innerHTML = '<div class="rAs-no-match">No course matches "' + q + '"</div>';
        sugg.style.display = 'block';
        return;
      }
      matches.forEach(function(m){
        var div = document.createElement('div');
        div.className = 'rAs-suggestion';
        div.textContent = m;
        div.addEventListener('click', function(){ choose(m); });
        sugg.appendChild(div);
      });
      sugg.style.display = 'block';
    }
    input.addEventListener('input', function(){ render(this.value.trim()); });
    input.addEventListener('focus', function(){ if (this.value.trim()) render(this.value.trim()); });
    input.addEventListener('keydown', function(e){
      var items = sugg.querySelectorAll('.rAs-suggestion');
      if (e.key === 'ArrowDown'){ e.preventDefault(); activeIdx = Math.min(activeIdx + 1, items.length - 1); hl(items); }
      else if (e.key === 'ArrowUp'){ e.preventDefault(); activeIdx = Math.max(activeIdx - 1, 0); hl(items); }
      else if (e.key === 'Enter' && activeIdx >= 0 && items[activeIdx]){ e.preventDefault(); choose(items[activeIdx].textContent); }
      else if (e.key === 'Escape'){ sugg.style.display = 'none'; }
    });
    function hl(items){ items.forEach(function(el,i){ el.classList.toggle('active', i === activeIdx); }); if (items[activeIdx]) items[activeIdx].scrollIntoView({block:'nearest'}); }
    function choose(title){
      input.value = title;
      sugg.style.display = 'none';
      if (window.rAsEnroll) window.rAsEnroll.course = title;
      var sel = document.getElementById('regCourse');
      if (sel){ for (var i = 0; i < sel.options.length; i++){ var v = sel.options[i].value.trim(); var t = sel.options[i].textContent.trim(); if (v === title || t === title || t.indexOf(title) !== -1 || title.indexOf(t) !== -1){ sel.selectedIndex = i; break; } } }
      document.querySelectorAll('#selectedCourse,.selected-course,.checkout-course-name').forEach(function(el){ el.textContent = title; });
      var title2 = document.title.replace('Select a course below','').replace('Unknown Course','').trim();
      document.title = title + ' — rise AFRICA skills';
    }
    document.addEventListener('click', function(e){ if (!wrap.contains(e.target)) sugg.style.display = 'none'; });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', loadCourses);
  else loadCourses();
})();
</script>"""

    html = html.replace('</head>', css + '</head>', 1)
    html = html.replace('</body>', js + '</body>', 1)
    open(p, 'w', encoding='utf-8').write(html)
    print('Course picker added to enroll.html.')
