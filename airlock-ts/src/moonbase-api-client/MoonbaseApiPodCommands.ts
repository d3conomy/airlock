import { AxiosResponse } from 'axios'
import { MoonbaseServerUrl } from '../moonbase-servers';
import { MoonbaseRequest, MoonbaseResponse } from './MoonbaseApiClasses.js';


enum PodInfoTypes {
    Components = 'components',
    PeerId = 'peerId',
    MultiAddrs = 'multiaddrs',
    Connections = 'connections',
    Peers = 'peers',
    Protocols = 'protocols',
}

class GetPodInfoRequest extends MoonbaseRequest {
    constructor(
        baseUrl: MoonbaseServerUrl,
        podId: string,
        info?: PodInfoTypes
    ) {
        if (info && info !== PodInfoTypes.Components) {
            super({
                baseUrl: baseUrl,
                endpoint: `pod/${podId}?info=${info.toLocaleLowerCase()}`,
                method: 'GET'
            });
        } 
        else if (!info || info === PodInfoTypes.Components){
            super({
                baseUrl: baseUrl,
                endpoint: `pod/${podId}`,
                method: 'GET'
            });
        }
    }
}

class GetPodInfoResponse extends MoonbaseResponse {
    podInfo?: any;

    constructor(response: AxiosResponse) {
        super(response);

        if (response.status === 200) {
            this.podInfo = response.data;
        }
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

    constructor({
        address,
        protocol,
        cid,
        jsonData
    }: {
        address?: string,
        protocol?: string,
        cid?: string,
        jsonData?: any
    } = {}) {
        this.address = address;
        this.protocol = protocol;
        this.cid = cid;
        this.jsonData = jsonData;
    }
}

class DialCommandArgs implements IPodCommandArgs {
    address?: string;
    protocol?: string;

    constructor({
        address,
        protocol
    }: {
        address: string,
        protocol?: string
    }) {
        this.address = address;
        this.protocol = protocol;
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

enum PodCommands {
    AddJson = 'addjson',
    GetJson = 'getjson',
    Dial = 'dial',
    Publish = 'publish',
    Subscribe = 'subscribe',
    Unsubscribe = 'unsubscribe'
}

class PodCommandRequest extends MoonbaseRequest {
    constructor(
        baseUrl: MoonbaseServerUrl,
        podId: string,
        command: PodCommands,
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

class PodCommandResponseData implements IPodCommandResponseData {
    raw?: any;
    command?: string;
    args?: any

    constructor(response: AxiosResponse) {
        this.raw = response.data;
        this.command = response.data.command;
        this.args = response.data.args;
    }
}

class PodCommandResponse extends MoonbaseResponse {
    data: PodCommandResponseData;

    constructor(response: AxiosResponse) {
        super(response);

        this.data = new PodCommandResponseData(response);
    }
}


export {
    PodCommands,
    PodCommandRequest,
    PodCommandResponse,
    AddJsonCommandArgs,
    GetJsonCommandArgs,
    DialCommandArgs,
    PodCommandArgs,
    PodInfoTypes,
    GetPodInfoRequest,
    GetPodInfoResponse
}