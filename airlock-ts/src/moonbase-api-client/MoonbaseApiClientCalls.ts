import { ApiClient } from "./ApiClient.js";
import { MoonbaseServerUrl } from "../moonbase-servers/MoonbaseServerUrl.js";
import {
    PingRequest,
    PingResponse
} from "./MoonbaseApiClasses.js";

import {
    LogsRequest,
    LogBookResponse,
} from "./MoonbaseApiLog.js";

import {
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
} from "./MoonbaseApiPodControl.js";

import {
    GetPodInfoRequest,
    GetPodInfoResponse,
    PodInfoTypes,
    PodCommands,
    PodCommandArgs,
    PodCommandRequest,
    PodCommandResponse,
    DialCommandArgs,
    AddJsonCommandArgs,
    GetJsonCommandArgs
} from "./MoonbaseApiPodCommands.js";

import {
    GetOpenDatabasesRequest,
    GetOpenDatabasesResponse,
    OpenDatabaseRequest,
    OpenDatabaseResponse,
    GetDatabaseInfoRequest,
    GetDatabaseInfoResponse,
    DatabaseCommands,
    DatabaseTypes,
    DeleteRecordRequest,
    DeleteRecordRequestData,
    AddRecordRequest,
    AddRecordResponse,
    GetRecordRequestData,
    AddRecordRequestData,
    DatabaseRecord,
    GetRecordResponse,
    CloseDatabaseRequest,
    PutRecordResponse,
    PutRecordRequest,
    PutRecordRequestData,
} from "./MoonbaseApiDatabase.js";


class ApiClientCalls extends ApiClient {
    private readonly moonbaseServerUrl: MoonbaseServerUrl;

    constructor(
        moonbaseServerUrl: MoonbaseServerUrl
    ) {
        super();
        this.moonbaseServerUrl = moonbaseServerUrl
    }

    async ping(): Promise<PingResponse> {
        const request: any = new PingRequest(this.moonbaseServerUrl);
        const response = await this.makeRequest(request);
        return new PingResponse(response);
    }

    async logs(): Promise<LogBookResponse> {
        const request: any = new LogsRequest(this.moonbaseServerUrl);
        const response = await this.makeRequest(request);
        return new LogBookResponse(response);
    }

    async pods(): Promise<PodsResponse> {
        const request: any = new PodsRequest(this.moonbaseServerUrl);
        const response = await this.makeRequest(request);
        return new PodsResponse(response);
    }

    async deployPod(podId?: string,
        component?: string
    ): Promise<DeployPodResponse> {
        const request: any = new DeployPodRequest(
            this.moonbaseServerUrl,
            podId,
            component
        );
        const response = await this.makeRequest(request);
        return new DeployPodResponse(response)
    }

    async deletePod(podId: string): Promise<DeletePodResponse> {
        const request: any = new DeletePodRequest(
            this.moonbaseServerUrl,
            podId
        );
        const response = await this.makeRequest(request);
        return new DeletePodResponse(response)
    }

    async startPod(
        podId: string,
        component?: string
    ): Promise<StartPodResponse> {
        const request: any = new StartPodRequest(
            this.moonbaseServerUrl,
            podId,
            component
        );
        const response = await this.makeRequest(request);
        return new StartPodResponse(response)
    }

    async stopPod(
        podId: string,
        component?: string
    ): Promise<StartPodResponse> {
        const request: any = new StopPodRequest(
            this.moonbaseServerUrl,
            podId,
            component
        );
        const response = await this.makeRequest(request);
        return new StartPodResponse(response)
    }

    async restartPod(
        podId: string,
        component?: string
    ): Promise<StartPodResponse> {
        const request: any = new RestartPodRequest(
            this.moonbaseServerUrl,
            podId,
            component
        );
        const response = await this.makeRequest(request);
        return new StartPodResponse(response)
    }

    async podInfo(
        podId: string,
        info: PodInfoTypes
    ): Promise<GetPodInfoResponse> {
        const request: any = new GetPodInfoRequest(
            this.moonbaseServerUrl,
            podId,
            info
        );
        const response = await this.makeRequest(request);
        return new GetPodInfoResponse(response);
    }

