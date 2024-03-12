import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MoonbaseServerUrl = 'http://0.0.0.0:3000/api/v0';

const callGetPods = async () => {
    const response = await axios.get(`${MoonbaseServerUrl}/pods`);
    return response.data;
}



export const PodBayDashboard: React.FC = () => {
  const [podId, setPodId] = useState('');
  const [message, setMessage] = useState('');
  const [ pods, setPods ] = useState([]);

  const handleAddPod = () => {
    // Add a pod
    axios.post('http://0.0.0.0:3000/api/v0/pods', {
      data: {
        id: podId
      }
    })
      .then(response => {
        setMessage(`Pod created: ${JSON.stringify(response.data)}`);
      })
      .catch(error => {
        setMessage(`Error creating pod: ${error}`);
      });
  };

  const handleDeletePod = () => {

    // Delete a pod
    axios.delete(`http://0.0.0.0:3000/api/v0/pods`, {
      data: {
        id: podId
        }
      })
      .then(response => {
        setMessage(`Pod deleted: ${JSON.stringify(response.data)}`);
      })
      .catch(error => {
        setMessage(`Error deleting pod: ${error}`);
      });
    }

  const getPods = async () => {
    const runningPods = await callGetPods();
    setPods(runningPods);
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
        <ul>
          {pods.map((pod: any, index: number) => {
            return <li key={index}>{pod.pod.name}</li>
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
        
          <button onClick={handleAddPod}>Add Pod</button>
          <button onClick={handleDeletePod}>Delete Pod</button>
        </div>

      <div>{message}</div>
      
    </div>
  </div>
  );
};