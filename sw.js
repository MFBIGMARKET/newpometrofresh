const CACHE_NAME = 'metrofresh-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/admin.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Network-First Strategy (Always tries to get fresh data, falls back to cache if offline)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});