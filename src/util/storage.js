import config from '../config';

// WebExtensions storage support
const browser = self.browser || self.chrome;

export const localStorage = {
    // Cache WebExtensions storage to avoid async/await method signatures
    cache: {},

    async recacheWebExtensionStorage() {
        // Cache browser storage when running inside a WebExtension
        if (this.isWebExtension()) {
            // Traverse all local storage keys 
            for (const i in config.localStorageKeys) {
                // Get key for current item
                const key = config.localStorageKeys[i];
                
                // Cache values from WebExtensions storage by key
                this.cache[key] = (await browser.storage.local.get(key))[key];
            }
        }
    },

    getItem(key) {
        // Get item (from Local Storage or WebExtensions cache if present)
        return self.localStorage ? self.localStorage.getItem(key) : this.cache[key];
    },

    setItem(key, value) {
        // Local Storage support
        if (self.localStorage) {
            self.localStorage.setItem(key, value);
        }

        // WebExtensions support
        else if (this.isWebExtension()) {
            // Save in extension storage
            browser.storage.local.set({ [key]: value });

            // Update WebExtensions cache
            this.cache[key] = value;
        }
    },

    removeItem(key) {
        // Local Storage support
        if (self.localStorage) {
            // Remove from browser local storage
            self.localStorage.removeItem(key);
        }

        // WebExtensions support
        else if (this.isWebExtension()) {
            // Remove from extension storage
            browser.storage.local.remove(key);

            // Update WebExtensions cache
            this.cache[key] = null;
        }
    },

    isSupported() {
        // Check for Local Storage or WebExtensions storage
        return self.localStorage || this.isWebExtension();
    },

    isWebExtension() {
        // Chrome uses chrome.* as the namespace, Firefox and Safari use browser.*
        const webExtensionNamespace = 'browser' in self ? 'browser' : 'chrome' in self ? 'chrome' : undefined;

        // Check for browser.storage.local support
        return webExtensionNamespace && webExtensionNamespace in self && 'storage' in self[webExtensionNamespace] && 'local' in self[webExtensionNamespace].storage;
    }
};

// WebExtension support: recache storage immediately onload
localStorage.recacheWebExtensionStorage();