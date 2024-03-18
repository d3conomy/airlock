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
                    // Create a box with a dropdown arrow that reveals the log entry details

                    <div key={index} className="box">
                        <article className="media">
                            <div className="media-content">
                                <div className="content">
                                    <p>
                                        <span style={{fontWeight: 'lighter', fontVariant: 'small-caps'}}>[{log.level}]</span><span style={{color: 'greenyellow'}}> {log.message}</span>
                                        <br />
                                        <small style={{fontStyle: 'italic', color: 'Highlight'}}>{log.timestamp}</small>
                                        {log.error ? <br /> : null}
                                        {log.error ? <span style={{color: 'red'}}>{log.error}</span> : null}
                                        {log.podId ? <br /> : null}
                                        {log.podId ? <span style={{color: 'darkturquoise'}}>Pod: {log.podId.name}</span> : null}
                                        {log.processId ? <br /> : null}
                                        {log.processId ? <span style={{color: 'darkturquoise'}}>Process: {log.processId.name}</span> : null}
                                        {log.code ? <br /> : null}
                                        {log.code ? <span style={{color: 'darkturquoise'}}>Code: {log.code}</span> : null}
                                        {log.stage ? <br /> : null}
                                        {log.stage ? <span style={{color: 'darkturquoise'}}>Stage: {log.stage}</span> : null}
                                    </p>
                                </div>
                            </div>
                        </article>
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