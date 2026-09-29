const CACHE = 'ras-v2';
const CORE = [
  '/',
  '/index.html',
  '/course.html',
  '/video-library.html',
  '/assets/business-tools.js',
  '/assets/business-tools.css',
  '/assets/course-configs.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).catch(()=>{}));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const cacheable =
    url.origin === self.location.origin ||
    url.hostname.includes('supabase.co') ||
    url.hostname === 'cdn.jsdelivr.net' ||
    url.hostname === 'fonts.googleapis.com' ||
    url.hostname === 'fonts.gstatic.com';

  if (!cacheable) return;

  e.respondWith(
    caches.open(CACHE).then(cache =>
      fetch(req).then(res => {
        if (res && res.status === 200) cache.put(req, res.clone());
        return res;
      }).catch(() =>
        cache.match(req).then(hit => hit || (req.headers.get('accept') || '').includes('text/html')
          ? caches.match('/index.html')
          : new Response('Offline', { status: 503 }))
      )
    )
  );
});