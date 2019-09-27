"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_service_1 = require("../../shared/hooks-service");
function BeforeSync(...args) {
    return hooks_service_1.implementHookDecorator('beforeSync', args);
}
exports.BeforeSync = BeforeSync;
//# sourceMappingURL=before-sync.js.map