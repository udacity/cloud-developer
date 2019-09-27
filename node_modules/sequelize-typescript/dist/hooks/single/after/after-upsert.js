"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_service_1 = require("../../shared/hooks-service");
function AfterUpsert(...args) {
    return hooks_service_1.implementHookDecorator('afterUpsert', args);
}
exports.AfterUpsert = AfterUpsert;
//# sourceMappingURL=after-upsert.js.map