import { ApiClient } from "./ApiClient.js";
import { PingRequest, PingResponseData } from "./MoonbaseApiClasses.js";
class ApiClientCalls extends ApiClient {
    moonbaseServerUrl;
    constructor(moonbaseServerUrl) {
        super();
        this.moonbaseServerUrl = moonbaseServerUrl;
    }
    async ping() {
        const request = new PingRequest(this.moonbaseServerUrl);
        const response = await this.makeRequest(request);
        return new PingResponseData({ response });
    }
}
export { ApiClientCalls };
