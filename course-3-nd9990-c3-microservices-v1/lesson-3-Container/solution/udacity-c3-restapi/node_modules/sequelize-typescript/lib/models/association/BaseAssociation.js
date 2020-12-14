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
var association_1 = require("../../services/association");
var ModelNotInitializedError_1 = require("../errors/ModelNotInitializedError");
var BaseAssociation = /** @class */ (function () {
    function BaseAssociation(associatedClassGetter) {
        this.associatedClassGetter = associatedClassGetter;
    }
    BaseAssociation.prototype.getAssociatedClass = function () {
        var modelClass = this.associatedClassGetter();
        if (!modelClass.isInitialized) {
            throw new ModelNotInitializedError_1.ModelNotInitializedError(modelClass, {
                cause: 'before association can be resolved.'
            });
        }
        return modelClass;
    };
    BaseAssociation.prototype.init = function (model, sequelize) {
        if (!this._options) {
            this._options = this.getPreparedOptions(model, sequelize);
        }
    };
    BaseAssociation.prototype.getSequelizeOptions = function () {
        if (!this._options) {
            throw new Error("Association need to be initialized with a sequelize instance");
        }
        return this._options;
    };
    BaseAssociation.prototype.getForeignKeyOptions = function (relatedClass, classWithForeignKey, foreignKey) {
        var foreignKeyOptions = {};
        if (typeof foreignKey === 'string') {
            foreignKeyOptions.name = foreignKey;
        }
        else if (foreignKey && typeof foreignKey === 'object') {
            foreignKeyOptions = __assign({}, foreignKey);
        }
        if (!foreignKeyOptions.name) {
            var foreignKeys = association_1.getForeignKeys(classWithForeignKey.prototype) || [];
            for (var _i = 0, foreignKeys_1 = foreignKeys; _i < foreignKeys_1.length; _i++) {
                var key = foreignKeys_1[_i];
                if (key.relatedClassGetter() === relatedClass) {
                    foreignKeyOptions.name = key.foreignKey;
                    break;
                }
            }
            if (!foreignKeyOptions.name) {
                throw new Error("Foreign key for \"" + relatedClass.name + "\" is missing " +
                    ("on \"" + classWithForeignKey.name + "\"."));
            }
        }
        return foreignKeyOptions;
    };
    return BaseAssociation;
}());
exports.BaseAssociation = BaseAssociation;
//# sourceMappingURL=BaseAssociation.js.map