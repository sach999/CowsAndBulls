const CACHE_STATIC_NAME = 'static-v12'
let CACHE_DYNAMIC_NAME = 'dynamic-v2'


//Pre cache
self.addEventListener('install', function (event) {
    console.log('[Service Worker] Installing service worker...', event)
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME).then(function (cache) {
            console.log('[Service Worker] Precaching App Shell')
            cache.addAll([
                '/',
                '/index.html',
                '/rules/rules.html',
                '/feedback/feedback.html',
                '/feedback/style.js',
                '/app.js',
                '/dataset.js',
                '/style.css',
                '/imgs/CABLogo.png',
                'https://code.jquery.com/jquery-3.4.1.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.css',
                'https://fonts.googleapis.com/css?family=Quicksand|Saira+Stencil+One&display=swap'
            ])
        })
    )
})

//Cache Only srategy
// self.addEventListener('fetch', function (event) {
//     event.respondWith(
//         caches.match(event.request)
//     )
// })

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) {
                return response
            } else {
                return fetch(event.request)
                    .then(function (res) {
                        return caches.open(CACHE_DYNAMIC_NAME).then(function (cache) {
                            cache.put(event.request.url, res.clone())
                            return res
                        })
                    })
                    .catch(function (err) { })
            }
        })
    )
})