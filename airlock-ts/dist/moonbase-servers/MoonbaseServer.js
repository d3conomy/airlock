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
        return this.apiClient.ping();
    }
}
export { MoonbaseServer };
