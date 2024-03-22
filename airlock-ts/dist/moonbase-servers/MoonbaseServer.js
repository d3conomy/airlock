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
}
export { MoonbaseServer };
