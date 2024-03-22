import { MoonbaseRequest, MoonbaseResponse } from './MoonbaseApiClasses.js';
class GetOpenDatabasesRequest extends MoonbaseRequest {
    constructor(baseUrl, podId) {
        super({
            baseUrl: baseUrl,
            endpoint: `open`,
            method: 'GET'
        });
    }
}
class GetOpenDatabasesResponse extends MoonbaseResponse {
    databases;
    constructor(response) {
        super(response);
        this.databases = response.data.databases;
    }
}
var DatabaseTypes;
(function (DatabaseTypes) {
    DatabaseTypes["EVENTS"] = "events";
    DatabaseTypes["KEYVALUE"] = "keyvalue";
    DatabaseTypes["DOCUMENT"] = "document";
    DatabaseTypes["KEYVALUEINDEXED"] = "keyvalueindexed";
})(DatabaseTypes || (DatabaseTypes = {}));
class OpenDatabaseRequest extends MoonbaseRequest {
    constructor(baseUrl, dbName, dbType) {
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
    id;
    type;
    address;
    constructor(response) {
        super(response);
        this.id = response.data.id;
        this.type = response.data.type;
        this.address = response.data.address;
    }
}
class GetDatabaseInfoRequest extends MoonbaseRequest {
    constructor(baseUrl, dbId) {
        super({
            baseUrl: baseUrl,
            endpoint: `db/${dbId}`,
            method: 'GET'
        });
    }
}
class GetDatabaseInfoResponse extends MoonbaseResponse {
    id;
    type;
    address;
    multiaddrs;
    constructor(response) {
        super(response);
        this.id = response.data.id;
        this.type = response.data.type;
        this.address = response.data.address;
    }
}
var DatabaseCommands;
(function (DatabaseCommands) {
    DatabaseCommands["ADD"] = "add";
    DatabaseCommands["PUT"] = "put";
    DatabaseCommands["GET"] = "get";
    DatabaseCommands["DELETE"] = "del";
    DatabaseCommands["ALL"] = "all";
})(DatabaseCommands || (DatabaseCommands = {}));
class DatabaseRecord {
    value;
    key;
    cid;
    constructor({ key, value, cid } = {}) {
        this.key = key;
        this.value = value;
        this.cid = cid;
    }
    static fromJson(json) {
        return new DatabaseRecord({
            key: json.key,
            value: json.value,
            cid: json.cid
        });
    }
}
class AddRecordRequestData {
    command;
    args;
    constructor(record) {
        this.command = DatabaseCommands.ADD;
        this.args = record;
    }
}
class AddRecordRequest extends MoonbaseRequest {
    constructor(baseUrl, dbId, data) {
        super({
            baseUrl: baseUrl,
            endpoint: `db/${dbId}`,
            method: 'POST',
            data: data
        });
    }
}
class AddRecordResponse extends MoonbaseResponse {
    cid;
    constructor(response) {
        super(response);
        this.cid = response.data;
    }
}
class GetDatabaseRequestRecord {
    key;
    constructor({ cid, key }) {
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
class GetRecordRequestData {
    command;
    args;
    constructor({ cid, key }) {
        this.command = DatabaseCommands.GET;
        this.args = new GetDatabaseRequestRecord({
            cid: cid,
            key: key
        });
    }
}
class GetRecordRequest extends MoonbaseRequest {
    constructor(baseUrl, dbId, data) {
        super({
            baseUrl: baseUrl,
            endpoint: `db/${dbId}`,
            method: 'POST',
            data: data
        });
    }
}
class GetRecordResponseData extends DatabaseRecord {
    constructor(responseData) {
        super();
        const record = DatabaseRecord.fromJson(responseData);
        this.key = record.key;
        this.value = record.value;
        this.cid = record.cid;
    }
}
class GetRecordResponse extends MoonbaseResponse {
    record;
    constructor(response) {
        super(response);
        this.record = new GetRecordResponseData(response.data);
    }
}
export { GetOpenDatabasesRequest, GetOpenDatabasesResponse, OpenDatabaseRequest, OpenDatabaseResponse, GetDatabaseInfoRequest, GetDatabaseInfoResponse, DatabaseRecord, DatabaseTypes, DatabaseCommands, AddRecordRequest, AddRecordResponse, AddRecordRequestData, GetRecordRequest, GetRecordRequestData, GetRecordResponse };
