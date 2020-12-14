"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
/**
 * Only allow a specific value
 */
function Equals(value) {
    return function (target, propertyName) {
        return models_1.addAttributeOptions(target, propertyName, {
            validate: {
                equals: value
            }
        });
    };
}
exports.Equals = Equals;
//# sourceMappingURL=Equals.js.map