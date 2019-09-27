"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attribute_service_1 = require("../model/column/attribute-service");
/**
 * Force specific substrings
 */
function Contains(value) {
    return (target, propertyName) => attribute_service_1.addAttributeOptions(target, propertyName, {
        validate: {
            contains: value
        }
    });
}
exports.Contains = Contains;
//# sourceMappingURL=contains.js.map