import { MoonbaseRequest, MoonbaseResponse } from './MoonbaseApiClasses.js';
var PodInfoTypes;
(function (PodInfoTypes) {
    PodInfoTypes["Components"] = "components";
    PodInfoTypes["PeerId"] = "peerId";
    PodInfoTypes["MultiAddrs"] = "multiaddrs";
    PodInfoTypes["Connections"] = "connections";
    PodInfoTypes["Peers"] = "peers";
    PodInfoTypes["Protocols"] = "protocols";
})(PodInfoTypes || (PodInfoTypes = {}));
class GetPodInfoRequest extends MoonbaseRequest {
    constructor(baseUrl, podId, info) {
        if (info && info !== PodInfoTypes.Components) {
            super({
                baseUrl: baseUrl,
                endpoint: `pod/${podId}?info=${info.toLocaleLowerCase()}`,
                method: 'GET'
            });
        }
        else if (!info || info === PodInfoTypes.Components) {
            super({
                baseUrl: baseUrl,
                endpoint: `pod/${podId}`,
                method: 'GET'
            });
        }
    }
}
class GetPodInfoResponse extends MoonbaseResponse {
    podInfo;
    constructor(response) {
        super(response);
        if (response.status === 200) {
            this.podInfo = response.data;
        }
    }
}
class PodCommandArgs {
    address;
    protocol;
    cid;
    jsonData;
    constructor({ address, protocol, cid, jsonData } = {}) {
        this.address = address;
        this.protocol = protocol;
        this.cid = cid;
        this.jsonData = jsonData;
    }
}
class DialCommandArgs {
    address;
    protocol;
    constructor({ address, protocol }) {
        this.address = address;
        this.protocol = protocol;
    }
}
class AddJsonCommandArgs {
    cid;
    data;
    constructor(jsonData) {
        if (!this.data) {
            this.data = {
                data: {}
            };
        }
        this.data.data = jsonData;
    }
}
class GetJsonCommandArgs {
    cid;
    constructor(cid) {
        this.cid = cid;
    }
}
var PodCommands;
(function (PodCommands) {
    PodCommands["AddJson"] = "addjson";
    PodCommands["GetJson"] = "getjson";
    PodCommands["Dial"] = "dial";
    PodCommands["Publish"] = "publish";
    PodCommands["Subscribe"] = "subscribe";
    PodCommands["Unsubscribe"] = "unsubscribe";
})(PodCommands || (PodCommands = {}));
class PodCommandRequest extends MoonbaseRequest {
    constructor(baseUrl, podId, command, args) {
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
class PodCommandResponseData {
    raw;
    command;
    args;
    constructor(response) {
        this.raw = response.data;
        this.command = response.data.command;
        this.args = response.data.args;
    }
}
class PodCommandResponse extends MoonbaseResponse {
    data;
    constructor(response) {
        super(response);
        this.data = new PodCommandResponseData(response);
    }
}
export { PodCommands, PodCommandRequest, PodCommandResponse, AddJsonCommandArgs, GetJsonCommandArgs, DialCommandArgs, PodCommandArgs, PodInfoTypes, GetPodInfoRequest, GetPodInfoResponse };
