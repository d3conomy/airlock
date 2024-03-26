import { AxiosResponse } from 'axios';
import { MoonbaseServerUrl } from '../moonbase-servers';
import { MoonbaseRequest, MoonbaseResponse } from './MoonbaseApiClasses.js';
declare class LogBooksRequest extends MoonbaseRequest {
    constructor(baseUrl: MoonbaseServerUrl);
}
declare class LogBooksResponse extends MoonbaseResponse {
    logbooks: Array<string>;
    constructor(response: AxiosResponse);
}
declare class LogBookRequest extends MoonbaseRequest {
    constructor(baseUrl: MoonbaseServerUrl, logbookId: string, numResults?: number);
}
declare class LogBookResponse extends MoonbaseResponse {
    logs: Array<string>;
    constructor(response: AxiosResponse);
}
declare class LogsRequest extends MoonbaseRequest {
    constructor(baseUrl: MoonbaseServerUrl, numResults?: number);
}
export { LogBooksRequest, LogBooksResponse, LogBookRequest, LogBookResponse, LogsRequest };
