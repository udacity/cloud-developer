"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_service_1 = require("../../shared/hooks-service");
function BeforeInit(...args) {
    return hooks_service_1.implementHookDecorator('beforeInit', args);
}
exports.BeforeInit = BeforeInit;
//# sourceMappingURL=before-init.js.map