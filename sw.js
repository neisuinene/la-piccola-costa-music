const VERSION='lpcm-v4';
const CORE=['./','index.html','manifest.json','icon-192.png','icon-512.png','maskable-512.png','apple-touch-icon.png','favicon-32.png'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(VERSION).then(c=>Promise.all(CORE.map(u=>
    fetch(new Request(u,{cache:'reload'})).then(r=>{if(!r.ok)throw new Error(u);return c.put(u,r)})
  ))).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET')return;
  const u=new URL(req.url);
  const shell=req.mode==='navigate'||(u.origin===location.origin&&/\/(index\.html)?$/.test(u.pathname));
  e.respondWith((async()=>{
    const cache=await caches.open(VERSION);
    const hit=await cache.match(req,{ignoreSearch:true});
    const net=fetch(req,{cache:'no-cache'}).then(r=>{if(r&&(r.ok||r.type==='opaque'))cache.put(req,r.clone());return r});
    if(shell){
      try{return await Promise.race([net,new Promise((_,j)=>setTimeout(j,3500))])}
      catch(_){return hit||await cache.match('index.html')||net}
    }
    return hit||net.catch(()=>cache.match('index.html'));
  })());
});
