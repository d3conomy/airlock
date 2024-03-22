import { IdReferenceFormats } from "./IdReferenceConstants.js";


class IdReferenceConfigDefault {
    public static readonly idReferenceFormat: IdReferenceFormats = IdReferenceFormats.NAME;
}

class IdReferenceConfig {
    public readonly idReferenceFormat: IdReferenceFormats;

    constructor({
        idReferenceFormat
    }: {
        idReferenceFormat?: IdReferenceFormats
    }) {
        this.idReferenceFormat = idReferenceFormat ? idReferenceFormat : IdReferenceConfigDefault.idReferenceFormat;
    }
}

export {
    IdReferenceConfig,
    IdReferenceConfigDefault
}