"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_service_1 = require("../../shared/hooks-service");
function BeforeBulkDestroy(...args) {
    return hooks_service_1.implementHookDecorator('beforeBulkDestroy', args);
}
exports.BeforeBulkDestroy = BeforeBulkDestroy;
//# sourceMappingURL=before-bulk-destroy.js.map