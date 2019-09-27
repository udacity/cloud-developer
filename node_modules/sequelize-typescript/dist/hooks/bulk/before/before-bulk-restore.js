"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_service_1 = require("../../shared/hooks-service");
function BeforeBulkRestore(...args) {
    return hooks_service_1.implementHookDecorator('beforeBulkRestore', args);
}
exports.BeforeBulkRestore = BeforeBulkRestore;
//# sourceMappingURL=before-bulk-restore.js.map