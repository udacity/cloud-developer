"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const string_1 = require("../../shared/string");
const alias_inference_service_1 = require("../../associations/alias-inference/alias-inference-service");
const model_not_initialized_error_1 = require("../shared/model-not-initialized-error");
const object_1 = require("../../shared/object");
class Model extends sequelize_1.Model {
    constructor(values, options) {
        if (!new.target.isInitialized) {
            throw new model_not_initialized_error_1.ModelNotInitializedError(new.target, `${new.target.name} cannot be instantiated.`);
        }
        super(values, alias_inference_service_1.inferAlias(options, new.target));
    }
    static init(attributes, options) {
        this.isInitialized = true;
        // @ts-ignore
        return super.init(attributes, options);
    }
    /**
     * Adds relation between specified instances and source instance
     */
    $add(propertyKey, instances, options) {
        return this['add' + string_1.capitalize(propertyKey)](instances, options);
    }
    /**
     * Sets relation between specified instances and source instance
     * (replaces old relations)
     */
    $set(propertyKey, instances, options) {
        return this['set' + string_1.capitalize(propertyKey)](instances, options);
    }
    /**
     * Returns related instance (specified by propertyKey) of source instance
     */
    $get(propertyKey, options) {
        return this['get' + string_1.capitalize(propertyKey)](options);
    }
    /**
     * Counts related instances (specified by propertyKey) of source instance
     */
    $count(propertyKey, options) {
        return this['count' + string_1.capitalize(propertyKey)](options);
    }
    /**
     * Creates instances and relate them to source instance
     */
    $create(propertyKey, values, options) {
        return this['create' + string_1.capitalize(propertyKey)](values, options);
    }
    /**
     * Checks if specified instances is related to source instance
     */
    $has(propertyKey, instances, options) {
        return this['has' + string_1.capitalize(propertyKey)](instances, options);
    }
    /**
     * Removes specified instances from source instance
     */
    $remove(propertyKey, instances, options) {
        return this['remove' + string_1.capitalize(propertyKey)](instances, options);
    }
    reload(options) {
        return super.reload(alias_inference_service_1.inferAlias(options, this));
    }
}
Model.isInitialized = false;
exports.Model = Model;
/**
 * Indicates which static methods of Model has to be proxied,
 * to prepare include option to automatically resolve alias;
 * The index represents the index of the options of the
 * corresponding method parameter
 */
exports.INFER_ALIAS_MAP = {
    bulkBuild: 1,
    build: 1,
    create: 1,
    aggregate: 2,
    all: 0,
    find: 0,
    findAll: 0,
    findAndCount: 0,
    findAndCountAll: 0,
    findById: 1,
    findByPrimary: 1,
    findCreateFind: 0,
    findOne: 0,
    findOrBuild: 0,
    findOrCreate: 0,
    findOrInitialize: 0,
    reload: 0,
};
const staticModelFunctionProperties = object_1.getAllPropertyNames(sequelize_1.Model)
    .filter(key => !isForbiddenMember(key) &&
    isFunctionMember(key, sequelize_1.Model) &&
    !isPrivateMember(key));
function isFunctionMember(propertyKey, target) {
    return typeof target[propertyKey] === 'function';
}
function isForbiddenMember(propertyKey) {
    const FORBIDDEN_KEYS = ['name', 'constructor', 'length', 'prototype', 'caller', 'arguments', 'apply',
        'QueryInterface', 'QueryGenerator', 'init', 'replaceHookAliases', 'refreshAttributes', 'inspect'];
    return FORBIDDEN_KEYS.indexOf(propertyKey) !== -1;
}
function isPrivateMember(propertyKey) {
    return (propertyKey.charAt(0) === '_');
}
function addThrowNotInitializedProxy() {
    staticModelFunctionProperties
        .forEach(key => {
        const superFn = Model[key];
        Model[key] = function (...args) {
            if (!this.isInitialized) {
                throw new model_not_initialized_error_1.ModelNotInitializedError(this, `Member "${key}" cannot be called.`);
            }
            return superFn.call(this, ...args);
        };
    });
}
function addInferAliasOverrides() {
    Object
        .keys(exports.INFER_ALIAS_MAP)
        .forEach(key => {
        const optionIndex = exports.INFER_ALIAS_MAP[key];
        const superFn = Model[key];
        Model[key] = function (...args) {
            args[optionIndex] = alias_inference_service_1.inferAlias(args[optionIndex], this);
            return superFn.call(this, ...args);
        };
    });
}
addThrowNotInitializedProxy();
addInferAliasOverrides();
//# sourceMappingURL=model.js.map