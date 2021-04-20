// TODO: implement service worker so that users can use the app offline. The SW
// will need to cache static assets to display the app offline. Additionally,
// the SW should cache transaction data, using the cached data as a fallback
// when the app is used offline. HINT: You should use two caches. One for the
// static assets such ass html, css, js, images, etc; and another cache for
// the dynamic data from requests to routes beginning with "/api".
const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/index.js",
    "/manifest.webmanifest",
    "/styles.scc",
    "/icons/icon-192x192,png",
    "/icons/icon-512x512.png"
];

const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

self.addEventListener("install", function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("The files have been successfully pre-cached");
            return cache.addAll(FILES_TO_CACHE);
        })
    );
        self.skipWaiting();
})

self.addEventListener("activate", function (e) {
    e.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
                        console.log("Clearing the old cache data", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
})