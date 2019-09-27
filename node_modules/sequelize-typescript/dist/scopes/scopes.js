"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scope_service_1 = require("./scope-service");
/**
 * Decorator for defining Model scopes
 */
function Scopes(scopesOrScopesGetter) {
    return (target) => {
        if (typeof scopesOrScopesGetter === 'function') {
            scope_service_1.addScopeOptionsGetter(target.prototype, {
                getScopes: scopesOrScopesGetter,
            });
        }
        else {
            scope_service_1.addScopeOptions(target.prototype, scopesOrScopesGetter);
        }
    };
}
exports.Scopes = Scopes;
//# sourceMappingURL=scopes.js.map