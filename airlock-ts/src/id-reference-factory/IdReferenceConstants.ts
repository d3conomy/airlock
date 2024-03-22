

enum IdReferenceFormats {
    UUID = "uuid",
    NAME = "name",
    STRING = "string",
    CUSTOM = "custom"
}

enum IdReferenceTypes {
    SYSTEM = "system",
    MOONBASE = "moonbase",
    PODBAY = "podbay",
    POD = "pod",
    PROCESS = "process",
    JOB = "job",
}

export {
    IdReferenceFormats,
    IdReferenceTypes
}