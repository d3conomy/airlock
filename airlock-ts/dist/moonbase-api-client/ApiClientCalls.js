import { ApiClient } from "./ApiClient.js";
import { AddJsonCommandArgs, DeletePodRequest, DeletePodResponse, DeployPodRequest, DeployPodResponse, DialCommandArgs, GetJsonCommandArgs, GetPodInfoRequest, GetPodInfoResponse, PingRequest, PingResponse, PodCommandRequest, PodCommandResponse, PodCommands, PodsRequest, PodsResponse, RestartPodRequest, StartPodRequest, StartPodResponse, StopPodRequest } from "./MoonbaseApiClasses.js";
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
    async deletePod(podId) {
        const request = new DeletePodRequest(this.moonbaseServerUrl, podId);
        const response = await this.makeRequest(request);
        return new DeletePodResponse(response);
    }
    async startPod(podId, component) {
        const request = new StartPodRequest(this.moonbaseServerUrl, podId, component);
        const response = await this.makeRequest(request);
        return new StartPodResponse(response);
    }
    async stopPod(podId, component) {
        const request = new StopPodRequest(this.moonbaseServerUrl, podId, component);
        const response = await this.makeRequest(request);
        return new StartPodResponse(response);
    }
    async restartPod(podId, component) {
        const request = new RestartPodRequest(this.moonbaseServerUrl, podId, component);
        const response = await this.makeRequest(request);
        return new StartPodResponse(response);
    }
    async podInfo(podId, info) {
        const request = new GetPodInfoRequest(this.moonbaseServerUrl, podId, info);
        const response = await this.makeRequest(request);
        return new GetPodInfoResponse(response);
    }
    async podCommand(podId, command, args) {
        const request = new PodCommandRequest(this.moonbaseServerUrl, podId, command, args);
        const response = await this.makeRequest(request);
        return new PodCommandResponse(response);
    }
    async podDial(podId, multiAddr) {
        const request = new PodCommandRequest(this.moonbaseServerUrl, podId, PodCommands.Dial, new DialCommandArgs({ address: multiAddr }));
        const response = await this.makeRequest(request);
        return new PodCommandResponse(response);
    }
    async addJsonToIpfs(podId, jsonData) {
        const request = new PodCommandRequest(this.moonbaseServerUrl, podId, PodCommands.AddJson, new AddJsonCommandArgs(jsonData));
        const response = await this.makeRequest(request);
        return new PodCommandResponse(response);
    }
    async getJsonFromIpfs(podId, cid) {
        const request = new PodCommandRequest(this.moonbaseServerUrl, podId, PodCommands.GetJson, new GetJsonCommandArgs(cid));
        const response = await this.makeRequest(request);
        return new PodCommandResponse(response);
    }
}
export { ApiClientCalls };
