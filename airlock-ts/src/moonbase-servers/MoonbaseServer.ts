import {
    MoonbaseId
} from '../id-reference-factory/index.js';
import { ApiClientCalls } from '../moonbase-api-client/ApiClientCalls.js';
import { DeployPodResponse } from '../moonbase-api-client/MoonbaseApiClasses.js';

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
}

export {
    MoonbaseServer
}