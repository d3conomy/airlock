import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import logo from './d3logo-green.svg';
import './App.css';
import { MoonbaseDashboard } from './Dashboard';
var App = function () {
    return (_jsxs("div", { className: "App", style: { backgroundColor: 'grey' }, children: [_jsx("div", { className: "App-header", children: _jsx("img", { src: logo, className: "App-logo", alt: "logo", width: "128" }) }), _jsx("div", { children: _jsx(MoonbaseDashboard, {}) }), _jsx("div", { className: "App-footer", children: _jsx("p", { children: "d3" }) })] }));
};
export default App;
export * from './Dashboard';
export * from './Pod';
