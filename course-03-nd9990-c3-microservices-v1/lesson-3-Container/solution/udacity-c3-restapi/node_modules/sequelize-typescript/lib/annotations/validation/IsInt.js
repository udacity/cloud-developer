"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
/**
 * Checks for valid integers
 */
function IsInt(target, propertyName) {
    models_1.addAttributeOptions(target, propertyName, {
        validate: {
            isInt: true
        }
    });
}
exports.IsInt = IsInt;
//# sourceMappingURL=IsInt.js.map