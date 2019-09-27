"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_service_1 = require("../../shared/hooks-service");
function AfterBulkUpdate(...args) {
    return hooks_service_1.implementHookDecorator('afterBulkUpdate', args);
}
exports.AfterBulkUpdate = AfterBulkUpdate;
//# sourceMappingURL=after-bulk-update.js.map