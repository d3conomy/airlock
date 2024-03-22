import { ApiClient } from "./ApiClient.js";
import { MoonbaseServerUrl } from "../moonbase-servers/MoonbaseServerUrl.js";
import { DeployPodRequest, DeployPodResponse, MoonbaseResponse, PingRequest, PingResponse, PodsRequest, PodsResponse } from "./MoonbaseApiClasses.js";


class ApiClientCalls extends ApiClient {
    private readonly moonbaseServerUrl: MoonbaseServerUrl;

    constructor(
        moonbaseServerUrl: MoonbaseServerUrl
    ) {
        super();
        this.moonbaseServerUrl = moonbaseServerUrl
    }

    async ping(): Promise<PingResponse> {
        const request: any = new PingRequest(this.moonbaseServerUrl);
        const response = await this.makeRequest(request);
        return new PingResponse(response);
    }

    async pods(): Promise<PodsResponse> {
        const request: any = new PodsRequest(this.moonbaseServerUrl);
        const response = await this.makeRequest(request);
        return new PodsResponse(response);
    }

    async deployPod(podId?: string, component?: string): Promise<DeployPodResponse> {
        const request: any = new DeployPodRequest(this.moonbaseServerUrl, podId, component);
        const response = await this.makeRequest(request);
        return new DeployPodResponse(response)
    }


}

export {
    ApiClientCalls
}