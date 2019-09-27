"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_service_1 = require("../model/shared/model-service");
exports.Validator = (target, propertyName, descriptor) => {
    model_service_1.addOptions(target, {
        validate: {
            [propertyName]: descriptor.value
        }
    });
};
//# sourceMappingURL=validator.js.map