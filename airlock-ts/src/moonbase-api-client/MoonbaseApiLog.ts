import { AxiosResponse } from 'axios';
import { MoonbaseServerUrl } from '../moonbase-servers';
import { MoonbaseRequest, MoonbaseResponse } from './MoonbaseApiClasses.js';

class LogBooksRequest extends MoonbaseRequest {
    constructor(baseUrl: MoonbaseServerUrl) {
        super({
            baseUrl: baseUrl,
            endpoint: 'logbooks',
            method: 'GET'
        });
    }
}

class LogBooksResponse extends MoonbaseResponse {
    logbooks: Array<string>;

    constructor(response: AxiosResponse) {
        super(response);
        this.logbooks = response.data;
    }
}

class LogBookRequest extends MoonbaseRequest {
    constructor(
        baseUrl: MoonbaseServerUrl,
        logbookId: string,
        numResults: number = 25,
    ) {
        super({
            baseUrl: baseUrl,
            endpoint: `logbooks/${logbookId}?items=${numResults}`,
            method: 'GET'
        });
    }
}

class LogBookResponse extends MoonbaseResponse {
    logs: Array<string>;

    constructor(response: AxiosResponse) {
        super(response);
        this.logs = response.data;
    }
}

class LogsRequest extends MoonbaseRequest {
    constructor(
        baseUrl: MoonbaseServerUrl,
        numResults: number = 25,
    ) {
        super({
            baseUrl: baseUrl,
            endpoint: `logs?items=${numResults}`,
            method: 'GET'
        });
    }
}



export {
    LogBooksRequest,
    LogBooksResponse,
    LogBookRequest,
    LogBookResponse,
    LogsRequest
}