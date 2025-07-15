const CACHE_NAME = 'todo-pwa-cache-v1';
const urlsToCache = [
    '/', // アプリケーションのルート
    '/index.html',
    '/styles.css',
    '/app.js',
    '/manifest.json',
    '/icons/icon-72x72.png',
    '/icons/icon-96x96.png',
    '/icons/icon-128x128.png',
    '/icons/icon-144x144.png',
    '/icons/icon-152x152.png',
    '/icons/icon-192x192.png',
    '/icons/icon-384x384.png',
    '/icons/icon-512x512.png'
];

// インストールイベント: キャッシュにファイルを保存
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .catch(err => {
                console.error('Failed to cache:', err);
            })
    );
});

// フェッチイベント: キャッシュからリソースを返す（なければネットワークから取得）
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // キャッシュにレスポンスがあればそれを返す
                if (response) {
                    return response;
                }
                // なければネットワークから取得し、キャッシュに追加
                return fetch(event.request).then(
                    response => {
                        // レスポンスが不正な場合（例: ネットワークエラー、200以外のステータス）はキャッシュしない
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        return response;
                    }
                );
            })
            .catch(error => {
                console.error('Fetch failed:', error);
                // オフライン時にフォールバックページを提供する場合
                // return caches.match('/offline.html');
            })
    );
});

// アクティベートイベント: 古いキャッシュを削除
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        // 現在のキャッシュ名に含まれていない古いキャッシュを削除
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
