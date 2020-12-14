"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var object_1 = require("../utils/object");
var models_1 = require("./models");
var SCOPES_KEY = 'sequelize:scopes';
/**
 * Resolves scopes and adds them to the specified models
 */
function resolveScopes(models) {
    models.forEach(function (model) {
        var options = getScopeOptions(model.prototype);
        if (options) {
            Object
                .keys(options)
                .forEach(function (key) { return resolveScope(key, model, options[key]); });
        }
    });
}
exports.resolveScopes = resolveScopes;
/**
 * Adds scope option meta data for specified prototype
 */
function addScopeOptions(target, options) {
    var _options = getScopeOptions(target) || {};
    setScopeOptions(target, object_1.deepAssign({}, _options, options));
}
exports.addScopeOptions = addScopeOptions;
/**
 * Returns scope option meta data from specified target
 */
function getScopeOptions(target) {
    var options = Reflect.getMetadata(SCOPES_KEY, target);
    if (options) {
        return object_1.deepAssign({}, options);
    }
}
exports.getScopeOptions = getScopeOptions;
/**
 * Resolves scope
 */
function resolveScope(scopeName, model, options) {
    models_1.resolveModelGetter(options);
    if (typeof options === 'function') {
        var fn_1 = options;
        options = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return models_1.inferAlias(fn_1.apply(void 0, args), model);
        };
    }
    else {
        options = models_1.inferAlias(options, model);
    }
    model.addScope(scopeName, options, { override: true });
}
/**
 * Set scope option meta data for specified prototype
 */
function setScopeOptions(target, options) {
    Reflect.defineMetadata(SCOPES_KEY, options, target);
}
//# sourceMappingURL=scopes.js.map