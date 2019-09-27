"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_service_1 = require("../../shared/hooks-service");
function AfterInit(...args) {
    return hooks_service_1.implementHookDecorator('afterInit', args);
}
exports.AfterInit = AfterInit;
//# sourceMappingURL=after-init.js.map