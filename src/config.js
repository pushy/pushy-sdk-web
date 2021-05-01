module.exports = {
    // Web Push SDK version code
    version: 1008,
    // SDK platform
    platform: 'web',
    // Pushy API endpoints (production and development)
    api: {
        endpoint: 'https://api.pushy.me',
        devEndpoint: 'http://localhost:3001'
    },
    // Public VAPID keys for Web Push subscription registration
    vapidDetails: {
        publicKey: 'BMHDCTp0zHPUj9snbHxwQZh2ppoypdOpuAQtBjf2Gj9KKwCHCcN_f2GFzwmzohRWYUPVcR0psb5VQTnGy-gY8iE',
        enterprisePublicKey: 'BDZ1EQHwxF3dFQ5LccxKD5rdOPlO5iLLIAbxxm-1fIuMLQQcXa_UUD8CRja_iBmlmlQZsookpGnHaSTsbb-Rglo'
    },
    // Local storage preference keys
    localStorageKeys: {
        token: 'pushyToken',
        tokenAuth: 'pushyTokenAuth',
        tokenAppId: 'pushyTokenAppId',
        enterpriseEndpoint: 'pushyEnterpriseEndpoint'
    },
    // Service worker config
    serviceWorker: {
        // Local service worker default file name
        fileName: 'service-worker.js'
    },
    // General SDK logic
    logic: {
        // Wait X ms before validating device registration automatically
        deviceValidationDelay: 5000
    }
};