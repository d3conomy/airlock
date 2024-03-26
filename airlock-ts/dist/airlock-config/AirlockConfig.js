var LogLevel;
(function (LogLevel) {
    LogLevel["Debug"] = "debug";
    LogLevel["Info"] = "info";
    LogLevel["Warn"] = "warn";
    LogLevel["Error"] = "error";
})(LogLevel || (LogLevel = {}));
class AirlockConfig {
    logLevel = LogLevel.Info;
}
export { AirlockConfig };
