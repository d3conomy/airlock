import axios from 'axios';
const moonbaseUrl = 'http://0.0.0.0:4343/api/v0';
const ping = async () => {
    const response = await axios.get(`${moonbaseUrl}/ping`);
    return response.data;
};
const openDb = async (dbName, dbType, options) => {
    const response = await axios.post(`${moonbaseUrl}/db/open`, {
        dbName,
        dbType,
        options
    });
    return response.data;
};
async function main() {
    const pingResult = await ping();
    console.log('pingResult:', pingResult);
}
main();
export { ping, openDb };
