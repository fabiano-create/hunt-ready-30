const CACHE='hunt-ready-30-v5-0-0';
const CORE=['./','index.html','styles.css','app.js','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(Promise.all([
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))),
    self.clients.claim()
  ]));
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  const url=new URL(event.request.url);
  if(url.hostname==='fonts.googleapis.com'||url.hostname==='fonts.gstatic.com'){
    // web fonts: cache-first so the type survives offline
    event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(r=>{ if(r.ok||r.type==='opaque'){ const copy=r.clone(); caches.open(CACHE).then(c=>c.put(event.request,copy)); } return r; })));
    return;
  }
  if(url.origin!==self.location.origin) return;
  if(url.pathname.includes('/media/demos/')) return;   // video clips: let the browser stream them directly
  event.respondWith(
    fetch(event.request).then(response=>{
      const copy=response.clone();
      caches.open(CACHE).then(cache=>cache.put(event.request,copy));
      return response;
    }).catch(()=>caches.match(event.request).then(cached=>cached||caches.match('./')))
  );
});
