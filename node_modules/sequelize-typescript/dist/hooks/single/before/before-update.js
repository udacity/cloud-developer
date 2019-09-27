"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_service_1 = require("../../shared/hooks-service");
function BeforeUpdate(...args) {
    return hooks_service_1.implementHookDecorator('beforeUpdate', args);
}
exports.BeforeUpdate = BeforeUpdate;
//# sourceMappingURL=before-update.js.map