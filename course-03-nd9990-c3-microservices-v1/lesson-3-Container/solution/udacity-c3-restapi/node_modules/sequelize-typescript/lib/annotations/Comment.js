"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../services/models");
/**
 * Sets the specified comment value for the annotated field
 */
function Comment(value) {
    return function (target, propertyName) {
        models_1.addAttributeOptions(target, propertyName, {
            comment: value
        });
    };
}
exports.Comment = Comment;
//# sourceMappingURL=Comment.js.map