"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("../shared/object");
const model_service_1 = require("../model/shared/model-service");
const alias_inference_service_1 = require("../associations/alias-inference/alias-inference-service");
const SCOPES_KEY = 'sequelize:scopes';
const SCOPES_OPTIONS_KEY = 'sequelize:scopes-options';
/**
 * Resolves scopes and adds them to the specified models
 */
function resolveScopes(models) {
    models.forEach(model => {
        exports.resolvesDeprecatedScopes(model);
        const { getDefaultScope, getScopes } = exports.getScopeOptionsGetters(model.prototype);
        let options = {};
        if (getDefaultScope) {
            options = Object.assign({}, options, { defaultScope: getDefaultScope() });
        }
        if (getScopes) {
            options = Object.assign({}, options, getScopes());
        }
        Object
            .keys(options)
            .forEach(key => exports.resolveScope(key, model, options[key]));
    });
}
exports.resolveScopes = resolveScopes;
exports.resolveScope = (scopeName, model, options) => {
    if (typeof options === 'function') {
        const fn = options;
        options = (...args) => alias_inference_service_1.inferAlias(fn(...args), model);
    }
    else {
        options = alias_inference_service_1.inferAlias(options, model);
    }
    model.addScope(scopeName, options, { override: true });
};
exports.addScopeOptionsGetter = (target, options) => {
    const currentOptions = exports.getScopeOptionsGetters(target) || {};
    exports.setScopeOptionsGetters(target, Object.assign({}, currentOptions, options));
};
exports.getScopeOptionsGetters = (target) => {
    const options = Reflect.getMetadata(SCOPES_OPTIONS_KEY, target);
    if (options) {
        return Object.assign({}, options);
    }
    return {};
};
exports.setScopeOptionsGetters = (target, options) => {
    Reflect.defineMetadata(SCOPES_OPTIONS_KEY, options, target);
};
/**
 * @deprecated
 */
exports.resolvesDeprecatedScopes = (model) => {
    const options = getScopeOptions(model.prototype) || {};
    Object
        .keys(options)
        .forEach(key => resolveDeprecatedScope(key, model, options[key]));
};
/**
 * Adds scope option meta data for specified prototype
 * @deprecated
 */
function addScopeOptions(target, options) {
    const _options = getScopeOptions(target) || {};
    setScopeOptions(target, object_1.deepAssign({}, _options, options));
}
exports.addScopeOptions = addScopeOptions;
/**
 * Returns scope option meta data from specified target
 * @deprecated
 */
function getScopeOptions(target) {
    const options = Reflect.getMetadata(SCOPES_KEY, target);
    if (options) {
        return object_1.deepAssign({}, options);
    }
}
exports.getScopeOptions = getScopeOptions;
/**
 * @deprecated
 */
function resolveDeprecatedScope(scopeName, model, options) {
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
 * @deprecated
 */
function setScopeOptions(target, options) {
    Reflect.defineMetadata(SCOPES_KEY, options, target);
}
//# sourceMappingURL=scope-service.js.map