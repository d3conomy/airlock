import React from 'react';


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

export const LunarPod: React.FC<LunarPodProps> = ({ lunarPod }) => {
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
        </div>
    );
};