"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_service_1 = require("../../shared/hooks-service");
function BeforeSave(...args) {
    return hooks_service_1.implementHookDecorator('beforeSave', args);
}
exports.BeforeSave = BeforeSave;
//# sourceMappingURL=before-save.js.map