import { AxiosResponse } from 'axios';
import { MoonbaseServerUrl } from '../moonbase-servers';
import { MoonbaseRequest, MoonbaseResponse } from './MoonbaseApiClasses.js';


class GetOpenDatabasesRequest extends MoonbaseRequest {
    constructor(
        baseUrl: MoonbaseServerUrl,
        podId: string
    ) {
        super({
            baseUrl: baseUrl,
            endpoint: `open`,
            method: 'GET'
        });
    }
}

class GetOpenDatabasesResponse extends MoonbaseResponse {
    databases?: Array<any>;

    constructor(response: AxiosResponse<any>) {
        super(response);
        this.databases = response.data.databases;
    }
}

enum DatabaseTypes {
    EVENTS = 'events',
    KEYVALUE = 'keyvalue',
    DOCUMENT = 'document',
    KEYVALUEINDEXED = 'keyvalueindexed'
}

class OpenDatabaseRequest extends MoonbaseRequest {
    constructor(
        baseUrl: MoonbaseServerUrl,
        dbName: string,
        dbType: DatabaseTypes
    ) {
        super({
            baseUrl: baseUrl,
            endpoint: `open`,
            method: 'POST',
            data: {
                dbName,
                dbType
            }
        });
    }
}

class OpenDatabaseResponse extends MoonbaseResponse {
    id?: string;
    type?: string;
    address?: string;

    constructor(response: AxiosResponse<any>) {
        super(response);
        this.id = response.data.id;
        this.type = response.data.type;
        this.address = response.data.address;
    }
}

class GetDatabaseInfoRequest extends MoonbaseRequest {
    constructor(
        baseUrl: MoonbaseServerUrl,
        dbId: string
    ) {
        super({
            baseUrl: baseUrl,
            endpoint: `db/${dbId}`,
            method: 'GET'
        });
    }
}

class GetDatabaseInfoResponse extends MoonbaseResponse {
    id?: string;
    type?: string;
    address?: string;
    multiaddrs?: Array<string>;

    constructor(response: AxiosResponse<any>) {
        super(response);
        this.id = response.data.id;
        this.type = response.data.type;
        this.address = response.data.address;
    }
}

enum DatabaseCommands {
    ADD = 'add',
    PUT = 'put',
    GET = 'get',
    DELETE = 'del',
    ALL = 'all'
}

interface IDatabaseRecord {
    value?: any;
    key?: string;
    cid?: string;
}

class DatabaseRecord implements IDatabaseRecord {
    value?: any;
    key?: string;
    cid?: string;

    constructor({
        key,
        value,
        cid
    } : {
        key?: string,
        value?: any,
        cid?: string
    } = {}) {
        this.key = key;
        this.value = value;
        this.cid = cid;
    }

    static fromJson(json: any): DatabaseRecord {
        return new DatabaseRecord({
            key: json.key,
            value: json.value,
            cid: json.cid
        });
    }
}

interface IDatabaseCommand {
    command: DatabaseCommands;
    args: IDatabaseRecord;
}

class AddRecordRequestData implements IDatabaseCommand {
    command: DatabaseCommands;
    args: IDatabaseRecord;

    constructor(
        record: IDatabaseRecord
    ) {
        this.command = DatabaseCommands.ADD;
        this.args = record;
    }
}

class AddRecordRequest extends MoonbaseRequest {
    constructor(
        baseUrl: MoonbaseServerUrl,
        dbId: string,
        data: AddRecordRequestData
    ) {
        super({
            baseUrl: baseUrl,
            endpoint: `db/${dbId}`,
            method: 'POST',
            data: data
        });
    }
}

class AddRecordResponse extends MoonbaseResponse {
    cid?: string;

    constructor(response: AxiosResponse<any>) {
        super(response);
        this.cid = response.data;
    }
}


class GetDatabaseRequestRecord implements IDatabaseRecord {
    key?: string;

    constructor({
        cid,
        key
    } : {
        cid?: string,
        key?: string
    }) {
        if (!cid && !key) {
            throw new Error('Either cid or key must be provided');
        }

        if (cid && key) {
            throw new Error('Only one of cid or key can be provided');
        }

        if (cid) {
            this.key = cid;
        }
        if (key) {
            this.key = key;
        }
    }
}

class GetRecordRequestData implements IDatabaseCommand{
    command: DatabaseCommands;
    args: GetDatabaseRequestRecord;

    constructor({
        cid,
        key
    } : {
        cid?: string,
        key?: string
    }) {
        this.command = DatabaseCommands.GET;
        this.args = new GetDatabaseRequestRecord({
            cid: cid,
            key: key
        });
    }
}

class GetRecordRequest extends MoonbaseRequest {
    constructor(
        baseUrl: MoonbaseServerUrl,
        dbId: string,
        data: GetRecordRequestData
    ) {
        super({
            baseUrl: baseUrl,
            endpoint: `db/${dbId}`,
            method: 'POST',
            data: data
        });
    }
}

class GetRecordResponseData extends DatabaseRecord {
    constructor(responseData: any) {
        super();
        const record = DatabaseRecord.fromJson(responseData);
        this.key = record.key;
        this.value = record.value;
        this.cid = record.cid;
    }
}

class GetRecordResponse extends MoonbaseResponse {
    record?: GetRecordResponseData;
    constructor(response: AxiosResponse<any>) {
        super(response);
        this.record = new GetRecordResponseData(response.data);
    }
}

export {
    GetOpenDatabasesRequest,
    GetOpenDatabasesResponse,
    OpenDatabaseRequest,
    OpenDatabaseResponse,
    GetDatabaseInfoRequest,
    GetDatabaseInfoResponse,
    DatabaseRecord,
    DatabaseTypes,
    DatabaseCommands,
    AddRecordRequest,
    AddRecordResponse,
    AddRecordRequestData,
    GetRecordRequest,
    GetRecordRequestData,
    GetRecordResponse
}
