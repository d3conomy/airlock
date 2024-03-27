import { 
    IdReferenceFactory,
    IdReferenceTypes,
    MoonbaseId 
} from 'd3-artifacts';

import {
    IMoonbaseServers  
} from './MoonbaseServerInterfaces.js';

import {
    MoonbaseServer
} from './MoonbaseServer.js';

import {
    MoonbaseServerUrl
} from './MoonbaseServerUrl.js';

class MoonbaseServers implements IMoonbaseServers {
    idReferenceFactory: IdReferenceFactory;
    servers: Array<MoonbaseServer>;

    constructor({
        idReferenceFactory,
        moonbaseServerUrls
    }: {
        idReferenceFactory: IdReferenceFactory,
        moonbaseServerUrls?: Array<MoonbaseServerUrl>
    }) {
        this.idReferenceFactory = idReferenceFactory;
        this.servers = new Array<MoonbaseServer>();

        if (moonbaseServerUrls) {
            moonbaseServerUrls.forEach(url => {
                this.createServer({ url });
            });
        }
    }

    addServer(server: MoonbaseServer): void {
        this.servers.push(server);
    }

    createServer({
        id,
        url,
    } : {
        id?: MoonbaseId,
        url: MoonbaseServerUrl
    
    }): MoonbaseServer {
        id = id ? id : this.idReferenceFactory.createIdReference({
            type: IdReferenceTypes.MOONBASE,
            dependent: this.idReferenceFactory.getIdReferencesByType('system')[0]
        }) as MoonbaseId;
        
        const server = new MoonbaseServer({id, url});
        this.addServer(server);
        return server;
    }

    removeServer(server: MoonbaseServer): void {
        this.servers = this.servers.filter(s => s.id !== server.id);
    }

    updateServer(server: MoonbaseServer): void {
        this.servers = this.servers.map(s => s.id === server.id ? server : s);
    }

    getServer({
        id,
        name
    }: {
        id?: MoonbaseId
        name?: MoonbaseId['name']
    }): MoonbaseServer | undefined {
        if (id && name) {
            throw new Error('Cannot specify both id and name');
        }
        if (id) {
            return this.servers.find(s => s.id === id);
        }
        return this.servers.find(s => s.id.name === name);
    }

    getServers(): Array<MoonbaseServer> {
        return this.servers;
    }

    clear(): void {
        this.servers = [];
    }
}

export {
    MoonbaseServers
}