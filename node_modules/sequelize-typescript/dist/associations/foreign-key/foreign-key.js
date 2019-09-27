"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const foreign_key_service_1 = require("./foreign-key-service");
function ForeignKey(relatedClassGetter) {
    return (target, propertyName) => {
        foreign_key_service_1.addForeignKey(target, relatedClassGetter, propertyName);
    };
}
exports.ForeignKey = ForeignKey;
//# sourceMappingURL=foreign-key.js.map