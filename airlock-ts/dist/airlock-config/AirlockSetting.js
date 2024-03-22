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
class AirlockSetting {
    name;
    description;
    defaultValue;
    envVar;
    configFileVar;
    required;
    value;
    /**
     * AirlockSetting constructor
     */
    constructor({ name, defaultValue, envVar, description, required, configFileVar }) {
        this.name = name;
        this.defaultValue = defaultValue;
        this.description = description;
        this.required = required;
        this.envVar = envVar ? envVar : `AIRLOCK_${name.toUpperCase()}`;
        this.configFileVar = configFileVar ? configFileVar : name.toUpperCase();
    }
    /**
     * init method
     * @description
     * This method is used to initialize the setting.
     */
    init(configFileValue) {
        this.value = process.env[this.envVar] || configFileValue || this.defaultValue;
    }
}
export { AirlockSetting };
