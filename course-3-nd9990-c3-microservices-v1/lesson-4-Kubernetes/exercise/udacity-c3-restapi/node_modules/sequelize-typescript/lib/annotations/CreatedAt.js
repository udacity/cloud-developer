"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../services/models");
function CreatedAt(target, propertyName) {
    models_1.addOptions(target, {
        createdAt: propertyName,
        timestamps: true
    });
}
exports.CreatedAt = CreatedAt;
//# sourceMappingURL=CreatedAt.js.map