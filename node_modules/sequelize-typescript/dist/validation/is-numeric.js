"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attribute_service_1 = require("../model/column/attribute-service");
/**
 * Will only allow numbers
 */
function IsNumeric(target, propertyName) {
    attribute_service_1.addAttributeOptions(target, propertyName, {
        validate: {
            isNumeric: true
        }
    });
}
exports.IsNumeric = IsNumeric;
//# sourceMappingURL=is-numeric.js.map