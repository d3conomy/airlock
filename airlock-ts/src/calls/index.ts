import axios from 'axios';

import { moonbaseUrl } from '../config.js';


const ping = async () => {
    const response = await axios.get(`${moonbaseUrl}/ping`);
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


export {
    ping,
    openDb
}