import React, { useEffect } from 'react';
import axios from 'axios';
import { MoonbaseServerUrl } from './MoonbaseDashboard';

interface IIdRef {
    name: string;
    component: string;
}

interface ILogEntry {
    podId?: IIdRef;
    processId?: IIdRef;
    level?: string;
    code?: string;
    stage?: string;
    timestamp?: string;
    message?: string;
    error?: string;
    printLevel?: string;
}

export const Logs: React.FC = () => {
    const [ logs, setLogs ] = React.useState<Array<ILogEntry>>();

    const callGetLogs = async () => {
        const response = await axios.get(`${MoonbaseServerUrl}/logs?items=10`);
        console.log(`response: ${JSON.stringify(response.data)}`);
        console.log('response:', JSON.stringify(response.data[0]))
        const data = JSON.parse(JSON.stringify(response.data));
        let foundLogs: any[] = [];
        for (let i = 0; i < data.length; i++) {
            console.log('data:', data[i][1])
            foundLogs.push(data[i][1]);
        }
        console.log('foundLogs:', foundLogs)
        setLogs(foundLogs);
        console.log('logs:', logs)
    }

    const printLogsEntries = () => {
        if (logs) {

            return logs.map((log: ILogEntry, index: any) => {
                return (
                    <div key={index}>
                        <p>{log.podId?.name} {log.processId?.name} {log.level} {log.code} {log.stage} {log.message} {JSON.stringify(log.error)}</p>
                    </div>
                );
            });
        }
    }


    useEffect(() => {
        setTimeout(() => {
            callGetLogs();
        }, 1000);
    });

    return (
        <div>
            {/* below goes the log monitor box */}
            <div>
                {printLogsEntries()}
            </div>

        </div>
    );
}