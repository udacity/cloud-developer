"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scope_service_1 = require("./scope-service");
/**
 * Sets default scope for annotated class
 */
function DefaultScope(scope) {
    return (target) => {
        scope_service_1.addScopeOptions(target.prototype, {
            defaultScope: scope
        });
    };
}
exports.DefaultScope = DefaultScope;
//# sourceMappingURL=default-scope.js.map