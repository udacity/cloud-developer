"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hooks_1 = require("../../services/hooks");
function AfterCreate() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return hooks_1.implementHookDecorator('afterCreate', args);
}
exports.AfterCreate = AfterCreate;
//# sourceMappingURL=AfterCreate.js.map