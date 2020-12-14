"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
/**
 * Only allow date strings before a specific date
 */
function IsBefore(date) {
    return function (target, propertyName) {
        return models_1.addAttributeOptions(target, propertyName, {
            validate: {
                isBefore: date
            }
        });
    };
}
exports.IsBefore = IsBefore;
//# sourceMappingURL=IsBefore.js.map