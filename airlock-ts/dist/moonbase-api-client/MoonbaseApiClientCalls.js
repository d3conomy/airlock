import { ApiClient } from "./ApiClient.js";
import { PingRequest, PingResponse } from "./MoonbaseApiClasses.js";
import { LogsRequest, LogBookResponse, } from "./MoonbaseApiLog.js";
import { PodsRequest, PodsResponse, DeployPodRequest, DeployPodResponse, DeletePodRequest, DeletePodResponse, StartPodRequest, StartPodResponse, StopPodRequest, RestartPodRequest, } from "./MoonbaseApiPodControl.js";
import { GetPodInfoRequest, GetPodInfoResponse, PodCommands, PodCommandRequest, PodCommandResponse, DialCommandArgs, AddJsonCommandArgs, GetJsonCommandArgs } from "./MoonbaseApiPodCommands.js";
import { OpenDatabaseRequest, OpenDatabaseResponse, GetDatabaseInfoRequest, GetDatabaseInfoResponse, DeleteRecordRequest, DeleteRecordRequestData, AddRecordRequest, AddRecordResponse, GetRecordRequestData, AddRecordRequestData, DatabaseRecord, CloseDatabaseRequest, PutRecordResponse, PutRecordRequest, PutRecordRequestData, } from "./MoonbaseApiDatabase.js";
class ApiClientCalls extends ApiClient {
    moonbaseServerUrl;
    constructor(moonbaseServerUrl) {
        super();
        this.moonbaseServerUrl = moonbaseServerUrl;
    }
    async ping() {
        const request = new PingRequest(this.moonbaseServerUrl);
        const response = await this.makeRequest(request);
        return new PingResponse(response);
    }
    async logs() {
        const request = new LogsRequest(this.moonbaseServerUrl);
        const response = await this.makeRequest(request);
        return new LogBookResponse(response);
    }
    async pods() {
        const request = new PodsRequest(this.moonbaseServerUrl);
        const response = await this.makeRequest(request);
        return new PodsResponse(response);
    }
    async deployPod(podId, component) {
        const request = new DeployPodRequest(this.moonbaseServerUrl, podId, component);
        const response = await this.makeRequest(request);
        return new DeployPodResponse(response);
    }
    async deletePod(podId) {
        const request = new DeletePodRequest(this.moonbaseServerUrl, podId);
        const response = await this.makeRequest(request);
        return new DeletePodResponse(response);
    }
    async startPod(podId, component) {
        const request = new StartPodRequest(this.moonbaseServerUrl, podId, component);
        const response = await this.makeRequest(request);
        return new StartPodResponse(response);
    }
    async stopPod(podId, component) {
        const request = new StopPodRequest(this.moonbaseServerUrl, podId, component);
        const response = await this.makeRequest(request);
        return new StartPodResponse(response);
    }
    async restartPod(podId, component) {
        const request = new RestartPodRequest(this.moonbaseServerUrl, podId, component);
        const response = await this.makeRequest(request);
        return new StartPodResponse(response);
    }
    async podInfo(podId, info) {
        const request = new GetPodInfoRequest(this.moonbaseServerUrl, podId, info);
        const response = await this.makeRequest(request);
        return new GetPodInfoResponse(response);
    }
    async podCommand(podId, command, args) {
        const request = new PodCommandRequest(this.moonbaseServerUrl, podId, command, args);
        const response = await this.makeRequest(request);
        return new PodCommandResponse(response);
    }
    async podDial(podId, multiAddr) {
        const request = new PodCommandRequest(this.moonbaseServerUrl, podId, PodCommands.Dial, new DialCommandArgs({ address: multiAddr }));
        const response = await this.makeRequest(request);
        return new PodCommandResponse(response);
    }
    async addJsonToIpfs(podId, jsonData) {
        const request = new PodCommandRequest(this.moonbaseServerUrl, podId, PodCommands.AddJson, new AddJsonCommandArgs(jsonData));
        const response = await this.makeRequest(request);
        return new PodCommandResponse(response);
    }
    async getJsonFromIpfs(podId, cid) {
        const request = new PodCommandRequest(this.moonbaseServerUrl, podId, PodCommands.GetJson, new GetJsonCommandArgs(cid));
        const response = await this.makeRequest(request);
        return new PodCommandResponse(response);
    }
    async openDatabase(dbName, dbType) {
        const request = new OpenDatabaseRequest(this.moonbaseServerUrl, dbName, dbType);
        const response = await this.makeRequest(request);
        return new OpenDatabaseResponse(response);
    }
    async closeDatabase(dbName) {
        const request = new CloseDatabaseRequest(this.moonbaseServerUrl, dbName);
        const response = await this.makeRequest(request);
        return new PodCommandResponse(response);
    }
    async getDatabaseInfo(dbName) {
        const request = new GetDatabaseInfoRequest(this.moonbaseServerUrl, dbName);
        const response = await this.makeRequest(request);
        return new GetDatabaseInfoResponse(response);
    }
    async addRecord(dbName, key, value) {
        const request = new AddRecordRequest(this.moonbaseServerUrl, dbName, new AddRecordRequestData(new DatabaseRecord({
            key: key,
            value: value
        })));
        const response = await this.makeRequest(request);
        return new AddRecordResponse(response);
    }
    async putRecord(dbName, key, value) {
        const request = new PutRecordRequest(this.moonbaseServerUrl, dbName, new PutRecordRequestData({
            key: key,
            value: value
        }));
        const response = await this.makeRequest(request);
        return new PutRecordResponse(response);
    }
    async getRecord(dbId, key, cid) {
        const request = new AddRecordRequest(this.moonbaseServerUrl, dbId, new GetRecordRequestData({
            key: key,
            cid: cid
        }));
        const response = await this.makeRequest(request);
        return new AddRecordResponse(response);
    }
    async deleteRecord(dbId, key) {
        const request = new DeleteRecordRequest(this.moonbaseServerUrl, dbId, new DeleteRecordRequestData({
            key: key
        }));
        const response = await this.makeRequest(request);
        return new PodCommandResponse(response);
    }
}
export { ApiClientCalls };
