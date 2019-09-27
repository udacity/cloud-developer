"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("../../shared/object");
const model_service_1 = require("../../model/shared/model-service");
const alias_inference_service_1 = require("../../associations/alias-inference/alias-inference-service");
const SCOPES_KEY = 'sequelize:scopes';
/**
 * Resolves scopes and adds them to the specified models
 */
function resolveScopes(models) {
    models.forEach(model => {
        const options = getScopeOptions(model.prototype);
        if (options) {
            Object
                .keys(options)
                .forEach(key => resolveScope(key, model, options[key]));
        }
    });
}
exports.resolveScopes = resolveScopes;
/**
 * Adds scope option meta data for specified prototype
 */
function addScopeOptions(target, options) {
    const _options = getScopeOptions(target) || {};
    setScopeOptions(target, object_1.deepAssign({}, _options, options));
}
exports.addScopeOptions = addScopeOptions;
/**
 * Returns scope option meta data from specified target
 */
function getScopeOptions(target) {
    const options = Reflect.getMetadata(SCOPES_KEY, target);
    if (options) {
        return object_1.deepAssign({}, options);
    }
}
exports.getScopeOptions = getScopeOptions;
/**
 * Resolves scope
 */
function resolveScope(scopeName, model, options) {
    if (typeof options === 'function') {
        const fn = options;
        options = (...args) => alias_inference_service_1.inferAlias(fn(...args), model);
    }
    else {
        options = alias_inference_service_1.inferAlias(model_service_1.resolveModelGetter(options), model);
    }
    model.addScope(scopeName, options, { override: true });
}
/**
 * Set scope option meta data for specified prototype
 */
function setScopeOptions(target, options) {
    Reflect.defineMetadata(SCOPES_KEY, options, target);
}
//# sourceMappingURL=scope-service.js.map