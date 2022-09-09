const js = `
'use strict';
const CACHE_VERSION=1;
let CURRENT_CACHES={offline:"offline-v1"};
const OFFLINE_URL="/offline.html";
function createCacheBustedRequest(a){let b=new Request(a,{cache:"reload"});if("cache"in b)return b;let c=new URL(a,self.location.href);return c.search+=(c.search?"&":"")+"cachebust="+Date.now(),new Request(c)}self.addEventListener("install",a=>{a.waitUntil(fetch(createCacheBustedRequest(OFFLINE_URL)).then(function(a){return caches.open(CURRENT_CACHES.offline).then(function(b){return b.put(OFFLINE_URL,a)})}))}),self.addEventListener("activate",a=>{let b=Object.keys(CURRENT_CACHES).map(function(a){return CURRENT_CACHES[a]});a.waitUntil(caches.keys().then(a=>Promise.all(a.map(a=>{if(-1===b.indexOf(a))return console.log("Deleting out of date cache:",a),caches.delete(a)}))))}),self.addEventListener("fetch",a=>{("navigate"===a.request.mode||"GET"===a.request.method&&a.request.headers.get("accept").includes("text/html"))&&(console.log("Handling fetch event for",a.request.url),a.respondWith(fetch(a.request).catch(a=>(console.log("Fetch failed; returning offline page instead.",a),caches.match(OFFLINE_URL)))))});

`

async function handleRequest(request) {
  return new Response(js, {
      headers: {
            "content-type": "application/javascript;charset=UTF-8",
                },
                  })
                  }
addEventListener("fetch", event => {
  return event.respondWith(handleRequest(event.request))
  })
