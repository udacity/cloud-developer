"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
function Is() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var options = {};
    var argIsFunction = typeof args[0] === 'function';
    if (argIsFunction || (typeof args[0] === 'string' && typeof args[1] === 'function')) {
        var validator_1;
        var name = void 0;
        if (argIsFunction) {
            validator_1 = args[0];
            name = validator_1.name;
            if (!name)
                throw new Error("Passed validator function must have a name");
        }
        else {
            name = args[0];
            validator_1 = args[1];
        }
        options["is" + (name.charAt(0).toUpperCase() + name.substr(1, name.length))] = validator_1;
    }
    else {
        options.is = args[0];
    }
    return function (target, propertyName) {
        return models_1.addAttributeOptions(target, propertyName, {
            validate: options
        });
    };
}
exports.Is = Is;
//# sourceMappingURL=Is.js.map