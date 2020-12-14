"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
/**
 * Sets validation options for annotated field
 */
function Validate(options) {
    options = Object.assign({}, options);
    return function (target, propertyName) {
        return models_1.addAttributeOptions(target, propertyName, {
            validate: options
        });
    };
}
exports.Validate = Validate;
//# sourceMappingURL=Validate.js.map