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
import { toast } from 'react-toastify';
import { MoonbaseServerUrl } from '../Dashboard/index.js';
var callDeletePods = function (podId) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios.delete("".concat(MoonbaseServerUrl, "/pods"), {
                    data: {
                        id: podId
                    }
                })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
        }
    });
}); };
var callGetPodInfo = function (podId, info) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios.get("".concat(MoonbaseServerUrl, "/pod/").concat(podId, "?info=").concat(info))];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
        }
    });
}); };
var callPostPod = function (podId, command, args) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios.post("".concat(MoonbaseServerUrl, "/pod/").concat(podId), {
                    command: command,
                    args: args
                })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
        }
    });
}); };
export var LunarPod = function (_a) {
    var _b, _c, _d, _e, _f;
    var lunarPod = _a.lunarPod;
    var _g = useState({
        peerId: '',
        multiaddrs: [],
        protocols: []
    }), info = _g[0], setInfo = _g[1];
    var _h = useState('dial'), postCommand = _h[0], setPostCommand = _h[1];
    var _j = useState({
        address: "/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ"
    }), args = _j[0], setArgs = _j[1];
    var handleDeletePod = function () { return __awaiter(void 0, void 0, void 0, function () {
        var deleteResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, callDeletePods(lunarPod.pod.name)];
                case 1:
                    deleteResponse = _a.sent();
                    toast.success("Pod deleted: ".concat(JSON.stringify(deleteResponse)));
                    return [2 /*return*/];
            }
        });
    }); };
    var handleGetPodInfo = function () { return __awaiter(void 0, void 0, void 0, function () {
        var podId, peerId, multiaddrs, protocols;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    podId = (_a = lunarPod.pod) === null || _a === void 0 ? void 0 : _a.name;
                    return [4 /*yield*/, callGetPodInfo(podId, 'peerid')];
                case 1:
                    peerId = _b.sent();
                    return [4 /*yield*/, callGetPodInfo(podId, 'multiaddrs')];
                case 2:
                    multiaddrs = _b.sent();
                    return [4 /*yield*/, callGetPodInfo(podId, 'protocols')];
                case 3:
                    protocols = _b.sent();
                    setInfo({
                        peerId: peerId,
                        multiaddrs: multiaddrs,
                        protocols: protocols
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    var handlePostPod = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, callPostPod((_a = lunarPod.pod) === null || _a === void 0 ? void 0 : _a.name, postCommand, args)];
                case 1:
                    response = _b.sent();
                    toast.success("Command sent: ".concat(JSON.stringify(response)));
                    return [2 /*return*/, response];
            }
        });
    }); };
    useEffect(function () {
        var interval = setInterval(function () {
            var _a;
            try {
                if (((_a = lunarPod.pod) === null || _a === void 0 ? void 0 : _a.name) !== '') {
                    handleGetPodInfo().catch(function (error) {
                        console.error(error);
                    });
                }
            }
            catch (error) {
                console.error(error);
            }
        }, 1000);
        return function () { return clearInterval(interval); };
    });
    return (_jsxs("div", { style: {
            border: '1px solid black',
            padding: '10px',
            margin: '10px',
            backgroundColor: 'lightgrey',
            textAlign: 'left',
            overflow: 'clip',
            maxWidth: '512px'
        }, children: [_jsx("h2", { style: { textAlign: "center" }, children: lunarPod.pod.name }), _jsxs("div", { children: [_jsxs("select", { value: postCommand ? postCommand : 'dial', onChange: function (e) { var _a; return setPostCommand((_a = e.target) === null || _a === void 0 ? void 0 : _a.value); }, style: { width: '128px' }, children: [_jsx("option", { value: "dial", children: "dial" }), _jsx("option", { value: "dialprotocol", children: "dial protocol" }), _jsx("option", { value: "addjson", children: "add json" }), _jsx("option", { value: "getjson", children: "get json" })] }), postCommand === 'dial' || postCommand === "dialprotocol" ?
                        _jsx("input", { type: "text", value: args.address, onChange: function (e) { return setArgs({
                                address: e.target.value,
                                protocol: args.protocol
                            }); }, style: { width: '300px' } })
                        : null, postCommand === 'dialprotocol' ?
                        _jsx("input", { type: "text", value: args.protocol, onChange: function (e) { return setArgs({
                                address: args.address,
                                protocol: e.target.value
                            }); }, style: { width: '300px' } })
                        : null, postCommand === 'addjson' ?
                        _jsx("input", { type: "text", value: (_b = args.data) === null || _b === void 0 ? void 0 : _b.name, onChange: function (e) { var _a; return setArgs({ data: { name: (_a = e.target) === null || _a === void 0 ? void 0 : _a.value } }); }, style: { width: '300px' } })
                        : null, postCommand === 'getjson' ?
                        _jsx("input", { type: "text", value: (_c = args.data) === null || _c === void 0 ? void 0 : _c.cid, onChange: function (e) { var _a; return setArgs({ data: { cid: (_a = e.target) === null || _a === void 0 ? void 0 : _a.value } }); }, style: { width: '300px' } })
                        : null, _jsx("button", { onClick: handlePostPod, children: "Send Command" }), _jsx("button", { onClick: handleDeletePod, children: "Delete Pod" })] }), _jsxs("p", { children: ["Peer Id: ", info === null || info === void 0 ? void 0 : info.peerId] }), _jsxs("p", { children: ["Multiaddrs: ", (_d = info.multiaddrs) === null || _d === void 0 ? void 0 : _d.map(function (addr, index) {
                        return _jsxs("span", { children: [addr, _jsx("br", {})] }, index);
                    })] }), _jsxs("p", { children: ["Protocols:", _jsx("br", {}), (_e = info.protocols) === null || _e === void 0 ? void 0 : _e.map(function (protocol, index) {
                        return _jsxs("span", { children: [protocol, _jsx("br", {})] }, index);
                    })] }), _jsx("ul", { children: (_f = lunarPod.components) === null || _f === void 0 ? void 0 : _f.map(function (component, index) {
                    var _a, _b, _c, _d, _e;
                    // if (component.id.component !== 'opendb') {
                    return (_jsxs("li", { children: [_jsxs("h3", { children: [(_a = component.id) === null || _a === void 0 ? void 0 : _a.component, " | ", (_b = component.id) === null || _b === void 0 ? void 0 : _b.name] }), _jsxs("p", { children: ["Status: ", (_c = component.status) === null || _c === void 0 ? void 0 : _c.stage] }), _jsxs("p", { children: ["Message: ", (_d = component.status) === null || _d === void 0 ? void 0 : _d.message] }), _jsxs("p", { children: ["Updated: ", (_e = component.status) === null || _e === void 0 ? void 0 : _e.updated] })] }, index));
                    // }
                    // if (component.id.component === 'opendb') {
                    // }
                }) })] }));
};
