import { AxiosResponse } from 'axios';
declare class ApiClient {
    makeRequest(request: any): Promise<AxiosResponse>;
}
export { ApiClient };
