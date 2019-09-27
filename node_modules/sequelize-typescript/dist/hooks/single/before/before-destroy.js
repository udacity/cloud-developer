"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_service_1 = require("../../shared/hooks-service");
function BeforeDestroy(...args) {
    return hooks_service_1.implementHookDecorator('beforeDestroy', args);
}
exports.BeforeDestroy = BeforeDestroy;
//# sourceMappingURL=before-destroy.js.map