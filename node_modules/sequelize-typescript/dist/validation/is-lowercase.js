"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attribute_service_1 = require("../model/column/attribute-service");
/**
 * Checks for lowercase
 */
function IsLowercase(target, propertyName) {
    attribute_service_1.addAttributeOptions(target, propertyName, {
        validate: {
            isLowercase: true
        }
    });
}
exports.IsLowercase = IsLowercase;
//# sourceMappingURL=is-lowercase.js.map