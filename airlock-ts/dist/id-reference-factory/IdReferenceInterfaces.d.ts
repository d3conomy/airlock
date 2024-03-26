import { IdReferenceFormats } from "./IdReferenceConstants.js";
interface IMetaData {
    [key: string]: any;
}
interface IIdReference {
    name: string;
    metadata: IMetaData;
    toString(): string;
}
interface ISystemId extends IIdReference {
}
interface IMoonbaseId extends IIdReference {
    systemId: ISystemId;
}
interface IPodBayId extends IIdReference {
    moonbaseId: IMoonbaseId;
}
interface IPodId extends IIdReference {
    podBayId: IPodBayId;
}
interface IPodProcessId extends IIdReference {
    podId: IPodId;
}
interface IJobId extends IIdReference {
    componenetId: IPodProcessId | IPodId | IPodBayId | IMoonbaseId | ISystemId;
}
interface IIdReferenceFactory {
    ids: Array<IIdReference>;
    isUnique(name: string): boolean;
    createIdReference(name: string, metadata?: IMetaData, format?: IdReferenceFormats): IIdReference;
    getIdReference(name: string): IIdReference | undefined;
    deleteIdReference(name: string): void;
    deleteAllIdReferences(): void;
}
export { IMetaData, IIdReference, ISystemId, IMoonbaseId, IPodBayId, IPodId, IPodProcessId, IJobId, IIdReferenceFactory };
