"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../services/models");
function Table(arg) {
    if (typeof arg === 'function') {
        var target = arg;
        annotate(target);
    }
    else {
        var options_1 = Object.assign({}, arg);
        return function (target) { return annotate(target, options_1); };
    }
}
exports.Table = Table;
function annotate(target, options) {
    if (options === void 0) { options = {}; }
    options.instanceMethods = target.prototype;
    options.classMethods = target;
    models_1.setModelName(target.prototype, options.modelName || target.name);
    models_1.addOptions(target.prototype, options);
}
//# sourceMappingURL=Table.js.map