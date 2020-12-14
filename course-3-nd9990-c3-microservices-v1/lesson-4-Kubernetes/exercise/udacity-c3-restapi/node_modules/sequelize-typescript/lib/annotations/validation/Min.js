"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
/**
 * Only allow values >= limit
 */
function Min(limit) {
    return function (target, propertyName) {
        return models_1.addAttributeOptions(target, propertyName, {
            validate: {
                min: limit
            }
        });
    };
}
exports.Min = Min;
//# sourceMappingURL=Min.js.map