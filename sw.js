// Sci-Bank 알림용 서비스 워커: 안드로이드 크롬에서 새 메시지 알림 창을 띄우고, 누르면 열린 창으로 돌아감.
// 캐시·오프라인 기능은 없음(fetch를 가로채지 않음).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || './';
  e.waitUntil(self.clients.matchAll({type: 'window', includeUncontrolled: true}).then(cs => {
    const c = cs.find(x => x.url.split('#')[0] === url.split('#')[0]) || cs[0];
    return c ? c.focus() : self.clients.openWindow(url);
  }));
});
