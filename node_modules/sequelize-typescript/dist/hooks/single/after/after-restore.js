"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_service_1 = require("../../shared/hooks-service");
function AfterRestore(...args) {
    return hooks_service_1.implementHookDecorator('afterRestore', args);
}
exports.AfterRestore = AfterRestore;
//# sourceMappingURL=after-restore.js.map