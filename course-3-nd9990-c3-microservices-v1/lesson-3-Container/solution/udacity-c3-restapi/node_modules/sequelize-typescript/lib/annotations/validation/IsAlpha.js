"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
/**
 * Will only allow letters
 */
function IsAlpha(target, propertyName) {
    models_1.addAttributeOptions(target, propertyName, {
        validate: {
            isAlpha: true
        }
    });
}
exports.IsAlpha = IsAlpha;
//# sourceMappingURL=IsAlpha.js.map