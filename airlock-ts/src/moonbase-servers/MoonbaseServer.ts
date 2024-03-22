import {
    MoonbaseId
} from '../id-reference-factory/index.js';
import { ApiClientCalls } from '../moonbase-api-client/ApiClientCalls.js';
import { DeletePodResponse, DeployPodResponse, StartPodResponse } from '../moonbase-api-client/MoonbaseApiClasses.js';

import {
    IMoonbaseServer
} from './MoonbaseServerInterfaces';
import { MoonbaseServerUrl } from './MoonbaseServerUrl.js';

class MoonbaseServer implements IMoonbaseServer {
    id: MoonbaseId;
    url: MoonbaseServerUrl;
    apiClient: ApiClientCalls;

    constructor({
        id,
        url
    }: {
        id: MoonbaseId,
        url: MoonbaseServerUrl
    }) {
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

    async deployPod(podId?: string, component?: string) {
        const response: DeployPodResponse = await this.apiClient.deployPod(podId, component);
        return {
            message: response.message,
            podId: response.podId,
            component: response.component
        }
    }

    async deletePod(podId: string) {
        const response: DeletePodResponse = await this.apiClient.deletePod(podId);
        return {
            message: response.message,
            podId: response.podId
        }
    }

    async startPod(podId: string, component?: string) {
        const response: StartPodResponse = await this.apiClient.startPod(podId, component);
        return {
            message: response.message,
            podId: response.podId,
            command: response.command,
            error: response?.error
        }
    }

    async stopPod(podId: string, component?: string) {
        const response: StartPodResponse = await this.apiClient.stopPod(podId, component);
        return {
            message: response.message,
            podId: response.podId,
            command: response.command,
            error: response?.error
        }
    }

    async addJsonToIpfs(podId: string, json: any) {
        const response = await this.apiClient.addJsonToIpfs(podId, json);
        return response.data.raw;
    }

    async getJsonFromIpfs(podId: string, hash: string) {
        const response = await this.apiClient.getJsonFromIpfs(podId, hash);
        return response.data.raw;
    }

}

export {
    MoonbaseServer
}