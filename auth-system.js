// Rise Africa Skills - Authentication System v2.0
// Integrates with Supabase for user authentication

const SUPABASE_URL = 'https://your-supabase-url.supabase.co';
const SUPABASE_KEY = 'your-supabase-anon-key';

let supabaseClient = null;

// Initialize Supabase client
async function initializeSupabase() {
  if (window.supabase) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log('[Auth] Supabase initialized');
    return supabaseClient;
  } else {
    console.warn('[Auth] Supabase library not loaded');
    return null;
  }
}

// Check if user is authenticated
async function checkAuth() {
  if (!supabaseClient) {
    supabaseClient = await initializeSupabase();
  }

  try {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session && session.user) {
      console.log('[Auth] User authenticated:', session.user.email);
      return session.user;
    } else {
      console.log('[Auth] No active session');
      return null;
    }
  } catch (error) {
    console.error('[Auth] Session check failed:', error.message);
    return null;
  }
}

// Sign up new user
async function signUp(email, password) {
  if (!supabaseClient) {
    supabaseClient = await initializeSupabase();
  }

  try {
    const { data, error } = await supabaseClient.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: window.location.origin
      }
    });

    if (error) {
      console.error('[Auth] Sign up failed:', error.message);
      return { success: false, error: error.message };
    }

    console.log('[Auth] Sign up successful');
    return { success: true, user: data.user };
  } catch (error) {
    console.error('[Auth] Sign up error:', error.message);
    return { success: false, error: error.message };
  }
}

// Sign in existing user
async function signIn(email, password) {
  if (!supabaseClient) {
    supabaseClient = await initializeSupabase();
  }

  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) {
      console.error('[Auth] Sign in failed:', error.message);
      return { success: false, error: error.message };
    }

    console.log('[Auth] Sign in successful');
    return { success: true, user: data.user };
  } catch (error) {
    console.error('[Auth] Sign in error:', error.message);
    return { success: false, error: error.message };
  }
}

// Sign out
async function signOut() {
  if (!supabaseClient) {
    supabaseClient = await initializeSupabase();
  }

  try {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.error('[Auth] Sign out failed:', error.message);
      return { success: false, error: error.message };
    }
    console.log('[Auth] Signed out successfully');
    return { success: true };
  } catch (error) {
    console.error('[Auth] Sign out error:', error.message);
    return { success: false, error: error.message };
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
  console.log('[Auth] Initializing authentication system...');
  await initializeSupabase();
  const user = await checkAuth();
  if (user) {
    console.log('[Auth] User is logged in:', user.email);
  }
});
