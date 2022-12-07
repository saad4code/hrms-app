let cacheData = "appV2"

this.addEventListener("install", (event) =>{
    event.waitUntil(
        caches.open(cacheData).then((cache) =>{
            cache.addAll([
                "/static/js/bundle.js",
                "/static/js/main.chunk.js",
                "/index.html",
                "/",
                "/dashboard",
                "/favicon.ico",
                "/static/js/vendors~main.chunk.js",
                "/static/media/brackets.4f1ea9f7.png",
                "/sign-in",
                "/static/media/imageFour.64df6f40.jpg"
            ])
        })
    )
})

this.addEventListener("fetch",(event)=>{
    if(!navigator.onLine){
    event.respondWith(
        caches.match(event.request).then((result)=>{
            if(result){
                return result
            }
        })
    )
}
})