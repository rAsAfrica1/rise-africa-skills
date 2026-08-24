(function () {
  const SUPABASE_URL = 'https://lsvmykrentkbcdrzsaqj.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxzdm15a3JlbnRrYmNkcnpzYXFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4MDkzMjYsImV4cCI6MjEwMTM4NTMyNn0.6cbb7S-5Me8UNJDpn9aWkPHdK18Y8GEqOfypx16Fkdc';

  document.documentElement.style.visibility = 'hidden';

  function getCourseSlug() {
    const file = window.location.pathname.split('/').pop().replace('.html', '');
    return file.replace(/-module-?\d+$/i, '');
  }

  function redirectLocked(courseSlug, reason) {
    window.location.replace(`/${courseSlug}-course.html?locked=${reason}`);
  }

  function reveal() {
    document.documentElement.style.visibility = 'visible';
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
