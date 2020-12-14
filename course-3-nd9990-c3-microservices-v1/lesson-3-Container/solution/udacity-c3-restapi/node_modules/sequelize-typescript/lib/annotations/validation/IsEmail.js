"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
/**
 * Checks for email format (foo@bar.com)
 */
function IsEmail(target, propertyName) {
    models_1.addAttributeOptions(target, propertyName, {
        validate: {
            isEmail: true
        }
    });
}
exports.IsEmail = IsEmail;
//# sourceMappingURL=IsEmail.js.map