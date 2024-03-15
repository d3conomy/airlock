var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MoonbaseServerUrl } from '../Dashboard';
var callGetOpenDbs = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios.get("".concat(MoonbaseServerUrl, "/open"))];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
        }
    });
}); };
var callGetDb = function (dbName) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios.get("".concat(MoonbaseServerUrl, "/db/").concat(dbName))];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
        }
    });
}); };
var callPostDb = function (dbName, command, args) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios.post("".concat(MoonbaseServerUrl, "/db/").concat(dbName), {
                    command: command,
                    args: args
                })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
        }
    });
}); };
export var OpenDb = function () {
    var _a = useState({ databases: new Array() }), openDbsList = _a[0], setOpenDbsList = _a[1];
    var _b = useState([]), openDbs = _b[0], setOpenDbs = _b[1];
    useEffect(function () {
        var interval = setInterval(function () {
            var getOpenDbs = function () { return __awaiter(void 0, void 0, void 0, function () {
                var revisedOpenDbs, currentOpenDbs, _i, _a, dbName, db, openDb, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, callGetOpenDbs()];
                        case 1:
                            revisedOpenDbs = _b.sent();
                            setOpenDbsList(revisedOpenDbs);
                            currentOpenDbs = new Array();
                            _i = 0, _a = openDbsList.databases;
                            _b.label = 2;
                        case 2:
                            if (!(_i < _a.length)) return [3 /*break*/, 7];
                            dbName = _a[_i];
                            _b.label = 3;
                        case 3:
                            _b.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, callGetDb(dbName)];
                        case 4:
                            db = _b.sent();
                            if (db === undefined) {
                                return [3 /*break*/, 6];
                            }
                            else {
                                openDb = {
                                    name: db.id,
                                    type: db.type,
                                    address: db.address
                                };
                                currentOpenDbs.push(openDb);
                            }
                            return [3 /*break*/, 6];
                        case 5:
                            error_1 = _b.sent();
                            console.error(error_1);
                            return [3 /*break*/, 6];
                        case 6:
                            _i++;
                            return [3 /*break*/, 2];
                        case 7:
                            setOpenDbs(currentOpenDbs);
                            return [2 /*return*/];
                    }
                });
            }); };
            getOpenDbs();
        }, 1000);
        return function () { return clearInterval(interval); };
    });
    return (_jsxs("div", { className: "Moonbase-dashboard-opendbs", children: [_jsx("h3", { children: "Open Databases" }), _jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Name" }), _jsx("th", { children: "Type" }), _jsx("th", { children: "Address" })] }) }), _jsx("tbody", { children: openDbs.map(function (openDb, index) { return (_jsxs("tr", { children: [_jsx("td", { children: openDb.name }), _jsx("td", { children: openDb.type }), _jsx("td", { children: openDb.address })] }, index)); }) })] })] }));
};
export default OpenDb;
