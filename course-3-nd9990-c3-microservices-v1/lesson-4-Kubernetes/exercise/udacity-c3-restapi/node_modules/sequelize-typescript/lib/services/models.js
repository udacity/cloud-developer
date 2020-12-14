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
var glob = require("glob");
var path = require("path");
var Model_1 = require("../models/Model");
var data_type_1 = require("../utils/data-type");
var object_1 = require("../utils/object");
var association_1 = require("./association");
var array_1 = require("../utils/array");
var path_1 = require("path");
var MODEL_NAME_KEY = 'sequelize:modelName';
var ATTRIBUTES_KEY = 'sequelize:attributes';
var OPTIONS_KEY = 'sequelize:options';
exports.DEFAULT_DEFINE_OPTIONS = {
    timestamps: false,
    freezeTableName: true
};
exports.PROPERTY_LINK_TO_ORIG = '__origClass';
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
/**
 * Sets model name from class by storing this
 * information through reflect metadata
 */
function setModelName(target, modelName) {
    Reflect.defineMetadata(MODEL_NAME_KEY, modelName, target);
}
exports.setModelName = setModelName;
/**
 * Returns model name from class by restoring this
 * information from reflect metadata
 */
function getModelName(target) {
    return Reflect.getMetadata(MODEL_NAME_KEY, target);
}
exports.getModelName = getModelName;
/**
 * Returns model attributes from class by restoring this
 * information from reflect metadata
 */
function getAttributes(target) {
    var attributes = Reflect.getMetadata(ATTRIBUTES_KEY, target);
    if (attributes) {
        return Object
            .keys(attributes)
            .reduce(function (copy, key) {
            copy[key] = __assign({}, attributes[key]);
            return copy;
        }, {});
    }
}
exports.getAttributes = getAttributes;
/**
 * Sets attributes
 */
function setAttributes(target, attributes) {
    Reflect.defineMetadata(ATTRIBUTES_KEY, __assign({}, attributes), target);
}
exports.setAttributes = setAttributes;
/**
 * Adds model attribute by specified property name and
 * sequelize attribute options and stores this information
 * through reflect metadata
 */
function addAttribute(target, name, options) {
    var attributes = getAttributes(target);
    if (!attributes) {
        attributes = {};
    }
    attributes[name] = __assign({}, options);
    setAttributes(target, attributes);
}
exports.addAttribute = addAttribute;
/**
 * Adds attribute options for specific attribute
 */
function addAttributeOptions(target, propertyName, options) {
    var attributes = getAttributes(target);
    if (!attributes || !attributes[propertyName]) {
        throw new Error("@Column annotation is missing for \"" + propertyName + "\" of class \"" + target.constructor.name + "\"" +
            " or annotation order is wrong.");
    }
    attributes[propertyName] = object_1.deepAssign(attributes[propertyName], options);
    setAttributes(target, attributes);
}
exports.addAttributeOptions = addAttributeOptions;
/**
 * Returns sequelize define options from class prototype
 * by restoring this information from reflect metadata
 */
function getOptions(target) {
    var options = Reflect.getMetadata(OPTIONS_KEY, target);
    if (options) {
        return __assign({}, options);
    }
}
exports.getOptions = getOptions;
/**
 * Sets seuqlize define options to class prototype
 */
function setOptions(target, options) {
    Reflect.defineMetadata(OPTIONS_KEY, __assign({}, options), target);
}
exports.setOptions = setOptions;
/**
 * Adds options be assigning new options to old one
 */
function addOptions(target, options) {
    var _options = getOptions(target);
    if (!_options) {
        _options = {};
    }
    setOptions(target, __assign({}, _options, options, { validate: __assign({}, (_options.validate || {}), (options.validate || {})) }));
}
exports.addOptions = addOptions;
/**
 * Maps design types to sequelize data types;
 * @throws if design type cannot be automatically mapped to
 * a sequelize data type
 */
function getSequelizeTypeByDesignType(target, propertyName) {
    var type = Reflect.getMetadata('design:type', target, propertyName);
    var dataType = data_type_1.inferDataType(type);
    if (dataType) {
        return dataType;
    }
    throw new Error("Specified type of property '" + propertyName + "'\n            cannot be automatically resolved to a sequelize data type. Please\n            define the data type manually");
}
exports.getSequelizeTypeByDesignType = getSequelizeTypeByDesignType;
/**
 * Determines models from value
 */
