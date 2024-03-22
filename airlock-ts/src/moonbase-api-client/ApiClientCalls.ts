import { ApiClient } from "./ApiClient.js";
import { MoonbaseServerUrl } from "../moonbase-servers/MoonbaseServerUrl.js";
import { AddJsonCommandArgs, DeletePodRequest, DeletePodResponse, DeployPodRequest, DeployPodResponse, GetJsonCommandArgs, MoonbaseResponse, PingRequest, PingResponse, PodCommandArgs, PodCommandRequest, PodCommandResponse, PodsRequest, PodsResponse, StartPodRequest, StartPodResponse, StopPodRequest } from "./MoonbaseApiClasses.js";


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

    async deletePod(podId: string): Promise<DeletePodResponse> {
        const request: any = new DeletePodRequest(this.moonbaseServerUrl, podId);
        const response = await this.makeRequest(request);
        return new DeletePodResponse(response)
    }

    async startPod(podId: string, component?: string): Promise<StartPodResponse> {
        const request: any = new StartPodRequest(this.moonbaseServerUrl, podId, component);
        const response = await this.makeRequest(request);
        return new StartPodResponse(response)
    }

    async stopPod(podId: string, component?: string): Promise<StartPodResponse> {
        const request: any = new StopPodRequest(this.moonbaseServerUrl, podId, component);
        const response = await this.makeRequest(request);
        return new StartPodResponse(response)
    }

    // async restartPod(podId: string, component?: string): Promise<StartPodResponse> {
    //     const request: any = new StopPodRequest(this.moonbaseServerUrl, podId, component);
    //     const response = await this.makeRequest(request);
    //     return new StartPodResponse(response)
    // }

    async podCommand(podId: string, command: string, args: PodCommandArgs): Promise<StartPodResponse> {
        const request: any = new PodCommandRequest(
            this.moonbaseServerUrl,
            podId,
            command
        );
        const response = await this.makeRequest(request);
        return new StartPodResponse(response)
    }

    async addJsonToIpfs(podId: string, jsonData: any): Promise<any> {
        const request: any = new PodCommandRequest(
            this.moonbaseServerUrl,
            podId,
            'addjson',
            new AddJsonCommandArgs(jsonData)
        );
        const response = await this.makeRequest(request);
        return new PodCommandResponse(response);
    }

    async getJsonFromIpfs(podId: string, cid: string): Promise<any> {
        const request: any = new PodCommandRequest(
            this.moonbaseServerUrl,
            podId,
            'getjson',
            new GetJsonCommandArgs(cid)
        );
        const response = await this.makeRequest(request);
        return new PodCommandResponse(response);
    }

}

export {
    ApiClientCalls
}