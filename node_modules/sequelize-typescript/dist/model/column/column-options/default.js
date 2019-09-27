"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attribute_service_1 = require("../attribute-service");
/**
 * Sets the specified default value for the annotated field
 */
function Default(value) {
    return (target, propertyName) => {
        attribute_service_1.addAttributeOptions(target, propertyName, {
            defaultValue: value
        });
    };
}
exports.Default = Default;
//# sourceMappingURL=default.js.map