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
class DeletePodRequest extends MoonbaseRequest {
    constructor(baseUrl, podId) {
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
    message;
    podId;
    constructor(response) {
        super(response);
        if (response.status === 200) {
            this.message = response.data.message;
            this.podId = response.data.nodeId;
        }
    }
}
class StartPodRequest extends MoonbaseRequest {
    constructor(baseUrl, podId, component) {
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
    message;
    podId;
    command;
    error;
    constructor(response) {
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
    constructor(baseUrl, podId, component) {
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
    constructor(baseUrl, podId, component) {
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
    constructor(args) {
        this.address = args.address;
        this.protocol = args.protocol;
        this.cid = args.cid;
        this.jsonData = args.jsonData;
    }
}
class DialCommandArgs {
    address;
    protocol;
    constructor(args) {
        this.address = args.address;
        this.protocol = args.protocol;
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
class CommandResponseData {
    raw;
    constructor(response) {
        this.raw = response.data;
    }
}
class PodCommandResponse extends MoonbaseResponse {
    constructor(response) {
        super(response);
        this.data = new CommandResponseData(response);
    }
}
export { MoonbaseResponse, MoonbaseRequest, PingRequest, PingResponse, PodsRequest, PodsResponse, DeployPodRequest, DeployPodResponse, DeletePodRequest, DeletePodResponse, StartPodRequest, StartPodResponse, StopPodRequest, RestartPodRequest, PodCommandRequest, PodCommandResponse, AddJsonCommandArgs, GetJsonCommandArgs, DialCommandArgs, PodCommandArgs, PodInfoTypes, GetPodInfoRequest, GetPodInfoResponse };
