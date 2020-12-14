"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../services/models");
function DeletedAt(target, propertyName) {
    models_1.addOptions(target, {
        deletedAt: propertyName,
        timestamps: true,
        paranoid: true
    });
}
exports.DeletedAt = DeletedAt;
//# sourceMappingURL=DeletedAt.js.map