const CACHE_NAME = 'irina-app-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './catalog-online.html',
  './zima.html',
  './gifts.html',
  './2471.png'
];

// Установка: сохраняем основные файлы в кэш
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Активация: очищаем старый кэш при обновлении
self.addEventListener('activate', (event) => {
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

// Перехват запросов: сначала ищем в кэше, потом в сети
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
