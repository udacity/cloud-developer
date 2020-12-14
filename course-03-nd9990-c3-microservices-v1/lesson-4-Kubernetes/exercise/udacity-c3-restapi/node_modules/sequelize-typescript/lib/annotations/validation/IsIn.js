"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
/**
 * Check the value is one of these
 */
function IsIn(arg) {
    return function (target, propertyName) {
        return models_1.addAttributeOptions(target, propertyName, {
            validate: {
                isIn: arg
            }
        });
    };
}
exports.IsIn = IsIn;
//# sourceMappingURL=IsIn.js.map