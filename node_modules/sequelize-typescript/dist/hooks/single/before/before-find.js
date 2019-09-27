"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_service_1 = require("../../shared/hooks-service");
function BeforeFind(...args) {
    return hooks_service_1.implementHookDecorator('beforeFind', args);
}
exports.BeforeFind = BeforeFind;
//# sourceMappingURL=before-find.js.map