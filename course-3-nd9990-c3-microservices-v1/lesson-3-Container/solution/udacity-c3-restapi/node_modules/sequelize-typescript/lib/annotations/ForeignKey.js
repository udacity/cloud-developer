"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var association_1 = require("../services/association");
function ForeignKey(relatedClassGetter) {
    return function (target, propertyName) {
        association_1.addForeignKey(target, relatedClassGetter, propertyName);
    };
}
exports.ForeignKey = ForeignKey;
//# sourceMappingURL=ForeignKey.js.map