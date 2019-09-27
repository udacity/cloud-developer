"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attribute_service_1 = require("../model/column/attribute-service");
/**
 * Checks for IPv6 format
 */
function IsIPv6(target, propertyName) {
    attribute_service_1.addAttributeOptions(target, propertyName, {
        validate: {
            isIPv6: true
        }
    });
}
exports.IsIPv6 = IsIPv6;
//# sourceMappingURL=is-ip-v6.js.map