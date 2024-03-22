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

class PingResponseData extends MoonbaseResponse {
    message: string;

    constructor({
        response
    }: {
        response: AxiosResponse
    }) {
        super(response);
        this.message = response.data;
    }
}

export {
    MoonbaseResponse,
    MoonbaseRequest,
    PingRequest,
    PingResponseData
}