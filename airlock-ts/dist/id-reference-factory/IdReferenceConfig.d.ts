import { IdReferenceFormats } from "./IdReferenceConstants.js";
declare class IdReferenceConfigDefault {
    static readonly idReferenceFormat: IdReferenceFormats;
}
declare class IdReferenceConfig {
    readonly idReferenceFormat: IdReferenceFormats;
    constructor({ idReferenceFormat }: {
        idReferenceFormat?: IdReferenceFormats;
    });
}
export { IdReferenceConfig, IdReferenceConfigDefault };
