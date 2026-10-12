import os, re

# ─── FIX 1: enroll.html — replace "Unknown Course" fallbacks ───
p = 'enroll.html'
html = open(p, encoding='utf-8').read()
orig = html

# Replace visible "Unknown Course" text with a friendlier prompt
html = html.replace('Unknown Course', 'Select a course below')
html = html.replace('Enroll in Unknown Course', 'Choose a course to enroll')
html = html.replace('unknown-course', 'course-placeholder')

# Make sure our rAsEnroll block exists and has the improved version
if 'rAsEnroll' not in html:
    fix_js = '''
(function(){
  var params = new URLSearchParams(window.location.search);
  var course = params.get('course') || '';
  var tier   = params.get('tier')   || 'course';
  var slug   = params.get('slug')   || '';
  var price  = params.get('price')  || '5';
  window.rAsEnroll = { course: course, tier: tier, slug: slug, price: price };
  function fillCourse() {
    document.querySelectorAll('.course-placeholder, .course-unknown').forEach(function(el){ el.style.display = 'none'; });
    document.querySelectorAll('#courseName, #selectedCourse, .course-name, [data-course-name], .checkout-course-name').forEach(function(el){
      el.textContent = course || 'Select a course below';
    });
    var sel = document.getElementById('regCourse') || document.querySelector('select[name="course"]');
    if (sel && course) {
      for (var i = 0; i < sel.options.length; i++) {
        var v = sel.options[i].value.trim();
        var t = sel.options[i].textContent.trim();
        if (v === course || t === course || t.indexOf(course) !== -1) { sel.selectedIndex = i; break; }
      }
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fillCourse);
  else fillCourse();
})();
'''
    m = re.search(r'<script[^>]*>', html)
    if m:
        html = html[:m.end()] + fix_js + html[m.end():]
        print('enroll.html: injected rAsEnroll fix.')
else:
    print('enroll.html: rAsEnroll already present.')

if html != orig:
    open(p, 'w', encoding='utf-8').write(html)
    print('enroll.html: saved.')
else:
    print('enroll.html: no changes needed.')

# ─── FIX 2: index.html — make Enroll Now button pass a default course ───
p = 'index.html'
html = open(p, encoding='utf-8').read()
orig = html

default_url = 'enroll.html?course=Block%20Making%20and%20Concrete%20Products&tier=course&slug=block-making&price=5'

# Case A: link tag with href="enroll.html"
html = html.replace(
    '<a href="enroll.html" class="hero-btn-gold">',
    f'<a href="{default_url}" class="hero-btn-gold">'
)
html = html.replace(
    'href="enroll.html" class="hero-btn-gold"',
    f'href="{default_url}" class="hero-btn-gold"'
)

# Case B: JS that redirects to enroll.html
html = html.replace(
    "window.location.href = 'enroll.html';",
    f"window.location.href = '{default_url}';"
)
html = html.replace(
    'window.location.href = "enroll.html";',
    f'window.location.href = "{default_url}";'
)

if html != orig:
    open(p, 'w', encoding='utf-8').write(html)
    print('index.html: Enroll Now button updated.')
else:
    print('index.html: could not find the Enroll Now button link. Manual check needed.')
