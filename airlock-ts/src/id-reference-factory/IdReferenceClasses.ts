import {
    IIdReference,
    IMetaData,
    ISystemId,
    IMoonbaseId,
    IPodBayId,
    IPodId,
    IPodProcessId,
    IJobId,
} from './IdReferenceInterfaces.js';

import {
    IdReferenceFormats,
} from './IdReferenceConstants.js';

import {
    createRandomId
} from './IdReferenceFunctions.js';


/**
 * MetaData class
 */
class MetaData 
    implements IMetaData 
{
    public data: Map<string, any>;

    constructor(data?: Map<string, any>) {
        this.data = data ? data : new Map();
    }

    public set(key: string, value: any): void {
        this.data.set(key, value);
    }

    public get(key: string): any {
        return this.data.get(key);
    }

    public delete(key: string): void {
        this.data.delete(key);
    }

    public has(key: string): boolean {
        return this.data.has(key);
    }

    public update(key: string, value: any): void {
        if (this.has(key)) {
            this.set(key, value);
        }
        else {
            throw new Error(`MetaData: Key ${key} does not exist`);
        }
    }

    public clear(): void {
        this.data.clear();
    }
}

/**
 * Id reference class
 */
class IdReference 
    implements IIdReference 
{
    public readonly name: string;
    public metadata: MetaData;

    constructor({
        name,
        metadata,
        format
    }: {
        name?: string,
        metadata?: MetaData,
        format?: IdReferenceFormats | string
    }) {
        this.name = name ? name : createRandomId(format);
        this.metadata = metadata ? metadata : new MetaData();
    }

    public toString(): string {
        return this.name;
    }
}

class SystemId
    extends IdReference 
    implements ISystemId
{
    constructor({
        name,
        metadata,
        format
    }: {
        name?: string,
        metadata?: MetaData,
        format?: IdReferenceFormats | string
    } = {}) {
        super({name, metadata, format});
    }
}

class MoonbaseId
    extends IdReference 
    implements IMoonbaseId
{
    public systemId: SystemId;

    constructor({
        systemId,
        name,
        metadata,
        format
    }: {
        systemId: SystemId,
        name?: string,
        metadata?: MetaData,
        format?: IdReferenceFormats | string
    }) {
        super({name, metadata, format});
        this.systemId = systemId;
    }
}

class PodBayId 
    extends IdReference 
    implements IPodBayId
{
    public moonbaseId: MoonbaseId;

    constructor({
        moonbaseId,
        name,
        metadata,
        format
    }: {
        moonbaseId: MoonbaseId,
        name?: string,
        metadata?: MetaData,
        format?: IdReferenceFormats | string
    }) {
        super({name, metadata, format});
        this.moonbaseId = moonbaseId;
    }
}

class PodId 
    extends IdReference 
    implements IPodId
{
    public podBayId: PodBayId;

    constructor({
        podBayId,
        name,
        metadata,
        format
    }: {
        podBayId: PodBayId,
        name?: string,
        metadata?: MetaData,
        format?: IdReferenceFormats | string
    }) {
        super({name, metadata, format});
        this.podBayId = podBayId;
    }
}

class PodProcessId 
    extends IdReference 
    implements IPodProcessId
{
    public podId: PodId;

    constructor({
        podId,
        name,
        metadata,
        format
    }: {
        podId: PodId,
        name?: string,
        metadata?: MetaData,
        format?: IdReferenceFormats | string
    }) {
        super({name, metadata, format});
        this.podId = podId;
    }
}

class JobId
    extends IdReference 
    implements IJobId
{
    public componenetId: PodProcessId | PodId | PodBayId | MoonbaseId | SystemId;

    constructor({
        componenetId,
        name,
        metadata,
        format
    }: {
        componenetId: PodProcessId | PodId | PodBayId | MoonbaseId | SystemId,
        name?: string,
        metadata?: MetaData,
        format?: IdReferenceFormats | string
    }) {
        super({name, metadata, format});
        this.componenetId = componenetId;
    }
}

export {
    MetaData,
    IdReference,
    SystemId,
    MoonbaseId,
    PodBayId,
    PodId,
    PodProcessId,
    JobId
}

