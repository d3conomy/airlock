/**
 * Log Level
 * @category Logging
 * @description Log levels - determine the severity of the log entry
 */
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Debug"] = 0] = "Debug";
    LogLevel[LogLevel["Info"] = 1] = "Info";
    LogLevel[LogLevel["Warning"] = 2] = "Warning";
    LogLevel[LogLevel["Error"] = 3] = "Error";
    LogLevel[LogLevel["Fatal"] = 4] = "Fatal";
})(LogLevel || (LogLevel = {}));
export { LogLevel };
