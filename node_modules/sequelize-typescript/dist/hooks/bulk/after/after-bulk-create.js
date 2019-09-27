"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_service_1 = require("../../shared/hooks-service");
function AfterBulkCreate(...args) {
    return hooks_service_1.implementHookDecorator('afterBulkCreate', args);
}
exports.AfterBulkCreate = AfterBulkCreate;
//# sourceMappingURL=after-bulk-create.js.map