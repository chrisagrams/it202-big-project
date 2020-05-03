self.addEventListener("install", (e) => {
  console.log("installing", e);
  e.waitUntil(caches.open("gasPrice_cache").then((cache) =>{
      return cache.addAll(
      [
          './index.html',
          './script.js',
          './img/gasPrice.svg',
          './img/github.svg',
          './icons/android-chrome-192x192.png',
          './icons/android-chrome-512x512.png',
          './icons/apple-touch-icon.png',
          './icons/favicon-16x16.png',
          './icons/favicon-32x32.png'
      ]);
  }))  
});


self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
          console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then((response) => {
                return caches.open("gasPrice_cache").then((cache) => {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});