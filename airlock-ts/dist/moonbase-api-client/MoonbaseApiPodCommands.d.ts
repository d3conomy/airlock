import { AxiosResponse } from 'axios';
import { MoonbaseServerUrl } from '../moonbase-servers';
import { MoonbaseRequest, MoonbaseResponse } from './MoonbaseApiClasses.js';
declare enum PodInfoTypes {
    Components = "components",
    PeerId = "peerId",
    MultiAddrs = "multiaddrs",
    Connections = "connections",
    Peers = "peers",
    Protocols = "protocols"
}
declare class GetPodInfoRequest extends MoonbaseRequest {
    constructor(baseUrl: MoonbaseServerUrl, podId: string, info?: PodInfoTypes);
}
declare class GetPodInfoResponse extends MoonbaseResponse {
    podInfo?: any;
    constructor(response: AxiosResponse);
}
interface IPodCommandArgs {
    address?: string;
    protocol?: string;
    cid?: string;
    jsonData?: any;
}
declare class PodCommandArgs implements IPodCommandArgs {
    address?: string;
    protocol?: string;
    cid?: string;
    jsonData?: any;
    constructor({ address, protocol, cid, jsonData }?: {
        address?: string;
        protocol?: string;
        cid?: string;
        jsonData?: any;
    });
}
declare class DialCommandArgs implements IPodCommandArgs {
    address?: string;
    protocol?: string;
    constructor({ address, protocol }: {
        address: string;
        protocol?: string;
    });
}
declare class AddJsonCommandArgs implements IPodCommandArgs {
    cid?: string;
    data?: {
        data: any;
    };
    constructor(jsonData: any);
}
declare class GetJsonCommandArgs implements IPodCommandArgs {
    cid?: string;
    constructor(cid: string);
}
declare enum PodCommands {
    AddJson = "addjson",
    GetJson = "getjson",
    Dial = "dial",
    Publish = "publish",
    Subscribe = "subscribe",
    Unsubscribe = "unsubscribe"
}
declare class PodCommandRequest extends MoonbaseRequest {
    constructor(baseUrl: MoonbaseServerUrl, podId: string, command: PodCommands, args?: IPodCommandArgs);
}
interface IPodCommandResponseData {
    message?: string;
    podId?: string;
    command?: string;
    error?: string;
    raw?: any;
}
declare class PodCommandResponseData implements IPodCommandResponseData {
    raw?: any;
    command?: string;
    args?: any;
    constructor(response: AxiosResponse);
}
declare class PodCommandResponse extends MoonbaseResponse {
    data: PodCommandResponseData;
    constructor(response: AxiosResponse);
}
export { PodCommands, PodCommandRequest, PodCommandResponse, AddJsonCommandArgs, GetJsonCommandArgs, DialCommandArgs, PodCommandArgs, PodInfoTypes, GetPodInfoRequest, GetPodInfoResponse };