    async podCommand(
        podId: string,
        command: PodCommands,
        args: PodCommandArgs
    ): Promise<PodCommandResponse> {
        const request: any = new PodCommandRequest(
            this.moonbaseServerUrl,
            podId,
            command,
            args
        );
        const response = await this.makeRequest(request);
        return new PodCommandResponse(response)
    }

    async podDial(
        podId: string,
        multiAddr: string
    ): Promise<PodCommandResponse> {
        const request: any = new PodCommandRequest(
            this.moonbaseServerUrl,
            podId,
            PodCommands.Dial,
            new DialCommandArgs({address: multiAddr})
        );
        const response = await this.makeRequest(request);
        return new PodCommandResponse(response)
    }

    async addJsonToIpfs(
        podId: string,
        jsonData: any
    ): Promise<PodCommandResponse> {
        const request: any = new PodCommandRequest(
            this.moonbaseServerUrl,
            podId,
            PodCommands.AddJson,
            new AddJsonCommandArgs(jsonData)
        );
        const response = await this.makeRequest(request);
        return new PodCommandResponse(response);
    }

    async getJsonFromIpfs(
        podId: string, 
        cid: string
    ): Promise<PodCommandResponse> {
        const request: any = new PodCommandRequest(
            this.moonbaseServerUrl,
            podId,
            PodCommands.GetJson,
            new GetJsonCommandArgs(cid)
        );
        const response = await this.makeRequest(request);
        return new PodCommandResponse(response);
    }

    async openDatabase(
        dbName: string,
        dbType: DatabaseTypes
    ): Promise<OpenDatabaseResponse> {
        const request: any = new OpenDatabaseRequest(
            this.moonbaseServerUrl,
            dbName,
            dbType
        );
        const response = await this.makeRequest(request);
        return new OpenDatabaseResponse(response);
    }

    async closeDatabase(
        dbName: string
    ): Promise<PodCommandResponse> {
        const request: any = new CloseDatabaseRequest(
            this.moonbaseServerUrl,
            dbName
        );
        const response = await this.makeRequest(request);
        return new PodCommandResponse(response);
    }

    async getDatabaseInfo(
        dbName: string
    ): Promise<GetDatabaseInfoResponse> {
        const request: any = new GetDatabaseInfoRequest(
            this.moonbaseServerUrl,
            dbName
        );
        const response = await this.makeRequest(request);
        return new GetDatabaseInfoResponse(response);
    }

    async addRecord(
        dbName: string,
        key?: string,
        value?: any
    ): Promise<AddRecordResponse> {
        const request: any = new AddRecordRequest(
            this.moonbaseServerUrl,
            dbName,
            new AddRecordRequestData(
                new DatabaseRecord({
                    key: key,
                    value: value
                })
            )
        );
        const response = await this.makeRequest(request);
        return new AddRecordResponse(response);
    }

    async putRecord(
        dbName: string,
        key?: string,
        value?: any
    ): Promise<PutRecordResponse> {
    
        const request: any = new PutRecordRequest(
            this.moonbaseServerUrl,
            dbName,
            new PutRecordRequestData({
                key: key,
                value: value
            })
        );
        const response = await this.makeRequest(request);
        return new PutRecordResponse(response);
    }

    async getRecord(
        dbId: string,
        key?: string,
        cid?: string
    ): Promise<GetRecordResponse> {
        const request: any = new AddRecordRequest(
            this.moonbaseServerUrl,
            dbId,
            new GetRecordRequestData({
                key: key,
                cid: cid
        })
        );
        const response = await this.makeRequest(request);
        return new AddRecordResponse(response);
    }

    async deleteRecord(
        dbId: string,
        key?: string
    ): Promise<PodCommandResponse> {
        const request: any = new DeleteRecordRequest(
            this.moonbaseServerUrl,
            dbId,
            new DeleteRecordRequestData({
                key: key
            })
        );
        const response = await this.makeRequest(request);
        return new PodCommandResponse(response);
    }

}

export {
    ApiClientCalls
}