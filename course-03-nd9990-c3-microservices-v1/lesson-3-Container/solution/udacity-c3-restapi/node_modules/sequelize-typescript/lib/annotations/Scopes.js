"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var scopes_1 = require("../services/scopes");
/**
 * Sets scopes for annotated class
 */
function Scopes(scopes) {
    return function (target) {
        scopes_1.addScopeOptions(target.prototype, scopes);
    };
}
exports.Scopes = Scopes;
//# sourceMappingURL=Scopes.js.map