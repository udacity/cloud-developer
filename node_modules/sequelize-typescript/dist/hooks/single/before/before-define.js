"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_service_1 = require("../../shared/hooks-service");
function BeforeDefine(...args) {
    return hooks_service_1.implementHookDecorator('beforeDefine', args);
}
exports.BeforeDefine = BeforeDefine;
//# sourceMappingURL=before-define.js.map