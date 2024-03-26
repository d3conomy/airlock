import { IdReferenceFactory, SystemId } from "./id-reference-factory/index.js";
import { MoonbaseServers, MoonbaseServerUrl } from "./moonbase-servers/index.js";
import { AirlockConfig } from "./airlock-config/index.js";
declare class Airlock {
    idReferenceFactory: IdReferenceFactory;
    moonbaseServers: MoonbaseServers;
    systemId: SystemId;
    airlockConfig: AirlockConfig;
    constructor({ idReferenceFactory, moonbaseServersUrls, systemId, airlockConfig }?: {
        idReferenceFactory?: IdReferenceFactory;
        systemId?: SystemId;
        moonbaseServersUrls?: Array<MoonbaseServerUrl>;
        airlockConfig?: AirlockConfig;
    });
}
export { Airlock };
