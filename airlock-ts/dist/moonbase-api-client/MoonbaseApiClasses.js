class MoonbaseRequest {
    url;
    params;
    method;
    data;
    headers;
    auth;
    constructor({ baseUrl, endpoint, data, headers, auth, params, method }) {
        this.url = `${baseUrl.fullUrl}/${endpoint}`;
        this.data = data;
        this.headers = headers;
        this.auth = auth;
        this.params = params;
        this.method = method;
    }
}
class MoonbaseResponse {
    data;
    status = 400;
    statusText = 'Bad Request';
    headers;
    config;
    constructor(response) {
        this.data = response.data;
        this.status = response.status;
        this.statusText = response.statusText;
        this.headers = response.headers;
        this.config = response.config;
    }
}
class PingRequest extends MoonbaseRequest {
    constructor(baseUrl) {
        super({
            baseUrl: baseUrl,
            endpoint: 'ping',
            method: 'GET'
        });
    }
}
class PingResponse extends MoonbaseResponse {
    message;
    constructor(response) {
        super(response);
        this.message = response.data;
    }
}
class PodsRequest extends MoonbaseRequest {
    constructor(baseUrl) {
        super({
            baseUrl: baseUrl,
            endpoint: 'pods',
            method: 'GET'
        });
    }
}
class PodsResponse extends MoonbaseResponse {
    pods;
    constructor(response) {
        super(response);
        this.pods = response.data;
    }
}
class DeployPodRequest extends MoonbaseRequest {
    constructor(baseUrl, podId, component) {
        super({
            baseUrl: baseUrl,
            endpoint: `pods`,
            method: 'POST',
            data: {
                id: podId,
                component: component
            }
        });
    }
}
class DeployPodResponse extends MoonbaseResponse {
    message;
    podId;
    component;
    constructor(response) {
        super(response);
        if (response.status === 200) {
            this.message = response.data.message;
            this.podId = response.data.podId;
            this.component = response.data.component;
        }
    }
}
export { MoonbaseResponse, MoonbaseRequest, PingRequest, PingResponse, PodsRequest, PodsResponse, DeployPodRequest, DeployPodResponse };
