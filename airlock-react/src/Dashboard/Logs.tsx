import React, { useEffect } from 'react';
import axios from 'axios';
import { MoonbaseServerUrl } from './MoonbaseDashboard';


/**
 * This is the interface for the Id reference object that is returned from the Moonbase server.
 * @category API
*/
interface IIdRefApi {
    name: string;
    component: string;
}

/**
 * This is the interface for the log entry object that is returned from the Moonbase server.
 * @category API
 */
interface ILogEntryApi {
    podId?: IIdRefApi;
    processId?: IIdRefApi;
    level?: string;
    code?: string;
    stage?: string;
    timestamp?: string;
    message?: string;
    error?: string;
    printLevel?: string;
}



/**
 * This is the interface for the log entry object that is returned from the Moonbase server.
 * @category API
 */
export const Logs: React.FC = () => {
    const [ logs, setLogs ] = React.useState<Array<ILogEntryApi>>();

    const callGetLogs = async () => {
        const response = await axios.get(`${MoonbaseServerUrl}/logs?items=10`);
        const data = JSON.parse(JSON.stringify(response.data));
        let foundLogs: any[] = [];
        for (let i = 0; i < data.length; i++) {
            foundLogs.push(data[i][1]);
        }
        if (foundLogs.length > 0) {
            foundLogs = foundLogs.reverse();
        }
        if (foundLogs === logs) {
            return;
        }
        setLogs(foundLogs);
    }

    const printLogsEntries = () => {
        if (logs) {

            return logs.map((log: ILogEntryApi, index: any) => {
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