"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
/**
 * Only allow date strings after a specific date
 */
function IsAfter(date) {
    return function (target, propertyName) {
        return models_1.addAttributeOptions(target, propertyName, {
            validate: {
                isAfter: date
            }
        });
    };
}
exports.IsAfter = IsAfter;
//# sourceMappingURL=IsAfter.js.map