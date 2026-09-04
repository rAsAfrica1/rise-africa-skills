/* ===========================================================================
   rise AFRICA skills — student assignment submission widget
   ---------------------------------------------------------------------------
   Mounts into <div id="ras-assignment"> on every module page.
   The page sets, before this script loads:
       window.RAS_COURSE_SLUG   e.g. "butchery"
       window.RAS_MODULE_NUM    e.g. 10
       window.RAS_MODULE_TITLE  e.g. "Curing, Smoking and Drying"
       window.RAS_WHATSAPP      e.g. "263773001353"

   Students record on a phone, upload to their own YouTube account as
   Unlisted, and paste the link here. Nothing is stored on our servers except
   the link itself, so there is no storage bill and no bandwidth bill, and the
   video streams at whatever quality the student's connection can carry.
   =========================================================================== */
(function () {
  'use strict';

  var SUPABASE_URL = 'https://lsvmykrentkbcdrzsaqj.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxzdm15a3JlbnRrYmNkcnpzYXFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4MDkzMjYsImV4cCI6MjEwMTM4NTMyNn0.6cbb7S-5Me8UNJDpn9aWkPHdK18Y8GEqOfypx16Fkdc';

  var mount = document.getElementById('ras-assignment');
  if (!mount) return;

  var COURSE = window.RAS_COURSE_SLUG || '';
  var MODULE = parseInt(window.RAS_MODULE_NUM, 10) || 0;
  var MTITLE = window.RAS_MODULE_TITLE || '';
  var WA     = window.RAS_WHATSAPP || '263773001353';

  var client = null;
  var email  = null;

  /* ---------- small helpers ------------------------------------------- */

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function when(d) {
    if (!d) return '';
    var t = new Date(d);
    return t.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
  }

  /* Parse a pasted link. Returns {provider, id} or null if we do not
     recognise it. We never guess — an unrecognised link is rejected with an
     explanation rather than saved and silently broken later. */
  function parseLink(raw) {
    var url = String(raw || '').trim();
    if (!url) return null;
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;

    var u;
    try { u = new URL(url); } catch (e) { return null; }
    var host = u.hostname.replace(/^www\./, '').toLowerCase();

    // youtu.be/VIDEOID
    if (host === 'youtu.be') {
      var s = u.pathname.slice(1).split('/')[0];
      return /^[\w-]{11}$/.test(s) ? { provider: 'youtube', id: s, url: url } : null;
    }
    // youtube.com/watch?v=  /shorts/  /live/  /embed/
    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com') {
      var v = u.searchParams.get('v');
      if (v && /^[\w-]{11}$/.test(v)) return { provider: 'youtube', id: v, url: url };
      var m = u.pathname.match(/^\/(?:shorts|live|embed|v)\/([\w-]{11})/);
      if (m) return { provider: 'youtube', id: m[1], url: url };
      return null;
    }
    // Google Drive share link
    if (host === 'drive.google.com') {
      return { provider: 'drive', id: null, url: url };
    }
    if (host === 'vimeo.com' || host === 'player.vimeo.com') {
      return { provider: 'vimeo', id: null, url: url };
    }
    return null;
  }

  function waitForSdk(ms) {
    return new Promise(function (resolve) {
      var start = Date.now();
      (function poll() {
        if (window.supabase) return resolve(true);
        if (Date.now() - start > ms) return resolve(false);
        setTimeout(poll, 50);
      })();
    });
  }

  /* ---------- rendering ------------------------------------------------ */

  var STATUS_LABEL = {
    submitted:  { text: 'Waiting for review', cls: 'ras-pill-wait' },
    reviewed:   { text: 'Reviewed — passed',  cls: 'ras-pill-ok' },
    needs_redo: { text: 'Needs another try',  cls: 'ras-pill-redo' }
  };

  function styles() {
    if (document.getElementById('ras-assign-css')) return;
    var css = document.createElement('style');
    css.id = 'ras-assign-css';
    css.textContent = [
      '#ras-assignment .ras-steps{margin:10px 0 0;padding-left:20px;font-size:14.5px;color:var(--ink-soft)}',
      '#ras-assignment .ras-steps li{margin:6px 0}',
      '#ras-assignment details{margin-top:12px}',
      '#ras-assignment summary{cursor:pointer;font-weight:600;color:var(--brand);font-size:14.5px}',
      '#ras-assignment label{display:block;font-weight:600;font-size:14.5px;margin:16px 0 6px}',
      '#ras-assignment input[type=url],#ras-assignment textarea{width:100%;box-sizing:border-box;',
      '  border:1px solid var(--line);border-radius:10px;padding:12px 13px;font:inherit;font-size:16px;',
      '  background:var(--paper);color:var(--ink)}',
      '#ras-assignment textarea{min-height:76px;resize:vertical}',
      '#ras-assignment input:focus,#ras-assignment textarea:focus{outline:2px solid var(--brand);outline-offset:1px}',
      '#ras-assignment .ras-btnrow{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-top:16px}',
      '#ras-assignment button.btn{border:0;cursor:pointer;font-family:inherit}',
      '#ras-assignment button.btn[disabled]{opacity:.55;cursor:default}',
      '#ras-assignment .ras-alt{display:inline-block;border:1px solid var(--line);background:var(--card);',
      '  color:var(--ink);text-decoration:none;padding:10px 16px;border-radius:10px;font-weight:600;font-size:15px}',
      '#ras-assignment .ras-msg{margin-top:14px;padding:12px 14px;border-radius:10px;font-size:14.5px;display:none}',
      '#ras-assignment .ras-msg.show{display:block}',
      '#ras-assignment .ras-msg.err{background:var(--warn-soft,#fdecec);color:var(--warn,#9b2c2c);border:1px solid var(--warn,#9b2c2c)}',
      '#ras-assignment .ras-msg.ok{background:var(--brand-soft);color:var(--brand);border:1px solid var(--brand)}',
      '#ras-assignment .ras-prev{border-top:1px solid var(--line);margin-top:22px;padding-top:18px}',
      '#ras-assignment .ras-sub{border:1px solid var(--line);border-radius:10px;padding:14px;margin-top:12px;background:var(--paper)}',
      '#ras-assignment .ras-sub-head{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:space-between}',
      '#ras-assignment .ras-pill{font-size:12.5px;font-weight:700;padding:4px 10px;border-radius:999px;white-space:nowrap}',
      '#ras-assignment .ras-pill-wait{background:#f0e6d2;color:#7a5b1e}',
      '#ras-assignment .ras-pill-ok{background:#dcefe0;color:#1f6b34}',
      '#ras-assignment .ras-pill-redo{background:#fbe3e3;color:#9b2c2c}',
      '#ras-assignment .ras-fb{margin-top:12px;border-left:3px solid var(--brand);padding:8px 0 8px 12px;font-size:14.5px}',
      '#ras-assignment .ras-thumb{display:block;margin-top:10px;border-radius:8px;overflow:hidden;max-width:280px}',
      '#ras-assignment .ras-thumb img{display:block;width:100%;height:auto}',
      '#ras-assignment .ras-link{word-break:break-all;font-size:13.5px}',
      '#ras-assignment .ras-del{background:none;border:0;color:var(--muted);font-size:13.5px;cursor:pointer;',
      '  text-decoration:underline;padding:0;margin-top:10px;font-family:inherit}'
    ].join('\n');
    document.head.appendChild(css);
  }

  function shell() {
    var waText = encodeURIComponent(
      'Hi rAs, this is my assignment video for ' + (MTITLE || COURSE) + ' (Module ' + MODULE + ').'
    );
    mount.innerHTML =
      '<div class="card">' +
        '<h3>📹 Submit your assignment video</h3>' +
        '<p class="note">Film yourself doing the Module ' + MODULE + ' capstone above. ' +
          'Two or three minutes is plenty — we want to see the work, not a film. ' +
          'Tendayi watches it and writes back to you here.</p>' +

        '<details><summary>How to get the link from your phone (tap to open)</summary>' +
          '<ol class="ras-steps">' +
            '<li>Record the video with your normal phone camera.</li>' +
            '<li>Open the <strong>YouTube</strong> app and sign in with your Google account.</li>' +
            '<li>Tap <strong>+</strong> at the bottom, then <strong>Upload a video</strong>, and pick your recording.</li>' +
            '<li>On the details screen set visibility to <strong>Unlisted</strong>. ' +
              'Unlisted means it will never appear in search or on your channel — only someone with the link can watch it.</li>' +
            '<li>When it finishes uploading, open the video, tap <strong>Share</strong>, then <strong>Copy link</strong>.</li>' +
            '<li>Come back here and paste it in the box below.</li>' +
          '</ol>' +
          '<p class="note" style="margin-top:10px">Upload on wifi if you can. A three minute video is roughly 100&nbsp;MB of data.</p>' +
        '</details>' +

        '<form id="ras-form" novalidate>' +
          '<label for="ras-url">Paste your video link</label>' +
          '<input type="url" id="ras-url" inputmode="url" autocomplete="off" ' +
            'placeholder="https://youtu.be/..." aria-describedby="ras-urlhelp">' +
          '<p class="note" id="ras-urlhelp">A YouTube link works best. Google Drive and Vimeo links are also accepted — ' +
            'if you use Drive, set sharing to <em>anyone with the link</em> or Tendayi cannot open it.</p>' +

          '<label for="ras-note">Anything you want to say about it (optional)</label>' +
          '<textarea id="ras-note" maxlength="600" ' +
            'placeholder="e.g. The pH meter reading was 5.9 but I could not get the calibration solution."></textarea>' +

          '<div class="ras-btnrow">' +
            '<button type="submit" class="btn" id="ras-send">Submit for review</button>' +
            '<a class="ras-alt" target="_blank" rel="noopener" ' +
              'href="https://wa.me/' + esc(WA) + '?text=' + waText + '">Or send it on WhatsApp</a>' +
          '</div>' +
          '<div class="ras-msg" id="ras-msg" role="status" aria-live="polite"></div>' +
        '</form>' +

        '<div class="ras-prev" id="ras-prev" hidden>' +
          '<h4 style="margin-top:0">Your submissions for this module</h4>' +
          '<div id="ras-list"></div>' +
        '</div>' +
      '</div>';
  }

  function say(kind, text) {
    var el = document.getElementById('ras-msg');
    el.className = 'ras-msg show ' + kind;
    el.textContent = text;
  }

  function clearSay() {
    var el = document.getElementById('ras-msg');
    el.className = 'ras-msg';
    el.textContent = '';
  }

  function renderList(rows) {
    var wrap = document.getElementById('ras-prev');
    var list = document.getElementById('ras-list');
    if (!rows || !rows.length) { wrap.hidden = true; return; }
    wrap.hidden = false;

    list.innerHTML = rows.map(function (r) {
      var s = STATUS_LABEL[r.status] || STATUS_LABEL.submitted;
      var thumb = r.video_id
        ? '<a class="ras-thumb" href="' + esc(r.video_url) + '" target="_blank" rel="noopener">' +
            '<img loading="lazy" alt="Your submitted video" ' +
            'src="https://i.ytimg.com/vi/' + esc(r.video_id) + '/mqdefault.jpg"></a>'
        : '';
      var fb = r.feedback
        ? '<div class="ras-fb"><strong>Feedback from Tendayi</strong><br>' +
            esc(r.feedback).replace(/\n/g, '<br>') + '</div>'
        : '';
      var note = r.note
        ? '<p class="note" style="margin-top:8px">Your note: ' + esc(r.note) + '</p>' : '';
      var del = r.status === 'submitted'
        ? '<button class="ras-del" data-del="' + esc(r.id) + '">Remove this submission</button>' : '';
      return '<div class="ras-sub">' +
        '<div class="ras-sub-head">' +
          '<strong>Sent ' + esc(when(r.created_at)) + '</strong>' +
          '<span class="ras-pill ' + s.cls + '">' + esc(s.text) + '</span>' +
        '</div>' +
        thumb +
        '<p class="ras-link" style="margin-top:8px"><a href="' + esc(r.video_url) +
          '" target="_blank" rel="noopener">' + esc(r.video_url) + '</a></p>' +
        note + fb + del +
      '</div>';
    }).join('');

    Array.prototype.forEach.call(list.querySelectorAll('[data-del]'), function (b) {
      b.addEventListener('click', function () { removeOne(b.getAttribute('data-del')); });
    });
  }

  /* ---------- data ----------------------------------------------------- */

  function refresh() {
    return client.from('submissions')
      .select('id,video_url,video_id,note,status,feedback,created_at')
      .eq('user_email', email)
      .eq('course_id', COURSE)
      .eq('module_num', MODULE)
      .order('created_at', { ascending: false })
      .then(function (res) {
        if (res.error) { console.error('[assignment] load failed', res.error); return; }
        renderList(res.data || []);
      });
  }

  function removeOne(id) {
    if (!window.confirm('Remove this submission? You can then send a new link.')) return;
    client.from('submissions').delete().eq('id', id).then(function (res) {
      if (res.error) { say('err', 'Could not remove it: ' + res.error.message); return; }
      clearSay();
      refresh();
    });
  }

  function submit(ev) {
    ev.preventDefault();
    clearSay();

    var btn = document.getElementById('ras-send');
    var raw = document.getElementById('ras-url').value;
    var note = document.getElementById('ras-note').value.trim();

    var parsed = parseLink(raw);
    if (!parsed) {
      say('err', 'That does not look like a video link we can open. Paste the full link from ' +
                 'YouTube (it starts https://youtu.be/ or https://www.youtube.com/watch?v=), ' +
                 'or a Google Drive or Vimeo link.');
      document.getElementById('ras-url').focus();
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Sending…';

    client.from('submissions').insert({
      user_email: email,
      course_id:  COURSE,
      module_num: MODULE,
      title:      MTITLE,
      video_url:  parsed.url,
      provider:   parsed.provider,
      video_id:   parsed.id,
      note:       note || null
    }).then(function (res) {
      btn.disabled = false;
      btn.textContent = 'Submit for review';
      if (res.error) {
        console.error('[assignment] insert failed', res.error);
        say('err', 'It did not save. ' + (res.error.message || '') +
                   ' If this keeps happening, send the video on WhatsApp instead.');
        return;
      }
      document.getElementById('ras-url').value = '';
      document.getElementById('ras-note').value = '';
      say('ok', 'Sent. Tendayi will watch it and your feedback will appear on this page.');
      refresh();
    });
  }

  /* ---------- boot ----------------------------------------------------- */

  function locked(msg) {
    styles();
    mount.innerHTML = '<div class="card"><h3>📹 Submit your assignment video</h3>' +
      '<p class="note">' + esc(msg) + '</p></div>';
  }

  waitForSdk(4000).then(function (ok) {
    if (!ok) return locked('The submission form could not load. Refresh the page and try again.');

    client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    return client.auth.getSession().then(function (r) {
      var session = r && r.data && r.data.session;
      if (!session || !session.user || !session.user.email) {
        return locked('Log in to submit your assignment video for this module.');
      }
      email = session.user.email;
      styles();
      shell();
      document.getElementById('ras-form').addEventListener('submit', submit);
      return refresh();
    });
  }).catch(function (e) {
    console.error('[assignment]', e);
    locked('The submission form could not load. Refresh the page and try again.');
  });
})();
