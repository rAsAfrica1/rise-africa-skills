// rise AFRICA skills - auth guard
// Include this on every protected course page:
//   <script src="auth-guard.js"></script>
// Place it at the TOP of <body> so it runs before content shows.
(async () => {
  const SUPABASE_URL = "https://lsvmykrentkbcdrzsaqj.supabase.co";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxzdm15a3JlbnRrYmNkcnpzYXFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4MDkzMjYsImV4cCI6MjEwMTM4NTMyNn0.6cbb7S-5Me8UNJDpn9aWkPHdK18Y8GEqOfypx16Fkdc";

  // Load Supabase if not already present
  if (!window.supabase) {
    await new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  const { data: { session } } = await supabase.auth.getSession();
  const expiry = localStorage.getItem('ras_session_expiry');
  const expired = expiry && Date.now() > parseInt(expiry);

  if (!session || expired) {
    if (session) await supabase.auth.signOut();
    localStorage.removeItem('ras_session_expiry');
    const here = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.replace('login.html?next=' + here);
  }
})();