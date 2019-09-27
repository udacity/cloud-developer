"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_service_1 = require("../../shared/hooks-service");
function AfterDefine(...args) {
    return hooks_service_1.implementHookDecorator('afterDefine', args);
}
exports.AfterDefine = AfterDefine;
//# sourceMappingURL=after-define.js.map