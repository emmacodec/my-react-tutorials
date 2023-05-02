if ('ServiceWorker' in navigator && process.env.NODE_ENV==='production') {
    navigator.ServiceWorker.register('src/service-worker.js');
}