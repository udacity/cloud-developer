"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_service_1 = require("../../shared/hooks-service");
function BeforeUpsert(...args) {
    return hooks_service_1.implementHookDecorator('beforeUpsert', args);
}
exports.BeforeUpsert = BeforeUpsert;
//# sourceMappingURL=before-upsert.js.map