"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_service_1 = require("../../shared/hooks-service");
function BeforeCreate(...args) {
    return hooks_service_1.implementHookDecorator('beforeCreate', args);
}
exports.BeforeCreate = BeforeCreate;
//# sourceMappingURL=before-create.js.map