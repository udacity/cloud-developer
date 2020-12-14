"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../services/models");
function UpdatedAt(target, propertyName) {
    models_1.addOptions(target, {
        updatedAt: propertyName,
        timestamps: true
    });
}
exports.UpdatedAt = UpdatedAt;
//# sourceMappingURL=UpdatedAt.js.map