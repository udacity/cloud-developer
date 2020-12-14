"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
exports.Validator = function (target, propertyName, descriptor) {
    var _a;
    models_1.addOptions(target, {
        validate: (_a = {},
            _a[propertyName] = descriptor.value,
            _a)
    });
};
//# sourceMappingURL=Validator.js.map