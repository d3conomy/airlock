import { IdReferenceTypes } from '../id-reference-factory/index.js';
import { MoonbaseServer } from './MoonbaseServer.js';
class MoonbaseServers {
    idReferenceFactory;
    servers;
    constructor({ idReferenceFactory, moonbaseServerUrls }) {
        this.idReferenceFactory = idReferenceFactory;
        this.servers = new Array();
        if (moonbaseServerUrls) {
            moonbaseServerUrls.forEach(url => {
                this.createServer({ url });
            });
        }
    }
    addServer(server) {
        this.servers.push(server);
    }
    createServer({ id, url, }) {
        id = id ? id : this.idReferenceFactory.createIdReference({
            type: IdReferenceTypes.MOONBASE,
            dependent: this.idReferenceFactory.getIdReferencesByType('system')[0]
        });
        const server = new MoonbaseServer({ id, url });
        this.addServer(server);
        return server;
    }
    removeServer(server) {
        this.servers = this.servers.filter(s => s.id !== server.id);
    }
    updateServer(server) {
        this.servers = this.servers.map(s => s.id === server.id ? server : s);
    }
    getServer({ id, name }) {
        if (id && name) {
            throw new Error('Cannot specify both id and name');
        }
        if (id) {
            return this.servers.find(s => s.id === id);
        }
        return this.servers.find(s => s.id.name === name);
    }
    getServers() {
        return this.servers;
    }
    clear() {
        this.servers = [];
    }
}
export { MoonbaseServers };
