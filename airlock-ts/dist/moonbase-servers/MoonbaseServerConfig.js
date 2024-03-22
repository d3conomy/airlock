import { AirlockSetting } from "../airlock-config/AirlockSetting.js";
const MoonbaseServerSettings = new Map([
    ['MOONBASE_API_NAME', new AirlockSetting({
            name: 'MOONBASE_API_NAME',
            defaultValue: 'moonbase',
            description: 'The name of the server',
            required: true
        })],
    ['MOONBASE_API_PORT', new AirlockSetting({
            name: 'MOONBASE_API_PORT',
            defaultValue: '4343',
            description: 'The port to run the server on',
            required: true
        })],
    ['MOONBASE_API_HOST', new AirlockSetting({
            name: 'MOONBASE_API_HOST',
            defaultValue: 'localhost',
            description: 'The host to run the server on',
            required: true
        })],
    ['MOONBASE_API_PROTOCOL', new AirlockSetting({
            name: 'MOONBASE_API_PROTOCOL',
            defaultValue: 'http://',
            description: 'The protocol to run the server on',
            required: true
        })],
    ['MOONBASE_API_SECRET', new AirlockSetting({
            name: 'MOONBASE_API_SECRET',
            defaultValue: 'secret',
            description: 'The server secret',
            required: false
        })],
    ['MOONBASE_API_PATH', new AirlockSetting({
            name: 'MOONBASE_API_PATH',
            defaultValue: '/api',
            description: 'The path to the server',
            required: true
        })],
    ['MOONBASE_API_VERSION', new AirlockSetting({
            name: 'MOONBASE_API_VERSION',
            defaultValue: '/v0',
            description: 'The server version',
            required: true
        })],
]);
class MoonbaseServerConfig {
    settings = MoonbaseServerSettings;
    constructor({ settings }) {
        if (settings) {
            this.settings = settings;
        }
    }
}
export { MoonbaseServerConfig, MoonbaseServerSettings };
