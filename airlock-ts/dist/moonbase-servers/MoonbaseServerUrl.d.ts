declare class MoonbaseServerUrl {
    protocol: string;
    url: string;
    port: number;
    path: string;
    version: string;
    constructor({ stringUrl, protocol, url, port, path, version }: {
        stringUrl?: string;
        protocol?: string;
        url?: string;
        port?: number;
        path?: string;
        version?: string;
    });
    get fullUrl(): string;
}
export { MoonbaseServerUrl };
