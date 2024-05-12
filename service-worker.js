// Define a cache name
const CACHE_NAME = 'hybrid-apps-cache-v1';

// List of assets to cache
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/service-worker.js'
    // Add other files here as needed
];

// Install the service worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

// Fetch assets from cache or network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached response if found
                if (response) {
                    return response;
                }

                // Fetch from network if not cached
                return fetch(event.request);
            })
    );
});
