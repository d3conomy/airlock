

enum LogLevel {
    Debug = "debug",
    Info = "info",
    Warn = "warn",
    Error = "error"
}

class AirlockConfig {
    public logLevel: LogLevel = LogLevel.Info;
}

export {
    AirlockConfig
}