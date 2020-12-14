"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
/**
 * Will not allow values, that match the string regex or real regex
 */
function Not(arg) {
    return function (target, propertyName) {
        return models_1.addAttributeOptions(target, propertyName, {
            validate: {
                not: arg
            }
        });
    };
}
exports.Not = Not;
//# sourceMappingURL=Not.js.map