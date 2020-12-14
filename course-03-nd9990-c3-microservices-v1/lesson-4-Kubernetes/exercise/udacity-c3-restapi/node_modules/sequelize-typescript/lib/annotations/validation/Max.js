"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
/**
 * Only allow values <= limit
 */
function Max(limit) {
    return function (target, propertyName) {
        return models_1.addAttributeOptions(target, propertyName, {
            validate: {
                max: limit
            }
        });
    };
}
exports.Max = Max;
//# sourceMappingURL=Max.js.map