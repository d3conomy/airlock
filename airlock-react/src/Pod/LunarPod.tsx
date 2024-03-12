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
        <div>
            <h2>Lunar Pod | ${lunarPod.pod.name}</h2>
            <ul>
                {lunarPod.components.map((component, index) => {
                    return (
                        <li key={index}>
                            <h3>Component: {component.id?.component}</h3>
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