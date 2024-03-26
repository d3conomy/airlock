import { MoonbaseId } from '../id-reference-factory/index.js';
import { ApiClientCalls } from '../moonbase-api-client/MoonbaseApiClientCalls.js';
import { AddRecordResponse, DatabaseTypes, PodCommandResponse, PodInfoTypes } from '../moonbase-api-client/index.js';
import { IMoonbaseServer } from './MoonbaseServerInterfaces.js';
import { MoonbaseServerUrl } from './MoonbaseServerUrl.js';
declare class MoonbaseServer implements IMoonbaseServer {
    id: MoonbaseId;
    url: MoonbaseServerUrl;
    apiClient: ApiClientCalls;
    constructor({ id, url }: {
        id: MoonbaseId;
        url: MoonbaseServerUrl;
    });
    ping(): Promise<string | undefined>;
    logs(): Promise<string[]>;
    pods(): Promise<any[] | undefined>;
    deployPod(podId?: string, component?: string): Promise<{
        message: string | undefined;
        podId: string | undefined;
        component: string | undefined;
    }>;
    deletePod(podId: string): Promise<{
        message: string | undefined;
        podId: string | undefined;
    }>;
    startPod(podId: string, component?: string): Promise<{
        message: string | undefined;
        podId: string | undefined;
        command: string | undefined;
        error: string | undefined;
    }>;
    stopPod(podId: string, component?: string): Promise<{
        message: string | undefined;
        podId: string | undefined;
        command: string | undefined;
        error: string | undefined;
    }>;
    restartPod(podId: string, component?: string): Promise<{
        message: string | undefined;
        podId: string | undefined;
        command: string | undefined;
        error: string | undefined;
    }>;
    getPodInfo(podId: string, info: PodInfoTypes): Promise<any>;
    addJsonToIpfs(podId: string, json: any): Promise<any>;
    getJsonFromIpfs(podId: string, hash: string): Promise<any>;
    dial(podId: string, multiaddr: string): Promise<any>;
    openDatabase(dbName: string, dbType?: DatabaseTypes): Promise<{
        id: string | undefined;
        type: string | undefined;
        address: string | undefined;
    }>;
    closeDatabase(dbName: string): Promise<PodCommandResponse>;
    addRecordToDatabase(dbName: string, key: string, value: any): Promise<string | AddRecordResponse | undefined>;
    getRecordFromDatabase(dbName: string, key: string): Promise<any>;
    putRecordToDatabase(dbName: string, key: string, value: any): Promise<any>;
    deleteRecordFromDatabase(dbName: string, key: string): Promise<AddRecordResponse>;
}
export { MoonbaseServer };
