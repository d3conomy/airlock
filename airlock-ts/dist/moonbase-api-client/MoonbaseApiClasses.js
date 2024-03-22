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
class PingResponseData extends MoonbaseResponse {
    message;
    constructor({ response }) {
        super(response);
        this.message = response.data;
    }
}
export { MoonbaseResponse, MoonbaseRequest, PingRequest, PingResponseData };
