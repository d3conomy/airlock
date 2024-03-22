import { IdReferenceFactory, IdReferenceTypes } from "./id-reference-factory/index.js";
import { MoonbaseServers } from "./moonbase-servers/index.js";
import { AirlockConfig } from "./airlock-config/index.js";
class Airlock {
    idReferenceFactory;
    moonbaseServers;
    systemId;
    airlockConfig;
    constructor({ idReferenceFactory, moonbaseServersUrls, systemId, airlockConfig } = {}) {
        this.idReferenceFactory = idReferenceFactory ? idReferenceFactory : new IdReferenceFactory();
        this.systemId = systemId ? systemId : this.idReferenceFactory.createIdReference({ type: IdReferenceTypes.SYSTEM });
        this.moonbaseServers = new MoonbaseServers({ idReferenceFactory: this.idReferenceFactory, moonbaseServerUrls: moonbaseServersUrls });
        this.airlockConfig = airlockConfig ? airlockConfig : new AirlockConfig();
    }
}
export { Airlock };
