"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hooks_1 = require("../../services/hooks");
function AfterBulkSync() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return hooks_1.implementHookDecorator('afterBulkSync', args);
}
exports.AfterBulkSync = AfterBulkSync;
//# sourceMappingURL=AfterBulkSync.js.map