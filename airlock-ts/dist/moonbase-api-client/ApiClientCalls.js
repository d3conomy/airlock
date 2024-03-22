import { ApiClient } from "./ApiClient.js";
import { DeployPodRequest, DeployPodResponse, PingRequest, PingResponse, PodsRequest, PodsResponse } from "./MoonbaseApiClasses.js";
class ApiClientCalls extends ApiClient {
    moonbaseServerUrl;
    constructor(moonbaseServerUrl) {
        super();
        this.moonbaseServerUrl = moonbaseServerUrl;
    }
    async ping() {
        const request = new PingRequest(this.moonbaseServerUrl);
        const response = await this.makeRequest(request);
        return new PingResponse(response);
    }
    async pods() {
        const request = new PodsRequest(this.moonbaseServerUrl);
        const response = await this.makeRequest(request);
        return new PodsResponse(response);
    }
    async deployPod(podId, component) {
        const request = new DeployPodRequest(this.moonbaseServerUrl, podId, component);
        const response = await this.makeRequest(request);
        return new DeployPodResponse(response);
    }
}
export { ApiClientCalls };
