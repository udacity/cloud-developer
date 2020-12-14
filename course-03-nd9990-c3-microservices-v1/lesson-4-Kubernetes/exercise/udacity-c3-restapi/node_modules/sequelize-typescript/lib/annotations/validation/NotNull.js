"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
/**
 * Won't allow null
 */
function NotNull(target, propertyName) {
    models_1.addAttributeOptions(target, propertyName, {
        validate: {
            notNull: true
        }
    });
}
exports.NotNull = NotNull;
//# sourceMappingURL=NotNull.js.map