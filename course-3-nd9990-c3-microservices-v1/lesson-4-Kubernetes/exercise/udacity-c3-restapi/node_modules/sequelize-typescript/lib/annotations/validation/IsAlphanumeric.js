"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
/**
 * Will only allow alphanumeric characters, so "_abc" will fail
 */
function IsAlphanumeric(target, propertyName) {
    models_1.addAttributeOptions(target, propertyName, {
        validate: {
            isAlphanumeric: true
        }
    });
}
exports.IsAlphanumeric = IsAlphanumeric;
//# sourceMappingURL=IsAlphanumeric.js.map