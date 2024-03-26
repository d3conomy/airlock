import { AirlockSetting } from "../airlock-config/AirlockSetting.js";
declare const MoonbaseServerSettings: Map<string, AirlockSetting>;
declare class MoonbaseServerConfig {
    settings: Map<AirlockSetting['name'], AirlockSetting>;
    constructor({ settings }: {
        settings?: Map<AirlockSetting['name'], AirlockSetting>;
    });
}
export { MoonbaseServerConfig, MoonbaseServerSettings };
