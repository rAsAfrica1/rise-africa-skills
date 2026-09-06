/* rise AFRICA skills - visitor tracking. No cookies, no IP, no login.
   The session id is random, lives only in sessionStorage, dies with the tab,
   and is never joined to an account - which is why this needs no cookie banner. */
(function () {
  'use strict';
  if (window.__rasTracked) return;
  window.__rasTracked = true;

  var URL_ = 'https://lsvmykrentkbcdrzsaqj.supabase.co';
  var KEY_ = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxzdm15a3JlbnRrYmNkcnpzYXFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4MDkzMjYsImV4cCI6MjEwMTM4NTMyNn0.6cbb7S-5Me8UNJDpn9aWkPHdK18Y8GEqOfypx16Fkdc';

  // Don't count yourself:  localStorage.setItem('ras.notrack','1')
  try { if (localStorage.getItem('ras.notrack') === '1') return; } catch (e) {}
  if (/bot|crawl|spider|slurp|bingpreview|headless|lighthouse/i.test(navigator.userAgent || '')) return;

  function sessionId() {
    try {
      var k = 'ras.sid', v = sessionStorage.getItem(k);
      if (!v) { v = (Date.now().toString(36) + Math.random().toString(36).slice(2, 10)); sessionStorage.setItem(k, v); }
      return v;
    } catch (e) { return 'nostore-' + Math.random().toString(36).slice(2, 10); }
  }

  var file = location.pathname.split('/').pop() || 'index.html';
  var stem = file.replace(/\.html$/i, '');
  var kind = 'other', course = null;
  if (stem === '' || stem === 'index') {
    kind = 'home';
  } else if (stem === 'course-info') {
    kind = 'course-info';
    var q = new URLSearchParams(location.search).get('c');
    if (q && /^[a-z0-9-]{1,60}$/i.test(q)) course = q;
  } else if (/-module-?\d+$/i.test(stem)) {
    kind = 'module'; course = stem.replace(/-module-?\d+$/i, '');
  } else if (/-lessons$/i.test(stem)) {
    kind = 'lessons'; course = stem.replace(/-lessons$/i, '');
  } else if (/-course$/i.test(stem)) {
    kind = 'course-info'; course = stem.replace(/-course$/i, '');
  }

  var ref = null;
  try {
    if (document.referrer) {
      var h = new URL(document.referrer).hostname.replace(/^www\./, '');
      if (h && h !== location.hostname.replace(/^www\./, '')) ref = h;
    }
  } catch (e) {}

  var row = { path: location.pathname.slice(0, 300), course_id: course,
              page_kind: kind, referrer_host: ref, session_id: sessionId() };

  try {
    fetch(URL_ + '/rest/v1/page_views', {
      method: 'POST', keepalive: true,
      headers: { 'apikey': KEY_, 'Authorization': 'Bearer ' + KEY_,
                 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
      body: JSON.stringify(row)
    }).catch(function () {});
  } catch (e) {}
})();
