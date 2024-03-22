import { IdReference, JobId, MetaData, MoonbaseId, PodBayId, PodId, PodProcessId, SystemId } from "./IdReferenceClasses.js";
import { IdReferenceConfig } from "./IdReferenceConfig.js";
import { IdReferenceFormats, IdReferenceTypes } from "./IdReferenceConstants.js";


class IdReferenceFactory {
    public ids: Array<IdReference> = new Array<IdReference>();
    public config: IdReferenceConfig;

    constructor({
        idReferenceFormat,
    } : {
        idReferenceFormat?: IdReferenceFormats
    } = {}) {
        this.config = new IdReferenceConfig({idReferenceFormat});
    }

    private isUnique(name: string): boolean {
        return !this.ids.some((idRef) => idRef.name === name);
    }

    public createIdReference({
        name,
        metadata,
        format,
        type,
        dependent
    }: {
        name?: string,
        metadata?: MetaData | Map<string, any>,
        format?: IdReferenceFormats | string,
        type: IdReferenceTypes | string,
        dependent?: IdReference | string
    }): IdReference {
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


        let idref: IdReference;
        switch (type) {
            case IdReferenceTypes.SYSTEM:
                idref = new SystemId({name, metadata, format});
                break;
            case IdReferenceTypes.MOONBASE:
                idref = new MoonbaseId({name, metadata, format, systemId: dependent as SystemId});
                break;
            case IdReferenceTypes.PODBAY:
                idref = new PodBayId({name, metadata, format, moonbaseId: dependent as MoonbaseId});
                break;
            case IdReferenceTypes.POD:
                idref = new PodId({name, metadata, format, podBayId: dependent as PodBayId});
                break;
            case IdReferenceTypes.PROCESS:
                idref = new PodProcessId({name, metadata, format, podId: dependent as PodId});
                break;
            case IdReferenceTypes.JOB:
                idref = new JobId({name, metadata, format, componenetId: dependent as PodProcessId | PodId | PodBayId | MoonbaseId | SystemId});
            default:
                idref = new IdReference({name, metadata, format});
        }
        this.ids.push(idref);
        return idref;
    }

    public getIdReference(name: string): IdReference | undefined {
        return this.ids.find((idRef) => idRef.name === name);
    }

    public getAllIdReferences(): Array<IdReference> {
        return this.ids;
    }

    public getIdReferencesByType(type: IdReferenceTypes | string): Array<IdReference> {
        return this.ids.filter((idRef) => idRef.metadata.get("type") === type);
    }

    public deleteIdReference(name: string): void {
        this.ids = this.ids.filter((idRef) => idRef.name !== name);
    }

    public deleteAllIdReferences(): void {
        this.ids = new Array<IdReference>();
    }
}

export {
    IdReferenceFactory
}