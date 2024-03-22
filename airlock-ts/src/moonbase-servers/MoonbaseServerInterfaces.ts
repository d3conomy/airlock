import { MoonbaseId } from "../id-reference-factory/index";
import { MoonbaseServerUrl } from "./MoonbaseServerUrl";

/**
 * @interface IMoonbaseServer
 * @description Interface for MoonbaseServer
 */
interface IMoonbaseServer {
    id: MoonbaseId;
    url: MoonbaseServerUrl;
}

/**
 * @interface IMoonbaseServers
 * @description Interface for MoonbaseServers
 */
interface IMoonbaseServers {
    servers: Array<IMoonbaseServer>;

    addServer(server: IMoonbaseServer): void;
    createServer({id, url}: {id?: MoonbaseId, url: MoonbaseServerUrl}): IMoonbaseServer;
    removeServer(server: IMoonbaseServer): void;
    updateServer(server: IMoonbaseServer): void;
    getServer({id, name}: {id?: MoonbaseId, name?: MoonbaseId['name']}): IMoonbaseServer | undefined;
    getServers(): Array<IMoonbaseServer>;
    clear(): void;
}

export {
    IMoonbaseServer,
    IMoonbaseServers
}