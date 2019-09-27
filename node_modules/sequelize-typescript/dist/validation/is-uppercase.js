"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attribute_service_1 = require("../model/column/attribute-service");
/**
 * Checks for uppercase
 */
function IsUppercase(target, propertyName) {
    attribute_service_1.addAttributeOptions(target, propertyName, {
        validate: {
            isUppercase: true
        }
    });
}
exports.IsUppercase = IsUppercase;
//# sourceMappingURL=is-uppercase.js.map