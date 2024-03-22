var IdReferenceFormats;
(function (IdReferenceFormats) {
    IdReferenceFormats["UUID"] = "uuid";
    IdReferenceFormats["NAME"] = "name";
    IdReferenceFormats["STRING"] = "string";
    IdReferenceFormats["CUSTOM"] = "custom";
})(IdReferenceFormats || (IdReferenceFormats = {}));
var IdReferenceTypes;
(function (IdReferenceTypes) {
    IdReferenceTypes["SYSTEM"] = "system";
    IdReferenceTypes["MOONBASE"] = "moonbase";
    IdReferenceTypes["PODBAY"] = "podbay";
    IdReferenceTypes["POD"] = "pod";
    IdReferenceTypes["PROCESS"] = "process";
    IdReferenceTypes["JOB"] = "job";
})(IdReferenceTypes || (IdReferenceTypes = {}));
export { IdReferenceFormats, IdReferenceTypes };
