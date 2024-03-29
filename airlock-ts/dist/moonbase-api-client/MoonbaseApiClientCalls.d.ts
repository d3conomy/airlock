import { ApiClient } from "./ApiClient.js";
import { MoonbaseServerUrl } from "../moonbase-servers/MoonbaseServerUrl.js";
import { PingResponse } from "./MoonbaseApiClasses.js";
import { LogBookResponse } from "./MoonbaseApiLog.js";
import { PodsResponse, DeployPodResponse, DeletePodResponse, StartPodResponse } from "./MoonbaseApiPodControl.js";
import { GetPodInfoResponse, PodInfoTypes, PodCommands, PodCommandArgs, PodCommandResponse } from "./MoonbaseApiPodCommands.js";
import { OpenDatabaseResponse, GetDatabaseInfoResponse, DatabaseTypes, AddRecordResponse, GetRecordResponse, PutRecordResponse } from "./MoonbaseApiDatabase.js";
declare class ApiClientCalls extends ApiClient {
    private readonly moonbaseServerUrl;
    constructor(moonbaseServerUrl: MoonbaseServerUrl);
    ping(): Promise<PingResponse>;
    logs(): Promise<LogBookResponse>;
    pods(): Promise<PodsResponse>;
    deployPod(podId?: string, component?: string): Promise<DeployPodResponse>;
    deletePod(podId: string): Promise<DeletePodResponse>;
    startPod(podId: string, component?: string): Promise<StartPodResponse>;
    stopPod(podId: string, component?: string): Promise<StartPodResponse>;
    restartPod(podId: string, component?: string): Promise<StartPodResponse>;
    podInfo(podId: string, info: PodInfoTypes): Promise<GetPodInfoResponse>;
    podCommand(podId: string, command: PodCommands, args: PodCommandArgs): Promise<PodCommandResponse>;
    podDial(podId: string, multiAddr: string): Promise<PodCommandResponse>;
    addJsonToIpfs(podId: string, jsonData: any): Promise<PodCommandResponse>;
    getJsonFromIpfs(podId: string, cid: string): Promise<PodCommandResponse>;
    openDatabase(dbName: string, dbType: DatabaseTypes): Promise<OpenDatabaseResponse>;
    closeDatabase(dbName: string): Promise<PodCommandResponse>;
    getDatabaseInfo(dbName: string): Promise<GetDatabaseInfoResponse>;
    addRecord(dbName: string, key?: string, value?: any): Promise<AddRecordResponse>;
    putRecord(dbName: string, key?: string, value?: any): Promise<PutRecordResponse>;
    getRecord(dbId: string, key?: string, cid?: string): Promise<GetRecordResponse>;
    deleteRecord(dbId: string, key?: string): Promise<PodCommandResponse>;
}
export { ApiClientCalls };
