"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
function NotEmpty() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args.length === 1) {
        var options_1 = args[0];
        return function (target, propertyName) {
            return models_1.addAttributeOptions(target, propertyName, {
                validate: {
                    notEmpty: options_1,
                }
            });
        };
    }
    else {
        var target = args[0];
        var propertyName = args[1];
        models_1.addAttributeOptions(target, propertyName, {
            validate: {
                notEmpty: true
            }
        });
    }
}
exports.NotEmpty = NotEmpty;
//# sourceMappingURL=NotEmpty.js.map