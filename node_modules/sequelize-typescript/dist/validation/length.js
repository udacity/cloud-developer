"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attribute_service_1 = require("../model/column/attribute-service");
/**
 * Only allow values with length between min and max
 */
function Length({ msg, min, max }) {
    let options;
    const length = [min || 0, max];
    options = msg ? { args: length, msg: msg } : length;
    return (target, propertyName) => attribute_service_1.addAttributeOptions(target, propertyName, {
        validate: {
            len: options
        }
    });
}
exports.Length = Length;
//# sourceMappingURL=length.js.map