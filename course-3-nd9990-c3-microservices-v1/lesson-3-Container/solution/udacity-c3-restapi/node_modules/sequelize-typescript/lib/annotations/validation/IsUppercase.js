"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
/**
 * Checks for uppercase
 */
function IsUppercase(target, propertyName) {
    models_1.addAttributeOptions(target, propertyName, {
        validate: {
            isUppercase: true
        }
    });
}
exports.IsUppercase = IsUppercase;
//# sourceMappingURL=IsUppercase.js.map