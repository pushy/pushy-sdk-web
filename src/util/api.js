import 'whatwg-fetch';
import config from '../config';

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
        var url = this.getApiHost() + path;

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

    getApiHost() {
        // // Development API endpoint for localhost
        // if (window.location.hostname === 'localhost') {
        //     return config.api.devEndpoint;
        // }
        
        // Attempt to fetch proxy endpoint hostname (may be null)
        let proxyEndpoint = localStorage.getItem(config.localStorageKeys.proxyEndpoint);

        // Proxy endpoint configured?
        if (proxyEndpoint) {
            return 'https://' + proxyEndpoint;
        }

        // Attempt to fetch Pushy Enterprise hostname (may be null)
        let enterpriseEndpoint = localStorage.getItem(config.localStorageKeys.enterpriseEndpoint);

        // Return Pushy Enterprise endpoint, or fallback to Pushy Pro API endpoint
        return enterpriseEndpoint || config.api.endpoint;
    }
}