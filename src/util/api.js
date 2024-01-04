import 'whatwg-fetch';
import config from '../config.js';

export default {
    async get(path, options) {
        // Use execute() default params
        return await this.execute(path, options || {});
    },

    async post(path, json, options) {
        // Default request options
        options = options || {};

        // Set POST request options
        options.method = 'POST';
        options.body = JSON.stringify(json);

        // We're sending JSON
        options.headers = {
            'Content-Type': 'application/json'
        };

        // Execute the request
        return await this.execute(path, options);
    },

    async execute(path, options) {
        // Build full URL to API endpoint
        var url = `${await this.getApiHost()}${path}`;

        // Execute HTTP request with fetch()
        let response = await fetch(url, options);

        // Invalid status code?
        if (response.status < 200 || response.status > 299) {
            // Convert response to JSON
            let json = await response.json();

            // Build error message
            let error = json.error || 'An unknown error occurred';

            // Throw detailed error
            throw { status: response.status, message: error };
        }

        // Convert response to JSON
        return await response.json();
    },

    async getApiHost() {
        // // Development API endpoint for localhost
        // if (window.location.hostname === 'localhost') {
        //     return config.api.devEndpoint;
        // }

        // Attempt to fetch proxy endpoint hostname (may be null)
        let proxyEndpoint = await localstorage.get(config.localStorageKeys.proxyEndpoint);

        // Proxy endpoint configured?
        if (proxyEndpoint) {
            return 'https://' + proxyEndpoint;
        }

        // Attempt to fetch Pushy Enterprise hostname (may be null)
        let enterpriseEndpoint = await localstorage.get(config.localStorageKeys.enterpriseEndpoint);

        // Return Pushy Enterprise endpoint, or fallback to Pushy Pro API endpoint
        return enterpriseEndpoint || config.api.endpoint;
    }
}



export const localstorage = {
  // WebExtensions do not have access to localStorage, so this helper abstracts
  // browser.storage and localStorage

  get: async (key) => {
    const browser = self.browser || self.chrome;

    if (browser && 'storage' in browser && 'local' in browser.storage) {
      const result = await browser.storage.local.get(key);
      return result[key];
    } else {
      return localStorage.getItem(key);
    }
  },

  set: async (key, value) => {
    const browser = self.browser || self.chrome;

    if (browser && 'storage' in browser && 'local' in browser.storage) {
      const obj = {}
      obj[key] = value;
      const result = await browser.storage.local.set(obj);
      return result[key];
    } else {
      return localStorage.setItem(key, value);
    }
  },

  remove: async (key) => {
    const browser = self.browser || self.chrome;

    if (browser && 'storage' in browser && 'local' in browser.storage) {
      return await browser.storage.local.remove(key);
    } else {
      return localStorage.remove(key);
    }
  },

  supported: async () => {
    const localStorage = 'localStorage' in self;
    // Chrome uses chrome.* as the namespace, Firefox and Safari use browser.*
    const webExtensionNamespace = 'browser' in self ? 'browser' : 'chrome' in self ? 'chrome' : undefined
    const webExtensionStorage = webExtensionNamespace in self && 'storage' in self[webExtensionNamespace] && 'local' in self[webExtensionNamespace].storage;

    return localStorage || webExtensionStorage;
  }
};
