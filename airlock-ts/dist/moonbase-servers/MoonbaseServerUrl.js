class MoonbaseServerUrl {
    protocol = 'http';
    url = '0.0.0.0';
    port = 4343;
    path = 'api';
    version = 'v0';
    get fullUrl() {
        return `${this.protocol}://${this.url}:${this.port}/${this.path}/${this.version}`;
    }
}
export { MoonbaseServerUrl };
