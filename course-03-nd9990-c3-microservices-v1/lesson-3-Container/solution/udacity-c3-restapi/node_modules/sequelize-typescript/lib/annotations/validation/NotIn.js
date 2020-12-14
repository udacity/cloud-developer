"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
/**
 * Check the value is not one of these
 */
function NotIn(arg) {
    return function (target, propertyName) {
        return models_1.addAttributeOptions(target, propertyName, {
            validate: {
                notIn: arg
            }
        });
    };
}
exports.NotIn = NotIn;
//# sourceMappingURL=NotIn.js.map