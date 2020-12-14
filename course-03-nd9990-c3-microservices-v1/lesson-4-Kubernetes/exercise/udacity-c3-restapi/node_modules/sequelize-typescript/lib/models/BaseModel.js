"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var versioning_1 = require("../utils/versioning");
var string_1 = require("../utils/string");
var models_1 = require("../services/models");
var object_1 = require("../utils/object");
var ModelNotInitializedError_1 = require("./errors/ModelNotInitializedError");
var parentPrototype = versioning_1.majorVersion === 3 ? sequelize_1.Instance.prototype : sequelize_1.Model.prototype;
var BaseModel = /** @class */ (function () {
    function BaseModel() {
    }
    BaseModel.extend = function (target) {
        object_1.extend(target, this);
        overrideStaticFunctions(target);
        /**
         * Overrides all static functions with a function, that
         * checks if corresponding model is initialized and
         * prepares given options if necessary
         */
        function overrideStaticFunctions(_target) {
            var isFunctionMember = function (key) { return typeof _target[key] !== 'function'; };
            object_1.getAllPropertyNames(_target)
                .filter(function (key) { return !canOverrideMember(key); })
                .forEach(function (key) {
                if (isFunctionMember(key))
                    return;
                var superFn = _target[key];
                _target[key] = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    checkInitialization(this, key);
                    tryPrepareOptions(this, key, args);
                    return superFn.call.apply(superFn, [this].concat(args));
                };
            });
        }
        /**
         * Checks if member - specified by propertyKey - can be overridden or not
         */
        function canOverrideMember(propertyKey) {
            if (isPrivateMember(propertyKey)) {
                return true;
            }
            var FORBIDDEN_KEYS = ['name', 'constructor', 'length', 'prototype', 'caller', 'arguments', 'apply',
                'QueryInterface', 'QueryGenerator', 'init', 'replaceHookAliases', 'refreshAttributes'];
            return FORBIDDEN_KEYS.indexOf(propertyKey) !== -1;
        }
        /**
         * Checks if member is private or not. Is identified by starting
         * "_" in specified key
         */
        function isPrivateMember(propertyKey) {
            return (propertyKey.charAt(0) === '_');
        }
        /**
         * Checks if model is initialized
         * @throw if model is not initialized
         */
        function checkInitialization(model, propertyKey) {
            if (!model.isInitialized) {
                throw new ModelNotInitializedError_1.ModelNotInitializedError(model, { accessedPropertyKey: propertyKey });
            }
        }
        /**
         * Prepares options if necessary:
         *  - infers alias of given options
         */
        function tryPrepareOptions(model, propertyKey, args) {
            var optionIndex = models_1.INFER_ALIAS_MAP[propertyKey];
            if (optionIndex !== undefined) {
                var options = args[optionIndex];
                if (options) {
                    args[optionIndex] = models_1.inferAlias(options, model);
                }
            }
        }
    };
    /**
     * Prepares build options for instantiation of a model
     */
    BaseModel.prepareInstantiationOptions = function (options, source) {
        options = models_1.inferAlias(options, source);
        if (!('isNewRecord' in options))
            options.isNewRecord = true;
        if (!('$schema' in options) && this['$schema'])
            options['$schema'] = this['$schema'];
        if (!('$schemaDelimiter' in options) && this['$schemaDelimiter'])
            options['$schemaDelimiter'] = this['$schemaDelimiter'];
        var staticMethodPrefix = versioning_1.majorVersion === 3 ? '$' : '_';
        // preventing TypeError: Cannot read property 'indexOf' of undefined(=includeNames)
        if (!options['includeNames'])
            options['includeNames'] = [];
        if (!options['includeValidated']) {
            var conformOptionsName = staticMethodPrefix + 'conformOptions';
            var conformIncludesName = staticMethodPrefix + 'conformIncludes';
            var conformMethodName = conformOptionsName in sequelize_1.Model ? conformOptionsName : conformIncludesName;
            sequelize_1.Model[conformMethodName](options, source);
            if (options.include) {
                sequelize_1.Model[staticMethodPrefix + 'expandIncludeAll'].call(source, options);
                sequelize_1.Model[staticMethodPrefix + 'validateIncludedElements'].call(source, options);
            }
        }
        return options;
    };
    /**
     * Adds relation between specified instances and source instance
     */
    BaseModel.prototype.$add = function (propertyKey, instances, options) {
        return this['add' + string_1.capitalize(propertyKey)](instances, options);
    };
    ;
    /**
     * Sets relation between specified instances and source instance
     * (replaces old relations)
     */
    BaseModel.prototype.$set = function (propertyKey, instances, options) {
        return this['set' + string_1.capitalize(propertyKey)](instances, options);
    };
    ;
    /**
     * Returns related instance (specified by propertyKey) of source instance
     */
    BaseModel.prototype.$get = function (propertyKey, options) {
        return this['get' + string_1.capitalize(propertyKey)](options);
    };
    ;
    /**
     * Counts related instances (specified by propertyKey) of source instance
     */
    BaseModel.prototype.$count = function (propertyKey, options) {
        return this['count' + string_1.capitalize(propertyKey)](options);
    };
    ;
    /**
     * Creates instances and relate them to source instance
     */
    BaseModel.prototype.$create = function (propertyKey, values, options) {
        return this['create' + string_1.capitalize(propertyKey)](values, options);
    };
    ;
    /**
     * Checks if specified instances is related to source instance
     */
    BaseModel.prototype.$has = function (propertyKey, instances, options) {
        return this['has' + string_1.capitalize(propertyKey)](instances, options);
    };
    ;
    /**
     * Removes specified instances from source instance
     */
    BaseModel.prototype.$remove = function (propertyKey, instances, options) {
        return this['remove' + string_1.capitalize(propertyKey)](instances, options);
    };
    ;
    /**
     * Overridden due to infer alias from options is required
     *
     * SEE DETAILS FOR ACTUAL FUNCTIONALITY ON DECLARATION FILE
     */
    BaseModel.prototype.reload = function (options) {
        return parentPrototype.reload.call(this, models_1.inferAlias(options, this));
    };
    ;
    BaseModel.isInitialized = false;
    return BaseModel;
}());
exports.BaseModel = BaseModel;
//# sourceMappingURL=BaseModel.js.map