import { IdReference, MetaData } from "./IdReferenceClasses.js";
import { IdReferenceConfig } from "./IdReferenceConfig.js";
import { IdReferenceFormats, IdReferenceTypes } from "./IdReferenceConstants.js";
declare class IdReferenceFactory {
    ids: Array<IdReference>;
    config: IdReferenceConfig;
    constructor({ idReferenceFormat, }?: {
        idReferenceFormat?: IdReferenceFormats;
    });
    private isUnique;
    createIdReference({ name, metadata, format, type, dependent }: {
        name?: string;
        metadata?: MetaData | Map<string, any>;
        format?: IdReferenceFormats | string;
        type: IdReferenceTypes | string;
        dependent?: IdReference | string;
    }): IdReference;
    getIdReference(name: string): IdReference | undefined;
    getAllIdReferences(): Array<IdReference>;
    getIdReferencesByType(type: IdReferenceTypes | string): Array<IdReference>;
    deleteIdReference(name: string): void;
    deleteAllIdReferences(): void;
}
export { IdReferenceFactory };
