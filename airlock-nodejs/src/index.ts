import axios from 'axios';

const moonbaseUrl = 'http://0.0.0.0:3000/api/v0';

const ping = async () => {
    const response = await axios.get(`${moonbaseUrl}/metrics/ping`);
    return response.data;
}

const openDb = async (dbName: string, dbType: string, options?: any) => {
    const response = await axios.post(`${moonbaseUrl}/db/open`, {
        dbName,
        dbType,
        options
    });
    return response.data;
}


async function main() {
    const pingResult = await ping();
    console.log('pingResult:', pingResult);
}

main();