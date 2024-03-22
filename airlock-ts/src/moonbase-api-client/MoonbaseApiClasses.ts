import { AxiosBasicCredentials, AxiosHeaders, AxiosRequestConfig, AxiosResponse } from 'axios'
import { MoonbaseServerUrl } from '../moonbase-servers';

class MoonbaseRequest implements AxiosRequestConfig{
    url?: string;
    params?: any;
    method?: string;
    data?: any;
    headers?: any
    auth?: AxiosBasicCredentials;

    constructor({
        baseUrl,
        endpoint,
        data,
        headers,
        auth,
        params,
        method
    } : {
        baseUrl: MoonbaseServerUrl,
        endpoint: string,
        data?: any,
        headers?: any,
        auth?: AxiosBasicCredentials,
        params?: any,
        method?: string
    }) {
        this.url = `${baseUrl.fullUrl}/${endpoint}`;
        this.data = data;
        this.headers = headers;
        this.auth = auth;
        this.params = params;
        this.method = method;
    }
}

class MoonbaseResponse implements AxiosResponse {
    data: any;
    status: number = 400;
    statusText: string = 'Bad Request';
    headers: any;
    config: any;

    constructor(response: AxiosResponse) {
        this.data = response.data;
        this.status = response.status;
        this.statusText = response.statusText;
        this.headers = response.headers;
        this.config = response.config;
    }
}

class PingRequest extends MoonbaseRequest {
    constructor(baseUrl: MoonbaseServerUrl) {
        super({
            baseUrl: baseUrl,
            endpoint: 'ping',
            method: 'GET'
        });
    }
}

class PingResponse extends MoonbaseResponse {
    message?: string;

    constructor(response: AxiosResponse) {
        super(response);
        this.message = response.data;
    }
}

class PodsRequest extends MoonbaseRequest {
    constructor(baseUrl: MoonbaseServerUrl) {
        super({
            baseUrl: baseUrl,
            endpoint: 'pods',
            method: 'GET'
        });
    }
}

class PodsResponse extends MoonbaseResponse {
    pods?: any[];

    constructor(response: AxiosResponse) {
        super(response);
        this.pods = response.data;
    }
}

class DeployPodRequest extends MoonbaseRequest {
    constructor(baseUrl: MoonbaseServerUrl, podId?: string, component?: string) {
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
    message?: string;
    podId?: string;
    component?: string;

    constructor(response: AxiosResponse) {
        super(response);

        if (response.status === 200) {
            this.message = response.data.message;
            this.podId = response.data.podId;
            this.component = response.data.component;
        }
    }
}

export {
    MoonbaseResponse,
    MoonbaseRequest,
    PingRequest,
    PingResponse,
    PodsRequest,
    PodsResponse,
    DeployPodRequest,
    DeployPodResponse
}