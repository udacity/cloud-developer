"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_service_1 = require("../../shared/hooks-service");
function AfterBulkDestroy(...args) {
    return hooks_service_1.implementHookDecorator('afterBulkDestroy', args);
}
exports.AfterBulkDestroy = AfterBulkDestroy;
//# sourceMappingURL=after-bulk-destroy.js.map