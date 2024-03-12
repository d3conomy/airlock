import React from 'react';

interface OpenDbProps {
    openDb: {
        id: number;
        name: string;
        location: string;
        capacity: number;
        status: string;
    };
}

const OpenDb: React.FC<OpenDbProps> = ({ openDb }) => {
    return (
        <div>
            <h2>Open DB Details</h2>
            <p>ID: {openDb.id}</p>
            <p>Name: {openDb.name}</p>
            <p>Location: {openDb.location}</p>
            <p>Capacity: {openDb.capacity}</p>
            <p>Status: {openDb.status}</p>
        </div>
    );
};

export default OpenDb;