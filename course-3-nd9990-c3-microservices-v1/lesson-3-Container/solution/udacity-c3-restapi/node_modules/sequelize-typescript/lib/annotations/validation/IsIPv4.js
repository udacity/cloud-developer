"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
/**
 * Checks for IPv4 (129.89.23.1)
 */
function IsIPv4(target, propertyName) {
    models_1.addAttributeOptions(target, propertyName, {
        validate: {
            isIPv4: true
        }
    });
}
exports.IsIPv4 = IsIPv4;
//# sourceMappingURL=IsIPv4.js.map