const CACHE_NAME = "dormdash-cache-v1";
const urlsToCache = [
    "/FinalDormDash/index.html",
    "/FinalDormDash/assets/css/styles.css",  // Add your main CSS file here
    "/FinalDormDash/assets/js/script.js",    // Add your main JS file here
    "/FinalDormDash/assets/images/logo.jpg",
    "/FinalDormDash/available_requests.html",
    "/FinalDormDash/make_order.html",
    "/FinalDormDash/your_orders.html"
];

// Install Service Worker and Cache Files
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch Resources from Cache or Network
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});

// Update Cache when a new version is available
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
