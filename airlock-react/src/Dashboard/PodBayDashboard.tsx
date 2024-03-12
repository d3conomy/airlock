import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

const MoonbaseServerUrl = 'http://0.0.0.0:3000/api/v0';

const callGetPods = async () => {
    const response = await axios.get(`${MoonbaseServerUrl}/pods`);
    return response.data;
}



export const PodBayDashboard: React.FC = () => {
  const [podId, setPodId] = useState('');
  const [ component, setComponent ] = useState('' as string);
  const [message, setMessage] = useState('');
  const [ pods, setPods ] = useState([]);
  const [serverConnection, setServerConnection] = useState(false);

  const handleAddPod = async () => {
    // Add a pod
    const addResponse: AxiosResponse = await axios.post(`${MoonbaseServerUrl}/pods`, {
      data: {
        id: podId,
        component: component
      }
    });
    setMessage(`Pod added: ${JSON.stringify(addResponse.data)}`);
  };

  const handleDeletePod = async () => {
    // Delete a pod
    const deleteResponse: AxiosResponse = await axios.delete(`${MoonbaseServerUrl}/pods`, {
      data: {
        id: podId
      }
    
    });
    setMessage(`Pod deleted: ${JSON.stringify(deleteResponse.data)}`);
  }

  const getPods = async () => {
    try {
      const runningPods = await callGetPods();
      setPods(runningPods);
      setServerConnection(true);
    }
    catch (error) {
      setServerConnection(false);
    }
  }

  useEffect(() => {
    getPods();
  });


  return (
    <div>
      <h1>PodBay Dashboard</h1>

      <div>
        <h2>Pods</h2>
      </div>

      <div>
        <h3>Server: {serverConnection ? 'Connected' : 'Disconnected'}</h3>
      </div>

      <div>
        <ul>
          {pods.map((pod: any, index: number) => {
            return <li key={index}>{pod.pod.name} | {pod.pod.component}</li>
          })}
        </ul>
        {/* {JSON.stringify(pods)} */}
      </div>

      <div>
        <button onClick={getPods}>Get Pods</button>
        <div>
          <input
            type="text"
            value={podId}
            onChange={e => setPodId(e.target.value)}
            placeholder="Enter pod ID"
          />
          {/* below is a drop down list with the options OrbitDb, Libp2p, or IPFS with default being OrbitDb*/}
          <select
            value={component}
            onChange={e => setComponent(e.target.value)}
          >
            <option value="orbitdb">OrbitDb</option>
            <option value="libp2p">Libp2p</option>
            <option value="ipfs">IPFS</option>
          </select>
        
          <button onClick={handleAddPod}>Add Pod</button>
          <button onClick={handleDeletePod}>Delete Pod</button>
        </div>

      <div>{message}</div>
      
    </div>
  </div>
  );
};