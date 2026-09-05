(function () {
  const SUPABASE_URL = 'https://lsvmykrentkbcdrzsaqj.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxzdm15a3JlbnRrYmNkcnpzYXFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4MDkzMjYsImV4cCI6MjEwMTM4NTMyNn0.6cbb7S-5Me8UNJDpn9aWkPHdK18Y8GEqOfypx16Fkdc';

  document.documentElement.style.visibility = 'hidden';

  function getCourseSlug() {
    if (window.RAS_COURSE_SLUG) return window.RAS_COURSE_SLUG;
    const file = window.location.pathname.split('/').pop().replace('.html', '');
    // Strip BOTH page-type suffixes. Without the -lessons case, the course
    // contents page queried course_id 'bakery-lessons' (which matches no
    // enrollment) and then redirected to '/bakery-lessons-course.html', a 404.
    return file.replace(/-module-?\d+$/i, '').replace(/-lessons$/i, '');
  }

  function redirectLocked(courseSlug, reason) {
        window.location.replace(`/course-info.html?c=${courseSlug}&locked=${reason}`);

  function reveal() {
    document.documentElement.style.visibility = 'visible';
    mountAssignmentBox();
  }

  // ---------------------------------------------------------------------
  // Assignment video submissions.
  //
  // This is injected from here rather than written into each page, because
  // every module page in the site already loads this file. Adding it here
  // reaches all of them at once, including the ~764 older course pages,
  // with no edit to any HTML file.
  //
  // It only runs on a module page (filename ends -module-N), and only after
  // the enrollment check has passed, so a locked visitor never sees it.
  // ---------------------------------------------------------------------
  function mountAssignmentBox() {
    // This script tag sits near the top of <body>, so when the enrollment
    // check finishes early the rest of the page may not be parsed yet. Wait
    // for the DOM, or the <h1> and <main> we need are not there.
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', mountAssignmentBox, { once: true });
      return;
    }

    const file = window.location.pathname.split('/').pop().replace('.html', '');
    const m = file.match(/-module-?(\d+)$/i);
    if (!m) return;                                   // not a module page

    window.RAS_COURSE_SLUG = getCourseSlug();
    window.RAS_MODULE_NUM = parseInt(m[1], 10);
    window.RAS_WHATSAPP = window.RAS_WHATSAPP || '263773001353';

    if (!window.RAS_MODULE_TITLE) {
      const h1 = document.querySelector('main h1, .hero h1, h1');
      // Strip any leading emoji/symbols so the stored title stays clean text.
      window.RAS_MODULE_TITLE = h1
        ? h1.textContent.replace(/^[^\p{L}\p{N}]+/u, '').trim()
        : ('Module ' + window.RAS_MODULE_NUM);
    }

    // Newer pages already carry the mount point. Older ones do not, so put it
    // at the end of the main content column where the capstone sits.
    let host = document.getElementById('ras-assignment');
    if (!host) {
      host = document.createElement('div');
      host.id = 'ras-assignment';
      const parent = document.querySelector('main .wrap') ||
                     document.querySelector('main') ||
                     document.body;
      parent.appendChild(host);
    }

    if (document.querySelector('script[data-ras-assign]')) return;
    const s = document.createElement('script');
    s.src = '/assignment-submit.js';
    s.setAttribute('data-ras-assign', '1');
    document.body.appendChild(s);
  }

  async function waitForSupabaseSdk(timeoutMs) {
    const start = Date.now();
    while (!window.supabase && Date.now() - start < timeoutMs) {
      await new Promise((r) => setTimeout(r, 50));
    }
    return !!window.supabase;
  }

  async function checkAccess() {
    const courseSlug = getCourseSlug();

    const sdkReady = await waitForSupabaseSdk(3000);
    if (!sdkReady) {
      redirectLocked(courseSlug, 'error');
      return;
    }

    const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data: { session } } = await client.auth.getSession();

    if (!session || !session.user || !session.user.email) {
      redirectLocked(courseSlug, 'login');
      return;
    }

    const { data, error } = await client
      .from('enrollments')
      .select('id')
      .eq('user_email', session.user.email)
      .eq('course_id', courseSlug)
      .eq('status', 'active')
      .maybeSingle();

    if (error) {
      console.error('[course-lock] Enrollment check failed:', error);
      redirectLocked(courseSlug, 'error');
      return;
    }

    if (data) {
      reveal();
    } else {
      redirectLocked(courseSlug, 'buy');
    }
  }

  checkAccess();
})();
