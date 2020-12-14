"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hooks_1 = require("../../services/hooks");
function BeforeFindAfterExpandIncludeAll() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return hooks_1.implementHookDecorator('beforeFindAfterExpandIncludeAll', args);
}
exports.BeforeFindAfterExpandIncludeAll = BeforeFindAfterExpandIncludeAll;
//# sourceMappingURL=BeforeFindAfterExpandIncludeAll.js.map