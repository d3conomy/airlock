const moonbaseUrl = 'http://0.0.0.0:4343/api/v0';

class MoonbaseConfig {
    moonBaseUrl: string;

    constructor(
        moonBaseUrl: string = moonbaseUrl
    ) {
        this.moonBaseUrl = moonBaseUrl;
    }
}

export {
    MoonbaseConfig,
    moonbaseUrl
}