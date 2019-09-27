"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_service_1 = require("../../shared/hooks-service");
function AfterBulkSync(...args) {
    return hooks_service_1.implementHookDecorator('afterBulkSync', args);
}
exports.AfterBulkSync = AfterBulkSync;
//# sourceMappingURL=after-bulk-sync.js.map