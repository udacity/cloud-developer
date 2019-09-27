"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attribute_service_1 = require("../model/column/attribute-service");
/**
 * Check the value is one of these
 */
function IsIn(arg) {
    return (target, propertyName) => attribute_service_1.addAttributeOptions(target, propertyName, {
        validate: {
            isIn: arg
        }
    });
}
exports.IsIn = IsIn;
//# sourceMappingURL=is-in.js.map