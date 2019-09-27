"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attribute_service_1 = require("../model/column/attribute-service");
/**
 * Checks for url format (http://foo.com)
 */
function IsUrl(target, propertyName) {
    attribute_service_1.addAttributeOptions(target, propertyName, {
        validate: {
            isUrl: true
        }
    });
}
exports.IsUrl = IsUrl;
//# sourceMappingURL=is-url.js.map