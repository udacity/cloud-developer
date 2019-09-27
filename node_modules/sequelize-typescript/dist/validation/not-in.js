"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attribute_service_1 = require("../model/column/attribute-service");
/**
 * Check the value is not one of these
 */
function NotIn(arg) {
    return (target, propertyName) => attribute_service_1.addAttributeOptions(target, propertyName, {
        validate: {
            notIn: arg
        }
    });
}
exports.NotIn = NotIn;
//# sourceMappingURL=not-in.js.map