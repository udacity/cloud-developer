"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../services/models");
var association_1 = require("../services/association");
var scopes_1 = require("../services/scopes");
var hooks_1 = require("../services/hooks");
var object_1 = require("../utils/object");
/**
 * Why does v3/Sequlize and v4/Sequelize does not extend? Because of
 * the transpile target, which is for v3/Sequelize and BaseSequelize ES5
 * and for v4/Sequelize ES6. This is needed for extending the original
 * Sequelize (version 4), which is an ES6 class: ES5 constructor-pattern
 * "classes" cannot extend ES6 classes
 */
var BaseSequelize = /** @class */ (function () {
    function BaseSequelize() {
        this.throughMap = {};
        this._ = {};
    }
    BaseSequelize.isISequelizeDbNameConfig = function (obj) {
        return obj.hasOwnProperty("name") && obj.hasOwnProperty("username");
    };
    BaseSequelize.isISequelizeUriConfig = function (obj) {
        return obj.hasOwnProperty("url");
    };
    BaseSequelize.extend = function (target) {
        object_1.extend(target, this);
    };
    /**
     * Prepares sequelize config passed to original sequelize constructor
     */
    BaseSequelize.prepareConfig = function (config) {
        if (!config.define) {
            config.define = {};
        }
        config.define = __assign({}, models_1.DEFAULT_DEFINE_OPTIONS, config.define);
        if (config.validateOnly) {
            return this.getValidationOnlyConfig(config);
        }
        if (BaseSequelize.isISequelizeDbNameConfig(config)) {
            // @TODO: remove deprecated "name" property
            return __assign({}, config, { database: config.name });
        }
        return __assign({}, config);
    };
    BaseSequelize.getValidationOnlyConfig = function (config) {
        return __assign({}, config, { database: '_name_', username: '_username_', password: '_password_', dialect: 'sqlite', dialectModulePath: __dirname + '/../utils/db-dialect-dummy' });
    };
    BaseSequelize.prototype.addModels = function (arg, modelMatch) {
        var _this = this;
        var defaultModelMatch = function (filename, member) {
            return filename === member;
        };
        var models = models_1.getModels(arg, modelMatch || this.options.modelMatch || defaultModelMatch);
        models.forEach(function (model) { return model.isInitialized = true; });
        this.defineModels(models);
        this.associateModels(models);
        scopes_1.resolveScopes(models);
        hooks_1.installHooks(models);
        models.forEach(function (model) { return _this._[model.name] = model; });
    };
    BaseSequelize.prototype.init = function (config) {
        if (config.modelPaths)
            this.addModels(config.modelPaths);
    };
    /**
     * Processes model associations
     */
    BaseSequelize.prototype.associateModels = function (models) {
        var _this = this;
        models.forEach(function (model) {
            var associations = association_1.getAssociations(model.prototype);
            if (!associations)
                return;
            associations.forEach(function (association) {
                association.init(model, _this);
                var associatedClass = association.getAssociatedClass();
                var relation = association.getAssociation();
                var options = association.getSequelizeOptions();
                model[relation](associatedClass, options);
                _this.adjustAssociation(model, association);
            });
        });
    };
    return BaseSequelize;
}());
exports.BaseSequelize = BaseSequelize;
//# sourceMappingURL=BaseSequelize.js.map