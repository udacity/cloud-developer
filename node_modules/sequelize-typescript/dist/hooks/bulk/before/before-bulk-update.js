"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_service_1 = require("../../shared/hooks-service");
function BeforeBulkUpdate(...args) {
    return hooks_service_1.implementHookDecorator('beforeBulkUpdate', args);
}
exports.BeforeBulkUpdate = BeforeBulkUpdate;
//# sourceMappingURL=before-bulk-update.js.map