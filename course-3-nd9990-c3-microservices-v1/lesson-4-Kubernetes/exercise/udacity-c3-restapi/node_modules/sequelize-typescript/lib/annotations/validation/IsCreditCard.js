"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
/**
 * Check for valid credit card numbers
 */
function IsCreditCard(target, propertyName) {
    models_1.addAttributeOptions(target, propertyName, {
        validate: {
            isCreditCard: true
        }
    });
}
exports.IsCreditCard = IsCreditCard;
//# sourceMappingURL=IsCreditCard.js.map