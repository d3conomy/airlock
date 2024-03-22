import { Airlock } from '../index.js';
import { DatabaseTypes, PodCommandArgs, PodCommands, PodInfoTypes } from '../moonbase-api-client/index.js';
import { MoonbaseServer } from '../moonbase-servers/MoonbaseServer.js';
import { MoonbaseServerUrl } from '../moonbase-servers/MoonbaseServerUrl.js';

const airlock = new Airlock();

console.log(airlock);

const moonbaseServerUrl = new MoonbaseServerUrl({
    stringUrl: 'http://0.0.0.0:4343/api/v0'
});

console.log(moonbaseServerUrl);

const testServer: MoonbaseServer = airlock.moonbaseServers.createServer({ url: moonbaseServerUrl });

console.log(airlock.moonbaseServers.servers);

console.log(await testServer.ping());

console.log(await testServer.pods());

console.log(await testServer.deployPod('test'));

console.log(await testServer.pods());

console.log(await testServer.deletePod('test'));

console.log(await testServer.pods());

console.log(await testServer.deployPod('test', 'libp2p'));

console.log(await testServer.pods());

console.log(await testServer.startPod('test', 'libp2p'));

console.log(await testServer.pods());

console.log(await testServer.getPodInfo('test', PodInfoTypes.Components));
console.log(await testServer.getPodInfo('test', PodInfoTypes.PeerId));
console.log(await testServer.getPodInfo('test', PodInfoTypes.MultiAddrs));
console.log(await testServer.getPodInfo('test', PodInfoTypes.Peers));
console.log(await testServer.getPodInfo('test', PodInfoTypes.Connections));
console.log(await testServer.getPodInfo('test', PodInfoTypes.Protocols));

console.log(await testServer.restartPod('test', 'libp2p'));

console.log(await testServer.stopPod('test', 'libp2p'));

console.log(await testServer.pods());

console.log(await testServer.deletePod('test'));

console.log(await testServer.pods());

console.log(await testServer.deployPod('test', 'ipfs'));

console.log(await testServer.startPod('test', 'ipfs'));

console.log(await testServer.addJsonToIpfs('test', { test: 'test' }));

console.log(await testServer.getJsonFromIpfs('test', 'baguqeeranrfuxsa3scibqessoex6btrdya7xpahjvdfr23qy4t6spzjnd6gq'));

console.log((await testServer.apiClient.podCommand(
    'test',
    PodCommands.Dial,
    new PodCommandArgs({
        address: '/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ'
    })
)).data);

console.log(await testServer.dial(
    'test',
    '/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ'
));




console.log(await testServer.openDatabase('test-db', DatabaseTypes.EVENTS));

console.log(await testServer.stopPod('test', 'ipfs'));
console.log(await testServer.deletePod('test'));

console.log(await testServer.logs());