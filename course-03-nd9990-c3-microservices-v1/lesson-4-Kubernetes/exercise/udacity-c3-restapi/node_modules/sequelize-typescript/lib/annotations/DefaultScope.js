"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var scopes_1 = require("../services/scopes");
/**
 * Sets default scope for annotated class
 */
function DefaultScope(scope) {
    return function (target) {
        scopes_1.addScopeOptions(target.prototype, {
            defaultScope: scope
        });
    };
}
exports.DefaultScope = DefaultScope;
//# sourceMappingURL=DefaultScope.js.map