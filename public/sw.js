const CACHE_NAME = 'quote-viewer-v2';
const PRECACHE_URLS = ['/quotes', '/'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  // 외부 도메인 요청은 캐시하지 않음
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok && event.request.destination === 'document') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() =>
        caches.match(event.request).then(
          (cached) => cached ?? caches.match('/quotes')
        )
      )
  );
});

// 푸시 알림 수신
self.addEventListener('push', (event) => {
  if (!event.data) return;
  let data = {};
  try { data = event.data.json(); } catch { data = { title: 'Quote Viewer', body: event.data.text() }; }

  const title = data.title ?? 'Quote Viewer';
  const options = {
    body: data.body ?? '오늘의 명언을 확인하세요.',
    icon: '/icons/icon.svg',
    badge: '/icons/icon.svg',
    data: { url: data.url ?? '/quotes' },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// 알림 클릭 시 페이지 이동
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url ?? '/quotes';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      const existing = clients.find((c) => c.url.includes(url));
      if (existing) return existing.focus();
      return self.clients.openWindow(url);
    })
  );
});
