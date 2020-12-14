"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
/**
 * Checks for lowercase
 */
function IsLowercase(target, propertyName) {
    models_1.addAttributeOptions(target, propertyName, {
        validate: {
            isLowercase: true
        }
    });
}
exports.IsLowercase = IsLowercase;
//# sourceMappingURL=IsLowercase.js.map