"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hooks_1 = require("../../services/hooks");
function AfterUpdate() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return hooks_1.implementHookDecorator('afterUpdate', args);
}
exports.AfterUpdate = AfterUpdate;
//# sourceMappingURL=AfterUpdate.js.map