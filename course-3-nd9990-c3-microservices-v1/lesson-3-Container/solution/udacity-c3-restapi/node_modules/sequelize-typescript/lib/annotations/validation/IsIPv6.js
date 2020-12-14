"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
/**
 * Checks for IPv6 format
 */
function IsIPv6(target, propertyName) {
    models_1.addAttributeOptions(target, propertyName, {
        validate: {
            isIPv6: true
        }
    });
}
exports.IsIPv6 = IsIPv6;
//# sourceMappingURL=IsIPv6.js.map