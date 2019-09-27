"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_service_1 = require("../../shared/model-service");
function DeletedAt(target, propertyName) {
    model_service_1.addOptions(target, {
        deletedAt: propertyName,
        timestamps: true,
        paranoid: true
    });
}
exports.DeletedAt = DeletedAt;
//# sourceMappingURL=deleted-at.js.map