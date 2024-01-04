// Comment this import when building for npm (leave uncommented for cdn)
// import 'babel-polyfill';

import api, {localstorage} from '../util/api';
import config from '../config';
import Base64 from '../util/base64';
import Promise from 'promise-polyfill';

let Pushy = {
    register(options) {
        return new Promise(async (resolve, reject) => {
            // Make sure options is an object
            if (!options || typeof options !== 'object') {
                options = {};
            }

            // Check for Web Push compatibility
            if (!('serviceWorker' in navigator && 'PushManager' in self) || typeof ServiceWorkerRegistration !== 'undefined') {
                // For iOS 16.4, notify about PWA requirement
                if (/iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
                    return reject(new Error('For Web Push on iOS 16.4+, you will first need to click the "Share" button -> "Add to Home Screen" before you can sign up for push notifications.'));
                }
                else {
                    return reject(new Error('Web push is not supported by this browser.'));
                }
            }

            // Check for HTML5 local storage or WebExtension storage support
            if (!(await localstorage.supported())) {
                return reject(new Error('Local storage is not supported by this browser.'));
            }

            // Service worker filename with extension (default to service-worker.js)
            let serviceWorkerFile = options.serviceWorkerFile || config.serviceWorker.fileName;

            // Make it possible to customize Service Worker scope
            let serviceWorkerOptions = { scope: options.serviceWorkerScope || '/' };

            // Registration object
            let registration;

            try {
                // Register service worker
                if (navigator.serviceWorker) {
                    // Register service worker from custom URL
                  registration = await navigator.serviceWorker.register(`/${serviceWorkerFile}`, serviceWorkerOptions);
                } else if (self.registration) {
                  // Expose the registration object if you are already in a service worker
                    registration = self.registration;
                }
            }
            catch (e) {
                // Service worker file missing
                return reject(new Error(`Failed to load '${self.location.origin}/${serviceWorkerFile}': ${e.message}`, e));
            }

          // Wait for service worker to become active
          if (navigator.serviceWorker) {
            await navigator.serviceWorker.ready 
          }

            // Attempt to fetch existing push subscription
            let subscription = await registration.pushManager.getSubscription();

            // Not subscribed yet?
            if (!subscription) {
                // Choose public key based on configured Pushy plan (Pro / Enterprise)
                let publicKey = await this.isEnterpriseConfigured() ? config.vapidDetails.enterprisePublicKey : config.vapidDetails.publicKey;

                try {
                    // Obtain Web Push subscription
                    subscription = await registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: Base64.urlB64ToUint8Array(publicKey) });
                }
                catch (e) {
                    // Brave: Instruct user to enable "Use Google Services for Push Messaging"
                    if (navigator.brave && e.message.indexOf('push service error') !== -1) {
                        return reject(new Error('Please enable "Use Google Services for Push Messaging" in Brave settings to use this feature', e));
                    }

                    // Most likely user denied permission
                    return reject(new Error(`Failed to subscribe the device: ${e.message}`, e));
                }
            }
            else {
                // We already have a Web Push subscription
                // Attempt to fetch existing device credentials
                let token = await localstorage.get(config.localStorageKeys.token);
                let tokenAuth = await localstorage.get(config.localStorageKeys.tokenAuth);
                let tokenAppId = await localstorage.get(config.localStorageKeys.tokenAppId);

                // Check for new app ID different than the one we registered with
                if (token && tokenAppId && options.appId && typeof tokenAppId === 'string' && tokenAppId !== options.appId) {
                    token = undefined;
                }

                // Already registered?
                if (token && tokenAuth) {
                    try {
                        // Validate device credentials
                        await this.validateDeviceCredentials();

                        // Device is valid, stop execution
                        return resolve(token);
                    }
                    catch (e) {
                        // Ignore error and register new device
                    }
                }
            }

            // Convert subscription byte arrays to strings
            subscription = JSON.parse(JSON.stringify(subscription));

            // Retrieve subscription data
            let auth = subscription.keys.auth;
            let key = subscription.keys.p256dh;
            let endpoint = subscription.endpoint;

            // Validate subscription
            if (!key || !auth || !endpoint) {
                return reject(new Error('The push subscription is missing a required field.'));
            }

            // Device registration post data
            let postData = {
                sdk: config.version,
                platform: config.platform,
                subscription: {
                    endpoint: endpoint,
                    key: key,
                    auth: auth
                }
            };

            // App ID passed in via options?
            if (options.appId) {
                // Set passed in app ID
                postData.appId = options.appId;
            }
            else {
                // Get current page hostname from self.location
                postData.app = self.location.hostname;
            }

            // API response
            let response;

            try {
                // Register the device
                response = await api.post('/register', postData);
            }
            catch (e) {
                // Registration failed
                return reject(new Error(`The API request failed: ${e.message}`, e));
            }

            // Validate response
            if (!response.token || !response.auth) {
                return reject(new Error('An unexpected response was received from the Pushy API.'));
            }

            // Save device token and auth in local storage
            await localstorage.set(config.localStorageKeys.token, response.token);
            await localstorage.set(config.localStorageKeys.tokenAuth, response.auth);

            // If appId was passed in, save it for later so we can tie the token to the app
            if (options.appId) {
              await localstorage.set(config.localStorageKeys.tokenAppId, options.appId);
            }

            // All done
            resolve(response.token);
        });
    },

    async setNotificationListener(handler) {
        // Check for Web Push compatibility
        if (!('serviceWorker' in navigator && 'PushManager' in self) || typeof ServiceWorkerRegistration !== 'undefined') {
            return console.error('Web push is not supported by this browser.');
        }

        // Wait for service worker to become active
        if (navigator.serviceWorker) {
          await navigator.serviceWorker.ready;
        }

        // Listen for service worker 'message' event
        navigator.serviceWorker.addEventListener('message', function (event) {
            // Ensure message is a Pushy notification
            if (event.data && event.data._pushy) {
                // Pass to notification listener
                handler(event.data);
            }
        });
    },

    async isRegistered() {
        // Attempt to fetch existing token and auth
        let token = await localstorage.get(config.localStorageKeys.token);
        let tokenAuth = await localstorage.get(config.localStorageKeys.tokenAuth);

        // Both values must exist
        return token && tokenAuth;
    },

    subscribe(topics) {
        return new Promise(async (resolve, reject) => {
            // Check for HTML5 local storage or WebExtension storage support
            if (localstorage.isSupported() === false) {
                return reject(new Error('Local storage is not supported by this browser.'));
            }

            // Attempt to fetch existing token and auth
            let token = await localstorage.get(config.localStorageKeys.token);
            let tokenAuth = await localstorage.get(config.localStorageKeys.tokenAuth);

            // Not registered yet?
            if (!token || !tokenAuth) {
                return reject(new Error('This device is not registered to receive push notifications.'));
            }

            // Convert single topic to array
            if (typeof topics === 'string') {
                topics = [topics];
            }

            // Post data
            let postData = { token: token, auth: tokenAuth, topics: topics };

            // API response
            let response;

            try {
                // Subscribe to topic(s)
                response = await api.post('/devices/subscribe', postData);
            }
            catch (e) {
                // Request failed
                return reject(new Error(`The API request failed: ${e.message}`, e));
            }

            // Validate response
            if (!response.success) {
                return reject(new Error('An unexpected response was received from the Pushy API.'));
            }

            // Subscribe success
            resolve();
        });
    },

    unsubscribe(topics) {
        return new Promise(async (resolve, reject) => {
            // Check for HTML5 local storage or WebExtension storage support
            if (!(await localstorage.supported())) {
                return reject(new Error('Local storage is not supported by this browser.'));
            }

            // Attempt to fetch existing token and auth
            let token = await localstorage.get(config.localStorageKeys.token);
            let tokenAuth = await localstorage.get(config.localStorageKeys.tokenAuth);

            // Not registered yet?
            if (!token || !tokenAuth) {
                return reject(new Error('This device is not registered to receive push notifications.'));
            }

            // Convert single topic to array
            if (typeof topics === 'string') {
                topics = [topics];
            }

            // Post data
            let postData = { token: token, auth: tokenAuth, topics: topics };

            // API response
            let response;

            try {
                // Unsubscribe from topic(s)
                response = await api.post('/devices/unsubscribe', postData);
            }
            catch (e) {
                // Request failed
                return reject(new Error(`The API request failed: ${e.message}`, e));
            }

            // Validate response
            if (!response.success) {
                return reject(new Error('An unexpected response was received from the Pushy API.'));
            }

            // Unsubscribe success
            resolve();
        });
    },

    validateDeviceCredentials() {
        return new Promise(async (resolve, reject) => {
            // Attempted validation
            this.attemptedValidation = true;

            // Check for HTML5 local storage or WebExtension storage support
            if (!(await localstorage.supported())) {
                return reject(new Error('Local storage is not supported by this browser.'));
            }

            // Attempt to fetch existing token and auth
            let token = await localstorage.get(config.localStorageKeys.token);
            let tokenAuth = await localstorage.get(config.localStorageKeys.tokenAuth);

            // Not registered yet?
            if (!token || !tokenAuth) {
                return reject(new Error('The device is not registered to receive push notifications.'));
            }

            // Registration post data
            let postData = { sdk: config.version, token: token, auth: tokenAuth };

            // API response
            let response;

            try {
                // Authenticate the device
                response = await api.post('/devices/auth', postData);
            }
            catch (e) {
                // Request failed
                return reject(new Error(`The API request failed: ${e.message}`, e));
            }

            // Validate response
            if (!response.success) {
                return reject(new Error('An unexpected response was received from the Pushy API.'));
            }

            // Device is valid
            resolve();
        });
    },

    async isEnterpriseConfigured() {
        // Check whether the enterprise endpoint key is set
        return await localstorage.get(config.localStorageKeys.enterpriseEndpoint) != undefined;
    },

    async setEnterpriseConfig(endpoint) {
        // Strip trailing slash if string provided
        if (typeof endpoint === 'string' && endpoint.substr(-1) === '/') {
            // Remove last character via substr()
            endpoint = endpoint.substr(0, endpoint.length - 1);
        }

        // Retrieve previous endpoint (may be null)
        let previousEndpoint = await localstorage.get(config.localStorageKeys.enterpriseEndpoint);

        // Endpoint changed?
        if (endpoint != previousEndpoint) {
            // Clear existing registration
            await localstorage.remove(config.localStorageKeys.token);
            await localstorage.remove(config.localStorageKeys.tokenAuth);
            await localstorage.remove(config.localStorageKeys.tokenAppId);

            // Persist hostname in local storage
            if (!endpoint) {
                // Clear Pushy Enterprise hostname if null
              await localstorage.remove(config.localStorageKeys.enterpriseEndpoint);
            }
            else {
                // Save updated Pushy Enterprise hostname in local storage
              await localstorage.set(config.localStorageKeys.enterpriseEndpoint, endpoint);
            }
        }
    },

    async setProxyEndpoint(endpoint) {
        // Null endpoint?
        if (!endpoint) {
            return await localstorage.remove(config.localStorageKeys.proxyEndpoint);
        }

        // Strip trailing slash if string provided
        if (typeof endpoint === 'string' && endpoint.substr(-1) === '/') {
            // Remove last character via substr()
            endpoint = endpoint.substr(0, endpoint.length - 1);
        }

        // Save updated proxy endpoint hostname in local storage
        await localstorage.set(config.localStorageKeys.proxyEndpoint, endpoint);
    }
}

// Attempt to validate device credentials X ms after page has loaded
setTimeout(async () => {
    // Not registered yet?
    if (!await Pushy.isRegistered()) {
        return;
    }

    // Avoid validating twice
    if (Pushy.attemptedValidation) {
        return;
    }

    // Validate device credentials
    Pushy.validateDeviceCredentials().catch((err) => {
        // Log error
        console.error('Device validation failed', err);
    });
}, config.logic.deviceValidationDelay);

// Export class
module.exports = Pushy;
