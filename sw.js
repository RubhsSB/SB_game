// sw.js
self.addEventListener('install', e => {
  console.log('Service Worker instalado');
});

self.addEventListener('fetch', function(event) {
  // Deja pasar todas las peticiones sin interferir
});
