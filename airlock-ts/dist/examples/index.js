import { Airlock } from '../index.js';
import { MoonbaseServerUrl } from '../moonbase-servers/MoonbaseServerUrl.js';
const airlock = new Airlock();
console.log(airlock);
const moonbaseServerUrl = new MoonbaseServerUrl({
    stringUrl: 'http://0.0.0.0:4343/api/v0'
});
console.log(moonbaseServerUrl);
const testServer = airlock.moonbaseServers.createServer({ url: moonbaseServerUrl });
console.log(airlock.moonbaseServers.servers);
console.log(await testServer.ping());
