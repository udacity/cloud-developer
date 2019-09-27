"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attribute_service_1 = require("../model/column/attribute-service");
/**
 * Only allow date strings
 */
function IsDate(target, propertyName) {
    attribute_service_1.addAttributeOptions(target, propertyName, {
        validate: {
            isDate: true
        }
    });
}
exports.IsDate = IsDate;
//# sourceMappingURL=is-date.js.map