declare module 'pushy-sdk-web' {
    export function register(params: { appId: string }): Promise<string>;
    export function setNotificationListener(callback: (data: any) => void): void;
    export function removeNotificationListener(): void;
    export function subscribe(topics: string | string[]): Promise<void>;
    export function unsubscribe(topics: string | string[]): Promise<void>;
    export function isRegistered(): boolean;
    export function validateDeviceCredentials(): Promise<void>;
    export function isEnterpriseConfigured(): boolean;
    export function setEnterpriseConfig(endpoint: string): void;
    export function setProxyEndpoint(endpoint: string): void;
}