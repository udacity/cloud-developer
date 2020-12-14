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
require("reflect-metadata");
var FOREIGN_KEYS_KEY = 'sequelize:foreignKeys';
var ASSOCIATIONS_KEY = 'sequelize:associations';
// tslint:disable:max-line-length
function getPreparedAssociationOptions(optionsOrForeignKey) {
    var options = {};
    if (optionsOrForeignKey) {
        if (typeof optionsOrForeignKey === 'string') {
            options.foreignKey = optionsOrForeignKey;
        }
        else {
            options = __assign({}, optionsOrForeignKey);
        }
    }
    return options;
}
exports.getPreparedAssociationOptions = getPreparedAssociationOptions;
/**
 * Stores association meta data for specified class
 */
function addAssociation(target, association) {
    var associations = getAssociations(target);
    if (!associations) {
        associations = [];
    }
    associations.push(association);
    setAssociations(target, associations);
}
exports.addAssociation = addAssociation;
/**
 * Returns association meta data from specified class
 */
function getAssociations(target) {
    var associations = Reflect.getMetadata(ASSOCIATIONS_KEY, target);
    if (associations) {
        return associations.slice();
    }
}
exports.getAssociations = getAssociations;
function setAssociations(target, associations) {
    Reflect.defineMetadata(ASSOCIATIONS_KEY, associations, target);
}
exports.setAssociations = setAssociations;
function getAssociationsByRelation(target, relatedClass) {
    var associations = getAssociations(target);
    return (associations || []).filter(function (association) {
        var _relatedClass = association.getAssociatedClass();
        return (_relatedClass.prototype === relatedClass.prototype || // v3 + v4
            /* istanbul ignore next */
            relatedClass.prototype instanceof _relatedClass // v4 (for child classes)
        );
    });
}
exports.getAssociationsByRelation = getAssociationsByRelation;
/**
 * Adds foreign key meta data for specified class
 */
function addForeignKey(target, relatedClassGetter, foreignKey) {
    var foreignKeys = getForeignKeys(target);
    if (!foreignKeys) {
        foreignKeys = [];
    }
    foreignKeys.push({
        relatedClassGetter: relatedClassGetter,
        foreignKey: foreignKey
    });
    setForeignKeys(target, foreignKeys);
}
exports.addForeignKey = addForeignKey;
/**
 * Returns foreign key meta data from specified class
 */
function getForeignKeys(target) {
    var foreignKeys = Reflect.getMetadata(FOREIGN_KEYS_KEY, target);
    if (foreignKeys) {
        return foreignKeys.slice();
    }
}
exports.getForeignKeys = getForeignKeys;
/**
 * Sets foreign key meta data
 */
function setForeignKeys(target, foreignKeys) {
    Reflect.defineMetadata(FOREIGN_KEYS_KEY, foreignKeys, target);
}
//# sourceMappingURL=association.js.map