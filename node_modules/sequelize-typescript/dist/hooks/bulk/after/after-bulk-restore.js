"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_service_1 = require("../../shared/hooks-service");
function AfterBulkRestore(...args) {
    return hooks_service_1.implementHookDecorator('afterBulkRestore', args);
}
exports.AfterBulkRestore = AfterBulkRestore;
//# sourceMappingURL=after-bulk-restore.js.map