"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../services/models");
/**
 * Sets auto increment true for annotated field
 */
function AutoIncrement(target, propertyName) {
    models_1.addAttributeOptions(target, propertyName, {
        autoIncrement: true
    });
}
exports.AutoIncrement = AutoIncrement;
//# sourceMappingURL=AutoIncrement.js.map