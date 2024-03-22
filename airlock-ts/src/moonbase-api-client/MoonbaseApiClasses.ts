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
    constructor(baseUrl: MoonbaseServerUrl, podId: string, component?: string) {
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
    constructor(baseUrl: MoonbaseServerUrl, podId: string, component?: string) {
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

interface IPodCommandArgs {
    address?: string;
    protocol?: string;
    cid?: string;
    jsonData?: any;
}

class PodCommandArgs implements IPodCommandArgs {
    address?: string;
    protocol?: string;
    cid?: string;
    jsonData?: any;

    constructor(args: IPodCommandArgs) {
        this.address = args.address;
        this.protocol = args.protocol;
        this.cid = args.cid;
        this.jsonData = args.jsonData;
    }
}

class DialCommandArgs implements IPodCommandArgs {
    address?: string;
    protocol?: string;

    constructor(args: IPodCommandArgs) {
        this.address = args.address;
        this.protocol = args.protocol;
    }
}

class AddJsonCommandArgs implements IPodCommandArgs {
    cid?: string;
    data?: {
        data: any
    }

    constructor(jsonData: any) {
        if (!this.data) {
            this.data = {
                data: {}
            }
        }
        this.data.data = jsonData;
    }
}

class GetJsonCommandArgs implements IPodCommandArgs {
    cid?: string;

    constructor(cid: string) {
        this.cid = cid;
    }
}

class PodCommandRequest extends MoonbaseRequest {
    constructor(
        baseUrl: MoonbaseServerUrl,
        podId: string,
        command: string,
        args?: IPodCommandArgs
    ) {
        super({
            baseUrl: baseUrl,
            endpoint: `pod/${podId}`,
            method: 'POST',
            data: {
                command,
                args
            }
        });
    }
} 

interface IPodCommandResponseData {
    message?: string;
    podId?: string;
    command?: string;
    error?: string;
    raw?: any;
}

class CommandResponseData implements IPodCommandResponseData {
    raw?: any;

    constructor(response: AxiosResponse) {
        this.raw = response.data;
    }
}


class PodCommandResponse extends MoonbaseResponse {
    constructor(response: AxiosResponse) {
        super(response);

        this.data = new CommandResponseData(response);
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
    DeployPodResponse,
    DeletePodRequest,
    DeletePodResponse,
    StartPodRequest,
    StartPodResponse,
    StopPodRequest,
    PodCommandRequest,
    PodCommandResponse,
    AddJsonCommandArgs,
    GetJsonCommandArgs,
    DialCommandArgs,
    PodCommandArgs
}