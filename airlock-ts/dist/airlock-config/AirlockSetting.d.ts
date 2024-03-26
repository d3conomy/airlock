/**
 * AirlockSetting class
 * @description
 * This class is used to define a setting for the AirlockConfig class.
 * @summary
 * Settings are applied in the following order:
 * 1. Environment variable
 * 2. Config file
 * 3. Default value
 * @example
 * const setting = new AirlockSetting({
 *   name: 'MOONBASE_API_PORT',
 *   defaultValue: '4343',
 *   envVar: 'AIRLOCK_MOONBASE_API_PORT',
 *   description: 'The port to run the server on',
 *   required: true,
 * });
 */
declare class AirlockSetting {
    readonly name: string;
    readonly description: string;
    readonly defaultValue: string;
    readonly envVar: string;
    readonly configFileVar: string;
    readonly required: boolean;
    value?: string;
    /**
     * AirlockSetting constructor
     */
    constructor({ name, defaultValue, envVar, description, required, configFileVar }: {
        name: string;
        defaultValue: string;
        description: string;
        required: boolean;
        envVar?: string;
        configFileVar?: string;
    });
    /**
     * init method
     * @description
     * This method is used to initialize the setting.
     */
    init(configFileValue?: string): void;
}
export { AirlockSetting };
