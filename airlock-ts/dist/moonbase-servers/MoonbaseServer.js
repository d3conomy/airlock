import { ApiClientCalls } from '../moonbase-api-client/ApiClientCalls.js';
class MoonbaseServer {
    id;
    url;
    apiClient;
    constructor({ id, url }) {
        this.id = id;
        this.url = url;
        this.apiClient = new ApiClientCalls(this.url);
    }
    async ping() {
        return (await this.apiClient.ping()).message;
    }
    async pods() {
        return (await this.apiClient.pods()).pods;
    }
    async deployPod(podId, component) {
        const response = await this.apiClient.deployPod(podId, component);
        return {
            message: response.message,
            podId: response.podId,
            component: response.component
        };
    }
    async deletePod(podId) {
        const response = await this.apiClient.deletePod(podId);
        return {
            message: response.message,
            podId: response.podId
        };
    }
    async startPod(podId, component) {
        const response = await this.apiClient.startPod(podId, component);
        return {
            message: response.message,
            podId: response.podId,
            command: response.command,
            error: response?.error
        };
    }
    async stopPod(podId, component) {
        const response = await this.apiClient.stopPod(podId, component);
        return {
            message: response.message,
            podId: response.podId,
            command: response.command,
            error: response?.error
        };
    }
    async restartPod(podId, component) {
        const response = await this.apiClient.restartPod(podId, component);
        return {
            message: response.message,
            podId: response.podId,
            command: response.command,
            error: response?.error
        };
    }
    async getPodInfo(podId, info) {
        const response = await this.apiClient.podInfo(podId, info);
        return response.podInfo;
    }
    async addJsonToIpfs(podId, json) {
        const response = await this.apiClient.addJsonToIpfs(podId, json);
        return response.data.raw;
    }
    async getJsonFromIpfs(podId, hash) {
        const response = await this.apiClient.getJsonFromIpfs(podId, hash);
        return response.data.raw;
    }
    async dial(podId, multiaddr) {
        const response = await this.apiClient.podDial(podId, multiaddr);
        return response.data.raw;
    }
}
export { MoonbaseServer };
