// Rise Africa Skills - Service Worker v1.0
const CACHE_NAME = 'rise-africa-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/course-player.html',
  '/certificate.html',
  '/all-courses.json',
  '/manifest.json',
  '/pig-farming-course.html',
  '/poultry-farming-course.html',
  '/rabbit-farming-course.html',
  '/goat-sheep-rearing-course.html',
  '/ostrich-farming-course.html',
  '/bee-farming-course.html',
  '/mushroom-farming-course.html'
];

// Install: Cache static assets
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Activate: Clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Cache-first strategy with network fallback
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        // Cache new valid responses
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });
        }
        return response;
      }).catch(() => {
        // Offline fallback for HTML pages
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
      });
    })
  );
});
