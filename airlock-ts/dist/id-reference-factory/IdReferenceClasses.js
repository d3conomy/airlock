import { createRandomId } from './IdReferenceFunctions.js';
/**
 * MetaData class
 */
class MetaData {
    data;
    constructor(data) {
        this.data = data ? data : new Map();
    }
    set(key, value) {
        this.data.set(key, value);
    }
    get(key) {
        return this.data.get(key);
    }
    delete(key) {
        this.data.delete(key);
    }
    has(key) {
        return this.data.has(key);
    }
    update(key, value) {
        if (this.has(key)) {
            this.set(key, value);
        }
        else {
            throw new Error(`MetaData: Key ${key} does not exist`);
        }
    }
    clear() {
        this.data.clear();
    }
}
/**
 * Id reference class
 */
class IdReference {
    name;
    metadata;
    constructor({ name, metadata, format }) {
        this.name = name ? name : createRandomId(format);
        this.metadata = metadata ? metadata : new MetaData();
    }
    toString() {
        return this.name;
    }
}
class SystemId extends IdReference {
    constructor({ name, metadata, format } = {}) {
        super({ name, metadata, format });
    }
}
class MoonbaseId extends IdReference {
    systemId;
    constructor({ systemId, name, metadata, format }) {
        super({ name, metadata, format });
        this.systemId = systemId;
    }
}
class PodBayId extends IdReference {
    moonbaseId;
    constructor({ moonbaseId, name, metadata, format }) {
        super({ name, metadata, format });
        this.moonbaseId = moonbaseId;
    }
}
class PodId extends IdReference {
    podBayId;
    constructor({ podBayId, name, metadata, format }) {
        super({ name, metadata, format });
        this.podBayId = podBayId;
    }
}
class PodProcessId extends IdReference {
    podId;
    constructor({ podId, name, metadata, format }) {
        super({ name, metadata, format });
        this.podId = podId;
    }
}
class JobId extends IdReference {
    componenetId;
    constructor({ componenetId, name, metadata, format }) {
        super({ name, metadata, format });
        this.componenetId = componenetId;
    }
}
export { MetaData, IdReference, SystemId, MoonbaseId, PodBayId, PodId, PodProcessId, JobId };
