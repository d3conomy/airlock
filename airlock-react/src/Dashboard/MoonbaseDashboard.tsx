import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { LunarPod, OpenDb } from '../Pod';
import { toast } from 'react-toastify';
import { Logs } from './Logs';

let MoonbaseServerUrl = 'http://0.0.0.0:3000/api/v0';

const setMoonbaseServerUrl = (url: string) => {
    MoonbaseServerUrl = url;
}

const callGetPods = async () => {
    const response = await axios.get(`${MoonbaseServerUrl}/pods`);
    return response.data;
}

const callPostPods = async (podId: string, component: string) => {
    const response = await axios.post(`${MoonbaseServerUrl}/pods`, {
        id: podId,
        component: component
    });
    return response.data;
}

const callPostOpen = async (podId: string, dbName: string, dbType: string) => {
  let response;
  try { 
     response = await axios.post(`${MoonbaseServerUrl}/open`, {
        id: podId,
        dbName: dbName,
        dbType: dbType
    });
  }
  catch (error) {
    toast.error(`Error opening database: ${error}`);
  }
  if (response?.data?.has) {
    toast.error(`Error opening database: ${response.data.error}`);
  }

  return response ? response?.data : null;
}



export const MoonbaseDashboard: React.FC = () => {
  const [ podId, setPodId ] = useState('');
  const [ component, setComponent ] = useState('' as string);
  const [ message, setMessage ] = useState('');
  const [ pods, setPods ] = useState([]);
  const [ serverConnection, setServerConnection ] = useState(false);
  const [ dbName, setDbName ] = useState('');
  const [ dbType, setDbType ] = useState('');
  const [ serverUrl, setServerUrl ] = useState(MoonbaseServerUrl);

  const handleAddPod = async () => {
    // Add a pod
    const addResponse: AxiosResponse = await callPostPods(podId, component);
    setMessage(`${JSON.stringify(addResponse)}`);
  };



  const getPods = async () => {
    let runningPods: any;
    try {
      runningPods = await callGetPods();
      setPods(runningPods);
      setServerConnection(true);
    }
    catch (error) {
      setServerConnection(false);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getPods();
      
    }, 1000);

    return () => clearInterval(interval);
  });


  return (
    <div>
      <h1>Moonbase Dashboard</h1>

      <div className="Moonbase-control-panel-container">

      <div className="Moonbase-control-panel">

        <div className="Moonbase-control-panel-server"> 
          <h3>Server: {serverConnection ? 'Connected' : 'Disconnected'}</h3>
          <input
            type="text"
            value={serverUrl}
            onChange={e => setServerUrl(e.target.value)}
            placeholder={MoonbaseServerUrl}
            style={{ width: '300px' }}
          />
          <button onClick={() => setMoonbaseServerUrl(serverUrl)}>Reset</button>
        </div>

        <br />

        <div>
          <button onClick={getPods}>Get Pods</button>
        </div>

        <br />

        <div>
          <input
            type="text"
            value={podId}
            onChange={e => setPodId(e.target.value)}
            placeholder="Enter pod ID"
          />
          <select
            value={component}
            onChange={e => setComponent(e.target.value)}
          >
            <option value="orbitdb">OrbitDb</option>
            <option value="libp2p">Libp2p</option>
            <option value="ipfs">IPFS</option>
          </select>
        
          <button onClick={handleAddPod}>Add Pod</button>


          <br />
          <br />

          <input
            type="text"
            value={dbName}
            onChange={e => setDbName(e.target.value)}
            placeholder="Enter database name"
          />
          <select
            value={dbType}
            onChange={e => setDbType(e.target.value)}
          >
            <option value="keyvalue">Key/Value</option>
            <option value="events">Event Log</option>
            <option value="documents">Docstore</option>
          </select>

          <button onClick={() => callPostOpen(podId, dbName, dbType)}>Open Database</button>
          
        </div>

      {/* <div className="Moonbase-control-panel-output">{message}</div> */}

      <div className="Moonbase-control-panel-output">
        <Logs />
      </div>
    </div>

    <div>
      {(pods.length > 0) ? <OpenDb /> : null}
    </div>

    </div>

    <div>
        <h2>Pods</h2>
      </div>

      <div className="pod-bay-dashboard">
        {pods.map((pod: any, index: number) => {
          return (
            <LunarPod key={index} lunarPod={pod} />
          );
        })}
      </div>
  </div>

  );
};

export {
  MoonbaseServerUrl,
  setMoonbaseServerUrl
}