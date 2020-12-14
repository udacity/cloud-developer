"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
/**
 * Force specific substrings
 */
function Contains(value) {
    return function (target, propertyName) {
        return models_1.addAttributeOptions(target, propertyName, {
            validate: {
                contains: value
            }
        });
    };
}
exports.Contains = Contains;
//# sourceMappingURL=Contains.js.map