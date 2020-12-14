"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hooks_1 = require("../../services/hooks");
function AfterUpsert() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return hooks_1.implementHookDecorator('afterUpsert', args);
}
exports.AfterUpsert = AfterUpsert;
//# sourceMappingURL=AfterUpsert.js.map