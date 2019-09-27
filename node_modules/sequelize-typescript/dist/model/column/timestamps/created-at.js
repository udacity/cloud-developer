"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_service_1 = require("../../shared/model-service");
function CreatedAt(target, propertyName) {
    model_service_1.addOptions(target, {
        createdAt: propertyName,
        timestamps: true
    });
}
exports.CreatedAt = CreatedAt;
//# sourceMappingURL=created-at.js.map