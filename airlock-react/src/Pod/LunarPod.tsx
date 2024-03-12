import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { MoonbaseServerUrl } from '../Dashboard';
import { OpenDb } from './OpenDb';

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

interface LunarPodInfo {
    peerId: string;
    multiaddrs: string[];
    protocols: string[];

}

const callDeletePods = async (podId: string) => {
    const response = await axios.delete(`${MoonbaseServerUrl}/pods`, {
        data: {
            id: podId
        }
    });
    return response.data;
}

const callGetPodInfo = async (podId: string, info: string) => {
    const response = await axios.get(`${MoonbaseServerUrl}/pod/${podId}?info=${info}`);
    return response.data;
}

export const LunarPod: React.FC<LunarPodProps> = ({ lunarPod }) => {
    const [info, setInfo] = useState<LunarPodInfo>({
        peerId: '',
        multiaddrs: [],
        protocols: []
    });

    const handleDeletePod = async () => {
        // Delete a pod
        const deleteResponse = await callDeletePods(lunarPod.pod.name);
        toast.success(`Pod deleted: ${JSON.stringify(deleteResponse)}`)
    }

    const handleGetPodInfo = async () => {
        const podId: string = lunarPod.pod?.name;
        const peerId: string = await callGetPodInfo(podId, 'peerid');
        const multiaddrs: string[] = await callGetPodInfo(podId, 'multiaddrs');
        const protocols: string[] = await callGetPodInfo(podId, 'protocols');

        setInfo({
            peerId: peerId,
            multiaddrs: multiaddrs,
            protocols: protocols
        });
    }

    useEffect(() => {
        const interval = setInterval(() => {
            try {

                if (lunarPod.pod?.name !== '') {
                    handleGetPodInfo().catch((error) => {
                        console.error(error);
                    })
                }
            }
            catch (error) {
                console.error(error);
            }
        }, 1000);

        return () => clearInterval(interval);
    });

    return (
        <div style={{
            border: '1px solid black',
            padding: '10px',
            margin: '10px',
            backgroundColor: 'lightgrey',
            textAlign: 'left',
            overflow: 'clip',
            maxWidth: '512px'
        }}>
            <h2 style={{ textAlign: "center" }}>{lunarPod.pod.name}</h2>

            <div>
                <button onClick={handleDeletePod}>Delete Pod</button>
            </div>

            <p>Peer Id: {info?.peerId}</p>
            <p>Multiaddrs: {info.multiaddrs?.map((addr, index) =>{
                return <span key={index}>{addr}<br/></span>
            })}</p>
            <p>Protocols: 
                <br />
                {info.protocols?.map((protocol, index) =>{
                return <span key={index}>{protocol}<br/></span>

            })}</p>
            <ul>
                {lunarPod.components?.map((component, index) => {
                    // if (component.id.component !== 'opendb') {
                        return (
                            <li key={index}>
                                <h3>{component.id?.component} | {component.id?.name}</h3>
                                <p>Status: {component.status?.stage}</p>
                                <p>Message: {component.status?.message}</p>
                                <p>Updated: {component.status?.updated}</p>
                            </li>
                        );
                    // }
                    // if (component.id.component === 'opendb') {
                        
                    // }
                })}
            </ul>
        </div>
    );
};