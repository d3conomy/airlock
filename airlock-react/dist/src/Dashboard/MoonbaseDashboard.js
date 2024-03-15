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
import { LunarPod, OpenDb } from '../Pod';
import { toast } from 'react-toastify';
import { Logs } from './Logs';
var MoonbaseServerUrl = 'http://0.0.0.0:4343/api/v0';
var setMoonbaseServerUrl = function (url) {
    MoonbaseServerUrl = url;
};
var callGetPods = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios.get("".concat(MoonbaseServerUrl, "/pods"))];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
        }
    });
}); };
var callPostPods = function (podId, component) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios.post("".concat(MoonbaseServerUrl, "/pods"), {
                    id: podId,
                    component: component
                })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
        }
    });
}); };
var callPostOpen = function (podId, dbName, dbType) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios.post("".concat(MoonbaseServerUrl, "/open"), {
                        id: podId,
                        dbName: dbName,
                        dbType: dbType
                    })];
            case 1:
                response = _b.sent();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                toast.error("Error opening database: ".concat(error_1));
                return [3 /*break*/, 3];
            case 3:
                if ((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.has) {
                    toast.error("Error opening database: ".concat(response.data.error));
                }
                return [2 /*return*/, response ? response === null || response === void 0 ? void 0 : response.data : null];
        }
    });
}); };
export var MoonbaseDashboard = function () {
    var _a = useState(''), podId = _a[0], setPodId = _a[1];
    var _b = useState(''), component = _b[0], setComponent = _b[1];
    var _c = useState(''), message = _c[0], setMessage = _c[1];
    var _d = useState([]), pods = _d[0], setPods = _d[1];
    var _e = useState(false), serverConnection = _e[0], setServerConnection = _e[1];
    var _f = useState(''), dbName = _f[0], setDbName = _f[1];
    var _g = useState(''), dbType = _g[0], setDbType = _g[1];
    var _h = useState(MoonbaseServerUrl), serverUrl = _h[0], setServerUrl = _h[1];
    var handleAddPod = function () { return __awaiter(void 0, void 0, void 0, function () {
        var addResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, callPostPods(podId, component)];
                case 1:
                    addResponse = _a.sent();
                    setMessage("".concat(JSON.stringify(addResponse)));
                    return [2 /*return*/];
            }
        });
    }); };
    var getPods = function () { return __awaiter(void 0, void 0, void 0, function () {
        var runningPods, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, callGetPods()];
                case 1:
                    runningPods = _a.sent();
                    setPods(runningPods);
                    setServerConnection(true);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    setServerConnection(false);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        var interval = setInterval(function () {
            getPods();
        }, 1000);
        return function () { return clearInterval(interval); };
    });
    return (_jsxs("div", { children: [_jsx("h1", { children: "Moonbase Dashboard" }), _jsxs("div", { className: "Moonbase-control-panel-container", children: [_jsxs("div", { className: "Moonbase-control-panel", children: [_jsxs("div", { className: "Moonbase-control-panel-server", children: [_jsxs("h3", { children: ["Server: ", serverConnection ? 'Connected' : 'Disconnected'] }), _jsx("input", { type: "text", value: serverUrl, onChange: function (e) { return setServerUrl(e.target.value); }, placeholder: MoonbaseServerUrl, style: { width: '300px' } }), _jsx("button", { onClick: function () { return setMoonbaseServerUrl(serverUrl); }, children: "Reset" })] }), _jsx("br", {}), _jsx("div", { children: _jsx("button", { onClick: getPods, children: "Get Pods" }) }), _jsx("br", {}), _jsxs("div", { children: [_jsx("input", { type: "text", value: podId, onChange: function (e) { return setPodId(e.target.value); }, placeholder: "Enter pod ID" }), _jsxs("select", { value: component, onChange: function (e) { var _a; return setComponent((_a = e.target) === null || _a === void 0 ? void 0 : _a.value); }, children: [_jsx("option", { value: "orbitdb", children: "OrbitDb" }), _jsx("option", { value: "libp2p", children: "Libp2p" }), _jsx("option", { value: "ipfs", children: "IPFS" })] }), _jsx("button", { onClick: handleAddPod, children: "Add Pod" }), _jsx("br", {}), _jsx("br", {}), _jsx("input", { type: "text", value: dbName, onChange: function (e) { return setDbName(e.target.value); }, placeholder: "Enter database name" }), _jsxs("select", { value: dbType, onChange: function (e) { var _a; return setDbType((_a = e.target) === null || _a === void 0 ? void 0 : _a.value); }, children: [_jsx("option", { value: "keyvalue", children: "Key/Value" }), _jsx("option", { value: "events", children: "Event Log" }), _jsx("option", { value: "documents", children: "Docstore" })] }), _jsx("button", { onClick: function () { return callPostOpen(podId, dbName, dbType); }, children: "Open Database" })] }), _jsx("div", { className: "Moonbase-control-panel-output", children: _jsx(Logs, {}) })] }), _jsx("div", { children: (pods.length > 0) ? _jsx(OpenDb, {}) : null })] }), _jsx("div", { children: _jsx("h2", { children: "Pods" }) }), _jsx("div", { className: "pod-bay-dashboard", children: pods.map(function (pod, index) {
                    return (_jsx(LunarPod, { lunarPod: pod }, index));
                }) })] }));
};
export { MoonbaseServerUrl, setMoonbaseServerUrl };
