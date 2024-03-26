import { AxiosResponse } from 'axios';
import { MoonbaseServerUrl } from '../moonbase-servers';
import { MoonbaseRequest, MoonbaseResponse } from './MoonbaseApiClasses.js';
declare class GetOpenDatabasesRequest extends MoonbaseRequest {
    constructor(baseUrl: MoonbaseServerUrl, podId: string);
}
declare class GetOpenDatabasesResponse extends MoonbaseResponse {
    databases?: Array<any>;
    constructor(response: AxiosResponse<any>);
}
declare enum DatabaseTypes {
    EVENTS = "events",
    KEYVALUE = "keyvalue",
    DOCUMENT = "document",
    KEYVALUEINDEXED = "keyvalueindexed"
}
declare class OpenDatabaseRequest extends MoonbaseRequest {
    constructor(baseUrl: MoonbaseServerUrl, dbName: string, dbType: DatabaseTypes);
}
declare class OpenDatabaseResponse extends MoonbaseResponse {
    id?: string;
    type?: string;
    address?: string;
    multiaddrs?: Array<string>;
    constructor(response: AxiosResponse<any>);
}
declare class CloseDatabaseRequest extends MoonbaseRequest {
    constructor(baseUrl: MoonbaseServerUrl, dbName: string);
}
declare class GetDatabaseInfoRequest extends MoonbaseRequest {
    constructor(baseUrl: MoonbaseServerUrl, dbId: string);
}
declare class GetDatabaseInfoResponse extends MoonbaseResponse {
    id?: string;
    type?: string;
    address?: string;
    multiaddrs?: Array<string>;
    constructor(response: AxiosResponse<any>);
}
declare enum DatabaseCommands {
    ADD = "add",
    PUT = "put",
    GET = "get",
    DELETE = "del",
    ALL = "all"
}
interface IDatabaseRecord {
    value?: any;
    key?: string;
    cid?: string;
}
declare class DatabaseRecord implements IDatabaseRecord {
    value?: any;
    key?: string;
    cid?: string;
    constructor({ key, value, cid }?: {
        key?: string;
        value?: any;
        cid?: string;
    });
    static fromJson(json: any): DatabaseRecord;
}
interface IDatabaseCommand {
    command: DatabaseCommands;
    args: IDatabaseRecord;
}
declare class AddRecordRequestData implements IDatabaseCommand {
    command: DatabaseCommands;
    args: IDatabaseRecord;
    constructor(record: IDatabaseRecord);
}
declare class AddRecordRequest extends MoonbaseRequest {
    constructor(baseUrl: MoonbaseServerUrl, dbId: string, data: AddRecordRequestData);
}
declare class AddRecordResponse extends MoonbaseResponse {
    cid?: string;
    constructor(response: AxiosResponse<any>);
}
declare class GetDatabaseRequestRecord implements IDatabaseRecord {
    key?: string;
    constructor({ cid, key }: {
        cid?: string;
        key?: string;
    });
}
declare class GetRecordRequestData implements IDatabaseCommand {
    command: DatabaseCommands;
    args: GetDatabaseRequestRecord;
    constructor({ cid, key }: {
        cid?: string;
        key?: string;
    });
}
declare class GetRecordRequest extends MoonbaseRequest {
    constructor(baseUrl: MoonbaseServerUrl, dbId: string, data: GetRecordRequestData);
}
declare class GetRecordResponseData extends DatabaseRecord {
    constructor(responseData: any);
}
declare class GetRecordResponse extends MoonbaseResponse {
    record?: GetRecordResponseData;
    constructor(response: AxiosResponse<any>);
}
declare class PutRecordRequestData implements IDatabaseCommand {
    command: DatabaseCommands;
    args: DatabaseRecord;
    constructor({ key, value }: {
        key?: string;
        value?: any;
    });
}
declare class PutRecordRequest extends MoonbaseRequest {
    constructor(baseUrl: MoonbaseServerUrl, dbId: string, data: PutRecordRequestData);
}
declare class PutRecordResponse extends MoonbaseResponse {
    constructor(response: AxiosResponse<any>);
}
declare class DeleteRecordRequestData implements IDatabaseCommand {
    command: DatabaseCommands;
    args: GetDatabaseRequestRecord;
    constructor({ cid, key }: {
        cid?: string;
        key?: string;
    });
}
declare class DeleteRecordRequest extends MoonbaseRequest {
    constructor(baseUrl: MoonbaseServerUrl, dbId: string, data: DeleteRecordRequestData);
}
export { GetOpenDatabasesRequest, GetOpenDatabasesResponse, OpenDatabaseRequest, OpenDatabaseResponse, CloseDatabaseRequest, GetDatabaseInfoRequest, GetDatabaseInfoResponse, DatabaseRecord, DatabaseTypes, DatabaseCommands, AddRecordRequest, AddRecordResponse, AddRecordRequestData, GetRecordRequest, GetRecordRequestData, GetRecordResponse, PutRecordRequest, PutRecordRequestData, PutRecordResponse, DeleteRecordRequestData, DeleteRecordRequest };
