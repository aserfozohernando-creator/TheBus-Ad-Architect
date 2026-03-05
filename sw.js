const CACHE_NAME = 'bus-ads-v1.2';
const ASSETS = [
  './',
  './index.html',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
  'https://code.jquery.com/jquery-3.7.1.min.js',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // We use map to catch individual errors so the whole thing doesn't crash
      return Promise.all(
        ASSETS.map(url => {
          return cache.add(url).catch(err => console.error('Fetch failed for:', url));
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});