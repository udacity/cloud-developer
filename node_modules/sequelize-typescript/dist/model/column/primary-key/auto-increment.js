"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attribute_service_1 = require("../attribute-service");
/**
 * Sets auto increment true for annotated field
 */
function AutoIncrement(target, propertyName) {
    attribute_service_1.addAttributeOptions(target, propertyName, {
        autoIncrement: true
    });
}
exports.AutoIncrement = AutoIncrement;
//# sourceMappingURL=auto-increment.js.map