"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scope_service_1 = require("./scope-service");
/**
 * Decorator for defining default Model scope
 */
function DefaultScope(scopeOrSsopeGetter) {
    return (target) => {
        if (typeof scopeOrSsopeGetter === 'function') {
            scope_service_1.addScopeOptionsGetter(target.prototype, { getDefaultScope: scopeOrSsopeGetter });
        }
        else {
            scope_service_1.addScopeOptions(target.prototype, { defaultScope: scopeOrSsopeGetter });
        }
    };
}
exports.DefaultScope = DefaultScope;
//# sourceMappingURL=default-scope.js.map