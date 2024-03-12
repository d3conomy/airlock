import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';


const MoonbaseServerUrl = 'http://0.0.0.0:3000/api/v0';

interface IdReference {
    name: string;
    component: string;
}

interface PodStatus {
    stage: string;
    message: string;
    updated: string;
}

interface PodComponents {
    id: IdReference;
    status: PodStatus
}

interface _LunarPod {
    pod: IdReference;
    components: PodComponents[];
}

interface LunarPodProps {
    lunarPod: _LunarPod;
}

const callDeletePods = async (podId: string) => {
    const response = await axios.delete(`${MoonbaseServerUrl}/pods`, {
        data: {
            id: podId
        }
    });
    return response.data;
}

export const LunarPod: React.FC<LunarPodProps> = ({ lunarPod }) => {
    const handleDeletePod = async () => {
        // Delete a pod
        const deleteResponse: AxiosResponse = await callDeletePods(lunarPod.pod.name);
        toast.success(`Pod deleted: ${JSON.stringify(deleteResponse)}`)
    }

    return (
        <div style={{
            border: '1px solid black',
            padding: '10px',
            margin: '10px',
            backgroundColor: 'lightgrey',
            textAlign: 'left',
            maxWidth: '512px'
        }}>
            <h2 style={{ textAlign: "center" }}>{lunarPod.pod.name}</h2>
            <ul>
                {lunarPod.components.map((component, index) => {
                    return (
                        <li key={index}>
                            <h3>{component.id?.component}</h3>
                            <p>Status: {component.status?.stage}</p>
                            <p>Message: {component.status?.message}</p>
                            <p>Updated: {component.status?.updated}</p>
                        </li>
                    );
                })}
            </ul>

            <div>
                <button onClick={handleDeletePod}>Delete Pod</button>
            </div>
        </div>
    );
};