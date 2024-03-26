import { AxiosResponse } from 'axios';
import { MoonbaseServerUrl } from '../moonbase-servers';
import { MoonbaseRequest, MoonbaseResponse } from './MoonbaseApiClasses.js';
declare class PodsRequest extends MoonbaseRequest {
    constructor(baseUrl: MoonbaseServerUrl);
}
declare class PodsResponse extends MoonbaseResponse {
    pods?: any[];
    constructor(response: AxiosResponse);
}
declare class DeployPodRequest extends MoonbaseRequest {
    constructor(baseUrl: MoonbaseServerUrl, podId?: string, component?: string);
}
declare class DeployPodResponse extends MoonbaseResponse {
    message?: string;
    podId?: string;
    component?: string;
    constructor(response: AxiosResponse);
}
declare class DeletePodRequest extends MoonbaseRequest {
    constructor(baseUrl: MoonbaseServerUrl, podId: string);
}
declare class DeletePodResponse extends MoonbaseResponse {
    message?: string;
    podId?: string;
    constructor(response: AxiosResponse);
}
declare class StartPodRequest extends MoonbaseRequest {
    constructor(baseUrl: MoonbaseServerUrl, podId: string, component?: string);
}
declare class StartPodResponse extends MoonbaseResponse {
    message?: string;
    podId?: string;
    command?: string;
    error?: string;
    constructor(response: AxiosResponse);
}
declare class StopPodRequest extends MoonbaseRequest {
    constructor(baseUrl: MoonbaseServerUrl, podId: string, component?: string);
}
declare class RestartPodRequest extends MoonbaseRequest {
    constructor(baseUrl: MoonbaseServerUrl, podId: string, component?: string);
}
export { PodsRequest, PodsResponse, DeployPodRequest, DeployPodResponse, DeletePodRequest, DeletePodResponse, StartPodRequest, StartPodResponse, StopPodRequest, RestartPodRequest, };
