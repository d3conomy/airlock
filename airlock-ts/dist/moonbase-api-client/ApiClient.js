import axios from 'axios';
class ApiClient {
    async makeRequest(request) {
        return await axios(request);
    }
}
export { ApiClient };
