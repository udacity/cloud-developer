"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var models_1 = require("../../services/models");
/**
 * Only allow values with length between min and max
 */
function Length(_a) {
    var msg = _a.msg, min = _a.min, max = _a.max;
    var options;
    var length = [min || 0, max];
    if (msg) {
        options = { args: length, msg: msg };
    }
    else {
        options = length;
    }
    return function (target, propertyName) {
        return models_1.addAttributeOptions(target, propertyName, {
            validate: {
                len: options
            }
        });
    };
}
exports.Length = Length;
//# sourceMappingURL=Length.js.map