import { IdReferenceFactory, SystemId, IdReferenceTypes } from "d3-artifacts";
import { MoonbaseServers, MoonbaseServerUrl } from "./moonbase-servers/index.js";
import { AirlockConfig } from "./airlock-config/index.js";

class Airlock {
    public idReferenceFactory: IdReferenceFactory;
    public moonbaseServers: MoonbaseServers;
    public systemId: SystemId;
    public airlockConfig: AirlockConfig;

    constructor({
        idReferenceFactory,
        moonbaseServersUrls,
        systemId,
        airlockConfig
    }: {
        idReferenceFactory?: IdReferenceFactory,
        systemId?: SystemId,
        moonbaseServersUrls?: Array<MoonbaseServerUrl>,
        airlockConfig?: AirlockConfig
    } = {}) {
        this.idReferenceFactory = idReferenceFactory ? idReferenceFactory : new IdReferenceFactory();
        this.systemId = systemId ? systemId : this.idReferenceFactory.createIdReference({type: IdReferenceTypes.SYSTEM}) as SystemId;
        this.moonbaseServers = new MoonbaseServers({idReferenceFactory: this.idReferenceFactory, moonbaseServerUrls: moonbaseServersUrls});
        this.airlockConfig = airlockConfig ? airlockConfig : new AirlockConfig();
    }
}

export {
    Airlock
}