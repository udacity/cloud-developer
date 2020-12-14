"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
/**
 * Checks for url format (http://foo.com)
 */
function IsUrl(target, propertyName) {
    models_1.addAttributeOptions(target, propertyName, {
        validate: {
            isUrl: true
        }
    });
}
exports.IsUrl = IsUrl;
//# sourceMappingURL=IsUrl.js.map