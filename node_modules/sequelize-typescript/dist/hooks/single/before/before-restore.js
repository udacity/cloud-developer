"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_service_1 = require("../../shared/hooks-service");
function BeforeRestore(...args) {
    return hooks_service_1.implementHookDecorator('beforeRestore', args);
}
exports.BeforeRestore = BeforeRestore;
//# sourceMappingURL=before-restore.js.map