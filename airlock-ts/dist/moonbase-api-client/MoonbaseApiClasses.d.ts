import { AxiosBasicCredentials, AxiosRequestConfig, AxiosResponse } from 'axios';
import { MoonbaseServerUrl } from '../moonbase-servers';
declare class MoonbaseRequest implements AxiosRequestConfig {
    url?: string;
    params?: any;
    method?: string;
    data?: any;
    headers?: any;
    auth?: AxiosBasicCredentials;
    constructor({ baseUrl, endpoint, data, headers, auth, params, method }: {
        baseUrl: MoonbaseServerUrl;
        endpoint: string;
        data?: any;
        headers?: any;
        auth?: AxiosBasicCredentials;
        params?: any;
        method?: string;
    });
}
declare class MoonbaseResponse implements AxiosResponse {
    data: any;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    constructor(response: AxiosResponse);
}
declare class PingRequest extends MoonbaseRequest {
    constructor(baseUrl: MoonbaseServerUrl);
}
declare class PingResponse extends MoonbaseResponse {
    message?: string;
    constructor(response: AxiosResponse);
}
export { MoonbaseResponse, MoonbaseRequest, PingRequest, PingResponse };
