// Rise Africa Skills - Service Worker v170
// Network-first for HTML, cache-first for static assets.
// Bumping CACHE_NAME forces every device to delete old caches on next visit.
const CACHE_NAME = 'rise-africa-v170';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/og-image.png'
];

// Install: activate immediately, cache a small set of static assets
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching static assets v170');
      return cache.addAll(STATIC_ASSETS).catch(() => {});
    })
  );
});

// Activate: delete ALL old caches, take control of open tabs immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch strategy:
// - HTML navigations: network-first, cache fallback (so updates go live instantly)
// - Static assets (css, js, images, fonts): cache-first, network fallback (for speed)
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const isHtml = req.mode === 'navigate' ||
                 req.destination === 'document' ||
                 url.pathname.endsWith('.html') ||
                 url.pathname === '/';

  if (isHtml) {
    // NETWORK-FIRST: fetch fresh, update cache, fall back to cache if offline
    event.respondWith(
      fetch(req)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          }
          return response;
        })
        .catch(() => caches.match(req).then((cached) => cached || caches.match('/index.html')))
    );
    return;
  }

  // STATIC ASSETS: cache-first
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((response) => {
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
        }
        return response;
      });
    })
  );
});

// Message handler: allow pages to force update
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});