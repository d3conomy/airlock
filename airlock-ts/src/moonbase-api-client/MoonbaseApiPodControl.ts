import { AxiosResponse } from 'axios'
import { MoonbaseServerUrl } from '../moonbase-servers';
import { MoonbaseRequest, MoonbaseResponse } from './MoonbaseApiClasses.js';



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
    constructor(
        baseUrl: MoonbaseServerUrl,
        podId?: string,
        component?: string
    ) {
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

class DeletePodRequest extends MoonbaseRequest {
    constructor(baseUrl: MoonbaseServerUrl, podId: string) {
        super({
            baseUrl: baseUrl,
            endpoint: `pods`,
            method: 'DELETE',
            data: {
                id: podId
            }
        });
    }
}

class DeletePodResponse extends MoonbaseResponse {
    message?: string;
    podId?: string;

    constructor(response: AxiosResponse) {
        super(response);

        if (response.status === 200) {
            this.message = response.data.message;
            this.podId = response.data.nodeId;
        }
    }
}

class StartPodRequest extends MoonbaseRequest {
    constructor(
        baseUrl: MoonbaseServerUrl,
        podId: string,
        component?: string
    ) {
        super({
            baseUrl: baseUrl,
            endpoint: `pod/${podId}`,
            method: 'PUT',
            data: {
                state: "start",
                args: {
                    component: component ? component : 'orbitdb' 
                }
            }
        });
    }
}

class StartPodResponse extends MoonbaseResponse {
    message?: string;
    podId?: string;
    command?: string;
    error?: string;

    constructor(response: AxiosResponse) {
        super(response);

        if (response.status === 200) {
            this.message = response.data.message;
            this.podId = response.data.podId;
            this.command = response.data.command;
            this.error = response.data.error;
        }

        if (response.status === 404) {
            this.message = response.data.message;
            this.podId = response.data.podId;
        }
    }
}

class StopPodRequest extends MoonbaseRequest {
    constructor(
        baseUrl: MoonbaseServerUrl,
        podId: string,
        component?: string
    ) {
        super({
            baseUrl: baseUrl,
            endpoint: `pod/${podId}`,
            method: 'PUT',
            data: {
                state: "stop",
                args: {
                    component: component ? component : 'orbitdb' 
                }
            }
        });
    }
}

class RestartPodRequest extends MoonbaseRequest {
    constructor(
        baseUrl: MoonbaseServerUrl,
        podId: string,
        component?: string
    ) {
        super({
            baseUrl: baseUrl,
            endpoint: `pod/${podId}`,
            method: 'PUT',
            data: {
                state: "restart",
                args: {
                    component: component ? component : 'orbitdb' 
                }
            }
        });
    }
}

export {
    PodsRequest,
    PodsResponse,
    DeployPodRequest,
    DeployPodResponse,
    DeletePodRequest,
    DeletePodResponse,
    StartPodRequest,
    StartPodResponse,
    StopPodRequest,
    RestartPodRequest,
}