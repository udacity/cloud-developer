"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../services/models");
var data_type_1 = require("../utils/data-type");
function Column() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    // In case of no specified options, we infer the
    // sequelize data type by the type of the property
    if (args.length >= 2) {
        var target = args[0];
        var propertyName = args[1];
        var propertyDescriptor = args[2];
        annotate(target, propertyName, propertyDescriptor);
        return;
    }
    return function (target, propertyName, propertyDescriptor) {
        annotate(target, propertyName, propertyDescriptor, args[0]);
    };
}
exports.Column = Column;
function annotate(target, propertyName, propertyDescriptor, optionsOrDataType) {
    if (optionsOrDataType === void 0) { optionsOrDataType = {}; }
    var options;
    if (data_type_1.isDataType(optionsOrDataType)) {
        options = {
            type: optionsOrDataType
        };
    }
    else {
        options = Object.assign({}, optionsOrDataType);
        if (!options.type) {
            options.type = models_1.getSequelizeTypeByDesignType(target, propertyName);
        }
    }
    if (propertyDescriptor) {
        if (propertyDescriptor.get) {
            options.get = propertyDescriptor.get;
        }
        if (propertyDescriptor.set) {
            options.set = propertyDescriptor.set;
        }
    }
    models_1.addAttribute(target, propertyName, options);
}
//# sourceMappingURL=Column.js.map