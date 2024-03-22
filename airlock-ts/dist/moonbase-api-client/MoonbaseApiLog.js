import { MoonbaseRequest, MoonbaseResponse } from './MoonbaseApiClasses.js';
class LogBooksRequest extends MoonbaseRequest {
    constructor(baseUrl) {
        super({
            baseUrl: baseUrl,
            endpoint: 'logbooks',
            method: 'GET'
        });
    }
}
class LogBooksResponse extends MoonbaseResponse {
    logbooks;
    constructor(response) {
        super(response);
        this.logbooks = response.data;
    }
}
class LogBookRequest extends MoonbaseRequest {
    constructor(baseUrl, logbookId, numResults = 25) {
        super({
            baseUrl: baseUrl,
            endpoint: `logbooks/${logbookId}?items=${numResults}`,
            method: 'GET'
        });
    }
}
class LogBookResponse extends MoonbaseResponse {
    logs;
    constructor(response) {
        super(response);
        this.logs = response.data;
    }
}
class LogsRequest extends MoonbaseRequest {
    constructor(baseUrl, numResults = 25) {
        super({
            baseUrl: baseUrl,
            endpoint: `logs?items=${numResults}`,
            method: 'GET'
        });
    }
}
export { LogBooksRequest, LogBooksResponse, LogBookRequest, LogBookResponse, LogsRequest };
