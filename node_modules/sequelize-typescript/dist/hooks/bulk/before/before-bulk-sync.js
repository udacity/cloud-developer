"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_service_1 = require("../../shared/hooks-service");
function BeforeBulkSync(...args) {
    return hooks_service_1.implementHookDecorator('beforeBulkSync', args);
}
exports.BeforeBulkSync = BeforeBulkSync;
//# sourceMappingURL=before-bulk-sync.js.map