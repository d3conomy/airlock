class MoonbaseServerUrl {
    protocol = 'http';
    url = '0.0.0.0';
    port = 4343;
    path = 'api';
    version = 'v0';
    constructor({ stringUrl, protocol, url, port, path, version }) {
        if (stringUrl) {
            const urlParts = stringUrl.split('://');
            this.protocol = urlParts[0];
            const urlParts2 = urlParts[1].split(':');
            this.url = urlParts2[0];
            this.port = parseInt(urlParts2[1]);
            const urlParts3 = urlParts2[1].split('/');
            this.path = urlParts3[1];
            this.version = urlParts3[2];
        }
        else {
            if (protocol) {
                this.protocol = protocol;
            }
            if (url) {
                this.url = url;
            }
            if (port) {
                this.port = port;
            }
            if (path) {
                this.path = path;
            }
            if (version) {
                this.version = version;
            }
        }
    }
    get fullUrl() {
        return `${this.protocol}://${this.url}:${this.port}/${this.path}/${this.version}`;
    }
}
export { MoonbaseServerUrl };
