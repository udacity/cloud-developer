"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
/**
 * Checks for valid floating point numbers
 */
function IsFloat(target, propertyName) {
    models_1.addAttributeOptions(target, propertyName, {
        validate: {
            isFloat: true
        }
    });
}
exports.IsFloat = IsFloat;
//# sourceMappingURL=IsFloat.js.map