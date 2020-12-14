"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
/**
 * Will only allow numbers
 */
function IsNumeric(target, propertyName) {
    models_1.addAttributeOptions(target, propertyName, {
        validate: {
            isNumeric: true
        }
    });
}
exports.IsNumeric = IsNumeric;
//# sourceMappingURL=IsNumeric.js.map