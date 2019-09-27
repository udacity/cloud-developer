"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_service_1 = require("../../shared/hooks-service");
function AfterSave(...args) {
    return hooks_service_1.implementHookDecorator('afterSave', args);
}
exports.AfterSave = AfterSave;
//# sourceMappingURL=after-save.js.map