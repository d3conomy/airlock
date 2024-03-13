import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { MoonbaseServerUrl } from '../Dashboard';

interface OpenDatabases {
    databases: string[];
}

interface OpenDbProps {
    name: string;
    type: string;
    address: string;
}

const callGetOpenDbs = async () => {
    const response = await axios.get(`${MoonbaseServerUrl}/open`);
    return response.data;
}

const callGetDb = async (dbName: string) => {
    const response = await axios.get(`${MoonbaseServerUrl}/db/${dbName}`);
    return response.data;
}

const callPostDb = async (dbName: string, command: string, args: any) => {
    const response = await axios.post(`${MoonbaseServerUrl}/db/${dbName}`, {
        command: command,
        args: args
    });
    return response.data;
}

export const OpenDb: React.FC = () => {
    const [openDbsList, setOpenDbsList] = useState<OpenDatabases>({ databases: new Array<string>() });
    const [openDbs, setOpenDbs] = useState<OpenDbProps[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const getOpenDbs = async () => {
                let revisedOpenDbs = await callGetOpenDbs();
                setOpenDbsList(revisedOpenDbs);
                let currentOpenDbs: OpenDbProps[] = new Array<OpenDbProps>();

                for (const dbName of openDbsList.databases) {
                    
                    try {
                        const db = await callGetDb(dbName);
                        if (db === undefined) {
                            continue;
                        }
                        else {
                            const openDb: OpenDbProps = {
                                name: db.id,
                                type: db.type,
                                address: db.address
                            };
                            currentOpenDbs.push(openDb);
                        }
                    }
                    catch (error) {
                        console.error(error);
                    }
                }
                setOpenDbs(currentOpenDbs);
            }

            getOpenDbs();
        }, 1000);

        return () => clearInterval(interval);
    });


    return (
        <div className="Moonbase-dashboard-opendbs">
            <h3>Open Databases</h3>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {openDbs.map((openDb, index) => (
                        <tr key={index}>
                            <td>{openDb.name}</td>
                            <td>{openDb.type}</td>
                            <td>{openDb.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OpenDb;