import {
    MoonbaseId
} from '../id-reference-factory/index.js';

import {
    IMoonbaseServer
} from './MoonbaseServerInterfaces';
import { MoonbaseServerUrl } from './MoonbaseServerUrl.js';

class MoonbaseServer implements IMoonbaseServer {
    id: MoonbaseId;
    url: MoonbaseServerUrl;

    constructor({
        id,
        url
    }: {
        id: MoonbaseId,
        url: MoonbaseServerUrl
    }) {
        this.id = id;
        this.url = url;
    }
}

export {
    MoonbaseServer
}