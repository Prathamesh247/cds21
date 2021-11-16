//PWA is requesting the url from network
//const request = Event.request;
//console.log(request.url);

//Workbox is a library used for caching 

const CACHE_NAME = "pwa-assets";

var urls = [];

self.addEventListener("install", event => {
    console.log("The SW is now installed"); 
    event.waitUntil(caches.open(CACHE_NAME)
       .then(function(cache) {
           return cache.addAll(urls);
       })
    );
});

self.addEventListener("fetch", event => {
  event.respondWith(caches.match(event.request)
    .then(function(response) {
      if (response) {
        // The request is in the cache 
        return response;
    } else {
        // We need to go to the network  
        return fetch(event.request);
    }
    })
  );
});