if ('ServiceWorker' in navigator && Processing.env.NODE_ENV==='production') {
    navigator.ServiceWorker.register('/static/service-worker.js');
}