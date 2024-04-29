const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
    '/',
    'index.html',
    'style.css',
    'app.js',
    'lightblue.jpg',
    'lightgold.jpg',
    'manifest.json',
    'twitter.256x256.png',
    'twitter.512x512.png'
];

self.addEventListener('install', function(event) {
    // Perform installation process
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }

            // Clone the request to make a new request
            let fetchRequest = event.request.clone();

            // Perform a network request
            return fetch(fetchRequest).then(
                function(response) {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clone the response to make a new response
                    let responseToCache = response.clone();

                    // Open the cache and put the new response in it
                    caches.open(CACHE_NAME)
                        .then(function(cache) {
                            cache.put(event.request, responseToCache);
                        });

                    // Return the original response
                    return response;
                }
            );
        })
    );
});
