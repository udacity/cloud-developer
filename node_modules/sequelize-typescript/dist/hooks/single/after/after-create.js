"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_service_1 = require("../../shared/hooks-service");
function AfterCreate(...args) {
    return hooks_service_1.implementHookDecorator('afterCreate', args);
}
exports.AfterCreate = AfterCreate;
//# sourceMappingURL=after-create.js.map