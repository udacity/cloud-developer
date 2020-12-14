"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
/**
 * Checks for IPv4 (129.89.23.1) or IPv6 format
 */
function IsIP(target, propertyName) {
    models_1.addAttributeOptions(target, propertyName, {
        validate: {
            isIP: true
        }
    });
}
exports.IsIP = IsIP;
//# sourceMappingURL=IsIP.js.map