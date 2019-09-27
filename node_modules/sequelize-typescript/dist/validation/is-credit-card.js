"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attribute_service_1 = require("../model/column/attribute-service");
/**
 * Check for valid credit card numbers
 */
function IsCreditCard(target, propertyName) {
    attribute_service_1.addAttributeOptions(target, propertyName, {
        validate: {
            isCreditCard: true
        }
    });
}
exports.IsCreditCard = IsCreditCard;
//# sourceMappingURL=is-credit-card.js.map