import { IdReference, JobId, MetaData, MoonbaseId, PodBayId, PodId, PodProcessId, SystemId } from "./IdReferenceClasses.js";
import { IdReferenceConfig } from "./IdReferenceConfig.js";
import { IdReferenceTypes } from "./IdReferenceConstants.js";
class IdReferenceFactory {
    ids = new Array();
    config;
    constructor({ idReferenceFormat, } = {}) {
        this.config = new IdReferenceConfig({ idReferenceFormat });
    }
    isUnique(name) {
        return !this.ids.some((idRef) => idRef.name === name);
    }
    createIdReference({ name, metadata, format, type, dependent }) {
        if (!type) {
            throw new Error("IdReferenceFactory: type is required");
        }
        if (name && !this.isUnique(name)) {
            throw new Error(`IdReferenceFactory: IdReference with name ${name} already exists`);
        }
        if (!format && !name) {
            format = this.config.idReferenceFormat;
        }
        if (metadata instanceof Map) {
            metadata = new MetaData(metadata);
        }
        else {
            metadata = metadata ? metadata : new MetaData();
        }
        metadata.set("dateCreated", new Date());
        metadata.set("type", type);
        let idref;
        switch (type) {
            case IdReferenceTypes.SYSTEM:
                idref = new SystemId({ name, metadata, format });
                break;
            case IdReferenceTypes.MOONBASE:
                idref = new MoonbaseId({ name, metadata, format, systemId: dependent });
                break;
            case IdReferenceTypes.PODBAY:
                idref = new PodBayId({ name, metadata, format, moonbaseId: dependent });
                break;
            case IdReferenceTypes.POD:
                idref = new PodId({ name, metadata, format, podBayId: dependent });
                break;
            case IdReferenceTypes.PROCESS:
                idref = new PodProcessId({ name, metadata, format, podId: dependent });
                break;
            case IdReferenceTypes.JOB:
                idref = new JobId({ name, metadata, format, componenetId: dependent });
            default:
                idref = new IdReference({ name, metadata, format });
        }
        this.ids.push(idref);
        return idref;
    }
    getIdReference(name) {
        return this.ids.find((idRef) => idRef.name === name);
    }
    getAllIdReferences() {
        return this.ids;
    }
    getIdReferencesByType(type) {
        return this.ids.filter((idRef) => idRef.metadata.get("type") === type);
    }
    deleteIdReference(name) {
        this.ids = this.ids.filter((idRef) => idRef.name !== name);
    }
    deleteAllIdReferences() {
        this.ids = new Array();
    }
}
export { IdReferenceFactory };
