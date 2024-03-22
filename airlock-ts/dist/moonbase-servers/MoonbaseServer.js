import { ApiClientCalls } from '../moonbase-api-client/MoonbaseApiClientCalls.js';
import { DatabaseTypes } from '../moonbase-api-client/index.js';
class MoonbaseServer {
    id;
    url;
    apiClient;
    constructor({ id, url }) {
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
    async deployPod(podId, component) {
        const response = await this.apiClient.deployPod(podId, component);
        return {
            message: response.message,
            podId: response.podId,
            component: response.component
        };
    }
    async deletePod(podId) {
        const response = await this.apiClient.deletePod(podId);
        return {
            message: response.message,
            podId: response.podId
        };
    }
    async startPod(podId, component) {
        const response = await this.apiClient.startPod(podId, component);
        return {
            message: response.message,
            podId: response.podId,
            command: response.command,
            error: response?.error
        };
    }
    async stopPod(podId, component) {
        const response = await this.apiClient.stopPod(podId, component);
        return {
            message: response.message,
            podId: response.podId,
            command: response.command,
            error: response?.error
        };
    }
    async restartPod(podId, component) {
        const response = await this.apiClient.restartPod(podId, component);
        return {
            message: response.message,
            podId: response.podId,
            command: response.command,
            error: response?.error
        };
    }
    async getPodInfo(podId, info) {
        const response = await this.apiClient.podInfo(podId, info);
        return response.podInfo;
    }
    async addJsonToIpfs(podId, json) {
        const response = await this.apiClient.addJsonToIpfs(podId, json);
        return response.data.raw;
    }
    async getJsonFromIpfs(podId, hash) {
        const response = await this.apiClient.getJsonFromIpfs(podId, hash);
        return response.data.raw;
    }
    async dial(podId, multiaddr) {
        const response = await this.apiClient.podDial(podId, multiaddr);
        return response.data.raw;
    }
    async openDatabase(
    // podId: string, TODO: add podId to openDatabase to allow for opening databases in specific pods
    dbName, dbType = DatabaseTypes.DOCUMENT) {
        const response = await this.apiClient.openDatabase(dbName, dbType);
        return {
            id: response.id,
            type: response.type,
            address: response.address
        };
    }
    async closeDatabase(dbName) {
        return await this.apiClient.closeDatabase(dbName);
    }
    async addRecordToDatabase(dbName, key, value) {
        const response = await this.apiClient.addRecord(dbName, key, value);
        if (response.status !== 200) {
            return response;
        }
        return response.cid;
    }
    async getRecordFromDatabase(dbName, key) {
        const response = await this.apiClient.getRecord(dbName, key);
        if (response.status !== 200) {
            return response;
        }
        return response.data;
    }
    async putRecordToDatabase(dbName, key, value) {
        const response = await this.apiClient.putRecord(dbName, key, value);
        if (response.status !== 200) {
            return response;
        }
        return response.data;
    }
    async deleteRecordFromDatabase(dbName, key) {
        const response = await this.apiClient.deleteRecord(dbName, key);
        if (response.status !== 200) {
            return response;
        }
        return response;
    }
}
export { MoonbaseServer };
