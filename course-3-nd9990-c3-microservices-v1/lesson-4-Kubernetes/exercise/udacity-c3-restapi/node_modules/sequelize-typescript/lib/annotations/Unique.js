"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../services/models");
function Unique() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args.length === 1) {
        var options_1 = args[0];
        return function (target, propertyName) {
            annotate(target, propertyName, options_1);
        };
    }
    var target = args[0], propertyName = args[1];
    annotate(target, propertyName);
}
exports.Unique = Unique;
function annotate(target, propertyName, option) {
    if (option === void 0) { option = true; }
    models_1.addAttributeOptions(target, propertyName, {
        unique: option,
    });
}
//# sourceMappingURL=Unique.js.map