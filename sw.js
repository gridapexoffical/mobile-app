// sw.js - Service Worker a háttérben futó értesítésekhez
self.addEventListener('push', function(event) {
    let data = { title: 'GridApex Értesítés', body: 'Új üzeneted érkezett!' };
    
    if (event.data) {
        try {
            data = event.data.json();
        } catch (e) {
            data.body = event.data.text();
        }
    }

    const options = {
        body: data.body,
        icon: 'https://via.placeholder.com/192/101420/00ff66?text=GRID',
        badge: 'https://via.placeholder.com/72/101420/ff0055?text=GA',
        vibrate: [100, 50, 100],
        data: { dateOfArrival: Date.now() }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('notifications.html')
    );
});
