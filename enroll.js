(function () {
  function getStorage() {
    try {
      var t = "test";
      window.localStorage.setItem(t, t);
      window.localStorage.removeItem(t);
      return window.localStorage;
    } catch (e) {
      return {
        getItem: function () { return null; },
        setItem: function () {},
        removeItem: function () {}
      };
    }
  }

  var SUPABASE_URL = "https://lsvmykrentkbcdrzsaqj.supabase.co";
  var SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxzdm15a3JlbnRrYmNkcnpzYXFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4MDkzMjYsImV4cCI6MjEwMTM4NTMyNn0.6cbb7S-5Me8UNJDpn9aWkPHdK18Y8GEqOfypx16Fkdc";
  var CHECKOUT_FN = SUPABASE_URL + "/functions/v1/create-checkout-session";

  function ensureSupabase(cb) {
    if (window.supabase) return cb();
    var s = document.createElement("script");
    s.src = "https://unpkg.com/@supabase/supabase-js@2";
    s.onload = cb;
    s.onerror = function () {
      var s2 = document.createElement("script");
      s2.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
      s2.onload = cb;
      document.head.appendChild(s2);
    };
    document.head.appendChild(s);
  }

  ensureSupabase(function () {
    var sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        storage: getStorage(),
        autoRefreshToken: true,
        persistSession: true
      }
    });

    function getCourseSlug() {
      var path = window.location.pathname.split("/").pop();
      var m = path.match(/^([a-z0-9\-]+?)(?:-course|-lessons)?\.html$/i);
      return m ? m[1] : null;
    }

    function getCourseName() {
      var h1 = document.querySelector("h1");
      return h1 ? h1.textContent.trim() : "Course";
    }

    var slug = getCourseSlug();
    var courseName = getCourseName();
    if (!slug) return;

    var TIERS = {
      course_access:  { price: 800,  plan: "course" },
      certificate:    { price: 1000, plan: "certificate" },
      premium_bundle: { price: 350,  plan: "premium" }
    };

    function detectTier(amtText) {
      var t = amtText.replace(/[^0-9.]/g, "");
      if (t.indexOf("10") === 0) return "certificate";
      if (t.indexOf("3.5") === 0 || t.indexOf("3.50") === 0) return "premium_bundle";
      if (t.indexOf("8") === 0) return "course_access";
      return null;
    }

    function attach() {
      document.querySelectorAll(".ptier").forEach(function (tier) {
        var amtEl = tier.querySelector(".amt");
        if (!amtEl) return;
        var key = detectTier(amtEl.textContent);
        if (!key) return;
        tier.style.cursor = "pointer";
        tier.style.transition = "all .2s";
        tier.addEventListener("mouseenter", function () {
          tier.style.borderColor = "#c9a227";
          tier.style.transform = "translateY(-2px)";
        });
        tier.addEventListener("mouseleave", function () {
          tier.style.borderColor = "";
          tier.style.transform = "";
        });
        tier.addEventListener("click", function () { startCheckout(key); });
      });

      document.querySelectorAll("a.enroll").forEach(function (link) {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          startCheckout("course_access");
        });
      });
    }

    async function startCheckout(tierKey) {
      var tier = TIERS[tierKey];
      if (!tier) return;

      var sess = await sb.auth.getSession();
      var session = sess && sess.data ? sess.data.session : null;
      if (!session || !session.user || !session.user.email) {
        var next = encodeURIComponent(window.location.pathname);
        window.location.href = "login.html?next=" + next;
        return;
      }

      document.body.style.cursor = "wait";

      try {
        var res = await fetch(CHECKOUT_FN, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + SUPABASE_KEY,
            "apikey": SUPABASE_KEY
          },
          body: JSON.stringify({
            courseId: slug,
            courseSlug: slug,
            courseName: courseName,
            priceInCents: tier.price,
            currency: "usd",
            plan: tier.plan,
            userEmail: session.user.email
          })
        });

        var data = await res.json();
        if (!res.ok || data.error) {
          alert("Checkout error: " + (data.error || "Unknown"));
          document.body.style.cursor = "";
          return;
        }
        if (data.url) window.location.href = data.url;
        else { alert("No checkout URL returned"); document.body.style.cursor = ""; }
      } catch (err) {
        alert("Could not start checkout: " + err.message);
        document.body.style.cursor = "";
      }
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", attach);
    } else {
      attach();
    }
  });
})();