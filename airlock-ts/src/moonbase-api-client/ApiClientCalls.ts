import { ApiClient } from "./ApiClient.js";
import { MoonbaseServerUrl } from "../moonbase-servers/MoonbaseServerUrl.js";
import { PingRequest, PingResponseData } from "./MoonbaseApiClasses.js";


class ApiClientCalls extends ApiClient {
    private readonly moonbaseServerUrl: MoonbaseServerUrl;

    constructor(
        moonbaseServerUrl: MoonbaseServerUrl
    ) {
        super();
        this.moonbaseServerUrl = moonbaseServerUrl
    }

    async ping(): Promise<PingResponseData> {
        const request: any = new PingRequest(this.moonbaseServerUrl);
        const response = await this.makeRequest(request);
        return new PingResponseData({response});
    }

}

export {
    ApiClientCalls
}