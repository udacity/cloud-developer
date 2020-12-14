"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
/**
 * Will only allow arrays
 */
function IsArray(target, propertyName) {
    models_1.addAttributeOptions(target, propertyName, {
        validate: {
            isArray: true
        }
    });
}
exports.IsArray = IsArray;
//# sourceMappingURL=IsArray.js.map