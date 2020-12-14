"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../services/models");
/**
 * Sets primary key option true for annotated property.
 */
function PrimaryKey(target, propertyName) {
    models_1.addAttributeOptions(target, propertyName, {
        primaryKey: true
    });
}
exports.PrimaryKey = PrimaryKey;
//# sourceMappingURL=PrimaryKey.js.map