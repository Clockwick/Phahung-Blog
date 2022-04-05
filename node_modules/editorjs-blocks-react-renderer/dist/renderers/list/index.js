"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var html_react_parser_1 = __importDefault(require("html-react-parser"));
var Bullet = function (_a) {
    var children = _a.children;
    return react_1.default.createElement("li", null, children);
};
var Group = function (_a) {
    var Tag = _a.Tag, items = _a.items, props = __rest(_a, ["Tag", "items"]);
    return (react_1.default.createElement(Tag, __assign({}, props), items.map(function (item, i) {
        var _a;
        return (react_1.default.createElement(Bullet, { key: i }, typeof item === 'string' ? ((0, html_react_parser_1.default)(item)) : (react_1.default.createElement(react_1.default.Fragment, null,
            (0, html_react_parser_1.default)(item === null || item === void 0 ? void 0 : item.content),
            ((_a = item === null || item === void 0 ? void 0 : item.items) === null || _a === void 0 ? void 0 : _a.length) > 0 && react_1.default.createElement(Group, __assign({ Tag: Tag, items: item.items }, props))))));
    })));
};
var List = function (_a) {
    var data = _a.data, _b = _a.className, className = _b === void 0 ? '' : _b;
    var props = {};
    if (className) {
        props.className = className;
    }
    var Tag = ((data === null || data === void 0 ? void 0 : data.style) === 'ordered' ? "ol" : "ul");
    return data && react_1.default.createElement(Group, __assign({ Tag: Tag, items: data.items }, props));
};
exports.default = List;
//# sourceMappingURL=index.js.map