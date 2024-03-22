import axios, { AxiosResponse } from 'axios';

class ApiClient {
    public async makeRequest (request: any): Promise<AxiosResponse> {
        return await axios(request);
    }
}

export {
    ApiClient
}
