"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
/**
 * Only allow date strings
 */
function IsDate(target, propertyName) {
    models_1.addAttributeOptions(target, propertyName, {
        validate: {
            isDate: true
        }
    });
}
exports.IsDate = IsDate;
//# sourceMappingURL=IsDate.js.map