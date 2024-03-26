import { IdReferenceFactory, MoonbaseId } from '../id-reference-factory/index.js';
import { IMoonbaseServers } from './MoonbaseServerInterfaces.js';
import { MoonbaseServer } from './MoonbaseServer.js';
import { MoonbaseServerUrl } from './MoonbaseServerUrl.js';
declare class MoonbaseServers implements IMoonbaseServers {
    idReferenceFactory: IdReferenceFactory;
    servers: Array<MoonbaseServer>;
    constructor({ idReferenceFactory, moonbaseServerUrls }: {
        idReferenceFactory: IdReferenceFactory;
        moonbaseServerUrls?: Array<MoonbaseServerUrl>;
    });
    addServer(server: MoonbaseServer): void;
    createServer({ id, url, }: {
        id?: MoonbaseId;
        url: MoonbaseServerUrl;
    }): MoonbaseServer;
    removeServer(server: MoonbaseServer): void;
    updateServer(server: MoonbaseServer): void;
    getServer({ id, name }: {
        id?: MoonbaseId;
        name?: MoonbaseId['name'];
    }): MoonbaseServer | undefined;
    getServers(): Array<MoonbaseServer>;
    clear(): void;
}
export { MoonbaseServers };
