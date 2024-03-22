import {
    MoonbaseId
} from '../id-reference-factory/index.js';
import { ApiClientCalls } from '../moonbase-api-client/ApiClientCalls.js';

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
        return this.apiClient.ping();
    }
}

export {
    MoonbaseServer
}