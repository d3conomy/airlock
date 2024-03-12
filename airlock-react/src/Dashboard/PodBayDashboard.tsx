import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { LunarPod } from '../Pod';

const MoonbaseServerUrl = 'http://0.0.0.0:3000/api/v0';

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
    const response = await axios.post(`${MoonbaseServerUrl}/open`, {
        id: podId,
        dbName: dbName,
        dbType: dbType
    });
    return response.data;
}



export const PodBayDashboard: React.FC = () => {
  const [ podId, setPodId ] = useState('');
  const [ component, setComponent ] = useState('' as string);
  const [ message, setMessage ] = useState('');
  const [ pods, setPods ] = useState([]);
  const [ serverConnection, setServerConnection ] = useState(false);
  const [ dbName, setDbName ] = useState('');
  const [ dbType, setDbType ] = useState('');

  const handleAddPod = async () => {
    // Add a pod
    const addResponse: AxiosResponse = await callPostPods(podId, component);
    setMessage(`Pod added: ${JSON.stringify(addResponse)}`);
  };



  const getPods = async () => {
    let runningPods: any;
    let timePodsRetrieved: Date;
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

      <div style={{
            border: '1px solid black',
            padding: '10px',
            margin: '10px',
            backgroundColor: 'lightgrey',
            textAlign: 'left',
            maxWidth: '512px'
        }}>

        <h3>Server: {serverConnection ? 'Connected' : 'Disconnected'}</h3>
        <button onClick={getPods}>Get Pods</button>

        <br />
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

      <div>{message}</div>
      
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