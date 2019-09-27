"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_service_1 = require("../../shared/hooks-service");
function BeforeBulkCreate(...args) {
    return hooks_service_1.implementHookDecorator('beforeBulkCreate', args);
}
exports.BeforeBulkCreate = BeforeBulkCreate;
//# sourceMappingURL=before-bulk-create.js.map