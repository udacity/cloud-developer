"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
/**
 * Don't allow specific substrings
 */
function NotContains(value) {
    return function (target, propertyName) {
        return models_1.addAttributeOptions(target, propertyName, {
            validate: {
                notContains: value
            }
        });
    };
}
exports.NotContains = NotContains;
//# sourceMappingURL=NotContains.js.map