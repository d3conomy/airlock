class MoonbaseServerUrl {
    public protocol: string = 'http';
    public url: string = '0.0.0.0';
    public port: number = 4343;
    public path: string = 'api';
    public version: string = 'v0';

    public get fullUrl() {
        return `${this.protocol}://${this.url}:${this.port}/${this.path}/${this.version}`;
    }
}

export {
    MoonbaseServerUrl
}