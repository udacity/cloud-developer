"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attribute_service_1 = require("../model/column/attribute-service");
/**
 * Sets validation options for annotated field
 */
function Validate(options) {
    options = Object.assign({}, options);
    return (target, propertyName) => attribute_service_1.addAttributeOptions(target, propertyName, {
        validate: options
    });
}
exports.Validate = Validate;
//# sourceMappingURL=validate.js.map