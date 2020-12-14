"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hooks_1 = require("../../services/hooks");
function BeforeBulkDelete() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return hooks_1.implementHookDecorator('beforeBulkDelete', args);
}
exports.BeforeBulkDelete = BeforeBulkDelete;
//# sourceMappingURL=BeforeBulkDelete.js.map