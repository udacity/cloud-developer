"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_service_1 = require("./hooks-service");
function ValidationFailed(...args) {
    return hooks_service_1.implementHookDecorator('validationFailed', args);
}
exports.ValidationFailed = ValidationFailed;
//# sourceMappingURL=validation-failed.js.map