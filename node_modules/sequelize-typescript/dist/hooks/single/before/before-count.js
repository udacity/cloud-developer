"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_service_1 = require("../../shared/hooks-service");
function BeforeCount(...args) {
    return hooks_service_1.implementHookDecorator('beforeCount', args);
}
exports.BeforeCount = BeforeCount;
//# sourceMappingURL=before-count.js.map