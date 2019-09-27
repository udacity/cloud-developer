"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_service_1 = require("../../shared/hooks-service");
function AfterUpdate(...args) {
    return hooks_service_1.implementHookDecorator('afterUpdate', args);
}
exports.AfterUpdate = AfterUpdate;
//# sourceMappingURL=after-update.js.map