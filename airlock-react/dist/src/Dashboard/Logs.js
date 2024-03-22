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
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect } from 'react';
import axios from 'axios';
import { MoonbaseServerUrl } from './MoonbaseDashboard';
/**
 * This is the interface for the log entry object that is returned from the Moonbase server.
 * @category API
 */
export var Logs = function () {
    var _a = React.useState(), logs = _a[0], setLogs = _a[1];
    var callGetLogs = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, foundLogs, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios.get("".concat(MoonbaseServerUrl, "/logs?items=10"))];
                case 1:
                    response = _a.sent();
                    data = JSON.parse(JSON.stringify(response.data));
                    foundLogs = [];
                    for (i = 0; i < data.length; i++) {
                        foundLogs.push(data[i][1]);
                    }
                    if (foundLogs.length > 0) {
                        foundLogs = foundLogs.reverse();
                    }
                    if (foundLogs === logs) {
                        return [2 /*return*/];
                    }
                    setLogs(foundLogs);
                    return [2 /*return*/];
            }
        });
    }); };
    var printLogsEntries = function () {
        if (logs) {
            return logs.map(function (log, index) {
                return (
                // Create a box with a dropdown arrow that reveals the log entry details
                _jsx("div", { className: "box", children: _jsx("article", { className: "media", children: _jsx("div", { className: "media-content", children: _jsx("div", { className: "content", children: _jsxs("p", { children: [_jsxs("span", { style: { fontWeight: 'lighter', fontVariant: 'small-caps' }, children: ["[", log.level, "]"] }), _jsxs("span", { style: { color: 'greenyellow' }, children: [" ", log.message] }), _jsx("br", {}), _jsx("small", { style: { fontStyle: 'italic', color: 'Highlight' }, children: log.timestamp }), log.error ? _jsx("br", {}) : null, log.error ? _jsx("span", { style: { color: 'red' }, children: log.error }) : null, log.podId ? _jsx("br", {}) : null, log.podId ? _jsxs("span", { style: { color: 'darkturquoise' }, children: ["Pod: ", log.podId.name] }) : null, log.processId ? _jsx("br", {}) : null, log.processId ? _jsxs("span", { style: { color: 'darkturquoise' }, children: ["Process: ", log.processId.name] }) : null, log.code ? _jsx("br", {}) : null, log.code ? _jsxs("span", { style: { color: 'darkturquoise' }, children: ["Code: ", log.code] }) : null, log.stage ? _jsx("br", {}) : null, log.stage ? _jsxs("span", { style: { color: 'darkturquoise' }, children: ["Stage: ", log.stage] }) : null] }) }) }) }) }, index));
            });
        }
    };
    useEffect(function () {
        setTimeout(function () {
            callGetLogs();
        }, 1000);
    });
    return (_jsx("div", { children: _jsx("div", { children: printLogsEntries() }) }));
};
