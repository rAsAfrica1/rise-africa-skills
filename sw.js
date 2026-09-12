// KILL SWITCH — removes this service worker and all caches from every device.
// After this runs, the site loads fresh from the network every time.
// We can re-add a proper service worker later if needed.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    try {
      // 1. Delete ALL caches
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));

      // 2. Unregister this service worker
      await self.registration.unregister();

      // 3. Force every open tab to reload
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach((c) => {
        try { c.navigate(c.url); } catch (e) {}
      });
    } catch (e) {
      console.warn('[SW] kill-switch error:', e);
    }
  })());
});

// Pass-through: while the SW still exists briefly, just proxy to network
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});