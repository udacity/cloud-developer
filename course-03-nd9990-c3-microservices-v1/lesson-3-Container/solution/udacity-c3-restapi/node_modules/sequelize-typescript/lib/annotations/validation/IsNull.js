"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
/**
 * Only allows null
 */
function IsNull(target, propertyName) {
    models_1.addAttributeOptions(target, propertyName, {
        validate: {
            isNull: true
        }
    });
}
exports.IsNull = IsNull;
//# sourceMappingURL=IsNull.js.map