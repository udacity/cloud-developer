"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
/**
 * Checks for any numbers
 */
function IsDecimal(target, propertyName) {
    models_1.addAttributeOptions(target, propertyName, {
        validate: {
            isDecimal: true
        }
    });
}
exports.IsDecimal = IsDecimal;
//# sourceMappingURL=IsDecimal.js.map