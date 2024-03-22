import {
    MoonbaseId
} from '../id-reference-factory/index.js';
import { ApiClientCalls } from '../moonbase-api-client/MoonbaseApiClientCalls.js';
import {
    AddRecordResponse,
    DatabaseTypes,
    DeletePodResponse,
    DeployPodResponse,
    GetPodInfoResponse,
    OpenDatabaseResponse,
    PodCommandResponse,
    PodInfoTypes,
    PutRecordResponse,
    StartPodResponse
} from '../moonbase-api-client/index.js';

import {
    IMoonbaseServer
} from './MoonbaseServerInterfaces.js';
import { MoonbaseServerUrl } from './MoonbaseServerUrl.js';

class MoonbaseServer implements IMoonbaseServer {
    id: MoonbaseId;
    url: MoonbaseServerUrl;
    apiClient: ApiClientCalls;

    constructor({
        id,
        url
    }: {
        id: MoonbaseId,
        url: MoonbaseServerUrl
    }) {
        this.id = id;
        this.url = url;
        this.apiClient = new ApiClientCalls(this.url);
    }

    async ping() {
        return (await this.apiClient.ping()).message;
    }

    async logs() {
        return (await this.apiClient.logs()).logs;
    }

    async pods() {
        return (await this.apiClient.pods()).pods;
    }

    async deployPod(podId?: string, component?: string) {
        const response: DeployPodResponse = await this.apiClient.deployPod(podId, component);
        return {
            message: response.message,
            podId: response.podId,
            component: response.component
        }
    }

    async deletePod(podId: string) {
        const response: DeletePodResponse = await this.apiClient.deletePod(podId);
        return {
            message: response.message,
            podId: response.podId
        }
    }

    async startPod(podId: string, component?: string) {
        const response: StartPodResponse = await this.apiClient.startPod(podId, component);
        return {
            message: response.message,
            podId: response.podId,
            command: response.command,
            error: response?.error
        }
    }

    async stopPod(podId: string, component?: string) {
        const response: StartPodResponse = await this.apiClient.stopPod(podId, component);
        return {
            message: response.message,
            podId: response.podId,
            command: response.command,
            error: response?.error
        }
    }

    async restartPod(podId: string, component?: string) {
        const response: StartPodResponse = await this.apiClient.restartPod(podId, component);
        return {
            message: response.message,
            podId: response.podId,
            command: response.command,
            error: response?.error
        }
    }

    async getPodInfo(podId: string, info: PodInfoTypes) {
        const response: GetPodInfoResponse = await this.apiClient.podInfo(
            podId,
            info
        );
        return response.podInfo;
    }

    async addJsonToIpfs(
        podId: string,
        json: any
    ) {
        const response: PodCommandResponse = await this.apiClient.addJsonToIpfs(podId, json);
        return response.data.raw;
    }

    async getJsonFromIpfs(
        podId: string,
        hash: string
    ) {
        const response: PodCommandResponse = await this.apiClient.getJsonFromIpfs(podId, hash);
        return response.data.raw;
    }

    async dial(
        podId: string,
        multiaddr: string
    ) {
        const response: PodCommandResponse = await this.apiClient.podDial(podId, multiaddr);
        return response.data.raw;
    }

    async openDatabase(
        // podId: string, TODO: add podId to openDatabase to allow for opening databases in specific pods
        dbName: string,
        dbType: DatabaseTypes = DatabaseTypes.DOCUMENT
    ) {
        const response: OpenDatabaseResponse = await this.apiClient.openDatabase(dbName, dbType);
        return {
            id: response.id,
            type: response.type,
            address: response.address
        };
    }

    async closeDatabase(
        dbName: string
    ) {
        return await this.apiClient.closeDatabase(dbName);
    }

    async addRecordToDatabase(
        dbName: string,
        key: string,
        value: any
    ) {
        const response: AddRecordResponse = await this.apiClient.addRecord(dbName, key, value);
        if (response.status !== 200) {
            return response;
        }
        return response.cid;
    }

    async getRecordFromDatabase(
        dbName: string,
        key: string
    ) {
        const response: AddRecordResponse = await this.apiClient.getRecord(dbName, key);
        if (response.status !== 200) {
            return response;
        }
        return response.data;
    }

    async putRecordToDatabase(
        dbName: string,
        key: string,
        value: any
    ) {
        const response: PutRecordResponse = await this.apiClient.putRecord(dbName, key, value);
        if (response.status !== 200) {
            return response;
        }
        return response.data;
    }

    async deleteRecordFromDatabase(
        dbName: string,
        key: string
    ) {
        const response: AddRecordResponse = await this.apiClient.deleteRecord(dbName, key);
        if (response.status !== 200) {
            return response;
        }
        return response;
    }   

}

export {
    MoonbaseServer
}