function getModels(arg, modelMatch) {
    var hasSupportedExtension = function (path) { return ['.ts', '.js'].indexOf(path_1.extname(path)) !== -1; };
    if (arg && typeof arg[0] === 'string') {
        return arg.reduce(function (models, dir) {
            if (!glob.hasMagic(dir) && !hasSupportedExtension(dir))
                dir = path.join(dir, '/*');
            var _models = glob
                .sync(dir)
                .filter(isImportable)
                .map(getFullfilepathWithoutExtension)
                .filter(array_1.uniqueFilter)
                .map(function (fullPath) {
                var module = require(fullPath);
                var fileName = path.basename(fullPath);
                var matchedMemberKey = Object.keys(module).find(function (m) { return modelMatch(fileName, m); });
                var matchedMember = matchedMemberKey ? module[matchedMemberKey] : undefined;
                if (!matchedMember && !module.default) {
                    throw new Error("No default export defined for file \"" + fileName + "\" or " +
                        "export does not satisfy filename.");
                }
                return matchedMember || module.default;
            });
            models.push.apply(models, _models);
            return models;
        }, []);
    }
    return arg;
}
exports.getModels = getModels;
/**
 * Resolves all model getters of specified options object
 * recursively.
 * So that {model: () => Person} will be converted to
 * {model: Person}
 */
function resolveModelGetter(options) {
    var maybeModelGetter = function (value) { return typeof value === 'function' && value.length === 0; };
    var isModel = function (value) { return value && value.prototype && value.prototype instanceof Model_1.Model; };
    var isOptionObject = function (value) { return value && typeof value === 'object'; };
    Object
        .keys(options)
        .forEach(function (key) {
        var value = options[key];
        if (maybeModelGetter(value)) {
            var maybeModel = value();
            if (isModel(maybeModel)) {
                options[key] = maybeModel;
            }
        }
        else if (isOptionObject(value)) {
            resolveModelGetter(value);
        }
    });
}
exports.resolveModelGetter = resolveModelGetter;
/**
 * Pre conform includes, so that "as" value can be inferred from source
 */
function inferAlias(options, source) {
    options = __assign({}, options);
    if (!options.include) {
        return options;
    }
    // if include is not an array, wrap in an array
    if (!Array.isArray(options.include)) {
        options.include = [options.include];
    }
    else if (!options.include.length) {
        return options;
    }
    // convert all included elements to { model: Model } form
    options.include = options.include.map(function (include) {
        include = inferAliasForInclude(include, source);
        return include;
    });
    return options;
}
exports.inferAlias = inferAlias;
/**
 * Pre conform include, so that alias ("as") value can be inferred from source class
 */
function inferAliasForInclude(include, source) {
    var hasModelOptionWithoutAsOption = !!(include.model && !include.as);
    var hasIncludeOptions = !!include.include;
    var isConstructorFn = include instanceof Function;
    if (isConstructorFn || hasModelOptionWithoutAsOption) {
        if (isConstructorFn) {
            include = { model: include };
        }
        var targetPrototype = (source[exports.PROPERTY_LINK_TO_ORIG] || source).prototype || source;
        var relatedClass = include.model;
        var associations = association_1.getAssociationsByRelation(targetPrototype, relatedClass);
        if (associations.length > 0) {
            if (associations.length > 1) {
                throw new Error("Alias cannot be inferred: \"" + source.name + "\" has multiple " +
                    ("relations with \"" + include.model.name + "\""));
            }
            include.as = associations[0].getSequelizeOptions().as;
        }
    }
    if (!isConstructorFn && hasIncludeOptions) {
        include = inferAlias(include, include.model);
    }
    return include;
}
/**
 * Checks if specified filename is importable or not;
 * Which means that, it needs to have a specific file extension
 */
function isImportable(file) {
    var filePart = file.slice(-3);
    return filePart === '.js' || (filePart === '.ts' && file.slice(-5) !== '.d.ts');
}
/**
 * Return the value of the full path with filename, without extension
 */
function getFullfilepathWithoutExtension(file) {
    var parsedFile = path.parse(file);
    return path.join(parsedFile.dir, parsedFile.name);
}
//# sourceMappingURL=models.js.map