import { IdReferenceFormats } from "./IdReferenceConstants.js";
class IdReferenceConfigDefault {
    static idReferenceFormat = IdReferenceFormats.NAME;
}
class IdReferenceConfig {
    idReferenceFormat;
    constructor({ idReferenceFormat }) {
        this.idReferenceFormat = idReferenceFormat ? idReferenceFormat : IdReferenceConfigDefault.idReferenceFormat;
    }
}
export { IdReferenceConfig, IdReferenceConfigDefault };
