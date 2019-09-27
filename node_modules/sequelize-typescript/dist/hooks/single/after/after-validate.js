"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_service_1 = require("../../shared/hooks-service");
function AfterValidate(...args) {
    return hooks_service_1.implementHookDecorator('afterValidate', args);
}
exports.AfterValidate = AfterValidate;
//# sourceMappingURL=after-validate.js.map