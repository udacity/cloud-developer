"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
/*
 * Only allow uuids.
 * Version's regular expressions:
 * https://github.com/chriso/validator.js/blob/b59133b1727b6af355b403a9a97a19226cceb34b/lib/isUUID.js#L14-L19.
 */
function IsUUID(version) {
    return function (target, propertyName) {
        return models_1.addAttributeOptions(target, propertyName, {
            validate: {
                isUUID: version
            }
        });
    };
}
exports.IsUUID = IsUUID;
//# sourceMappingURL=IsUUID.js.map