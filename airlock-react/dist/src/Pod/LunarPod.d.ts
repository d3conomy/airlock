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
    status: PodStatus;
}
interface _LunarPod {
    pod: IdReference;
    components: PodComponents[];
}
interface LunarPodProps {
    lunarPod: _LunarPod;
}
export declare const LunarPod: React.FC<LunarPodProps>;
export {};
