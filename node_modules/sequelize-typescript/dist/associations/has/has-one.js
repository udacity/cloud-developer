"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const has_association_1 = require("./has-association");
const association_service_1 = require("../shared/association-service");
const association_1 = require("../shared/association");
function HasOne(associatedClassGetter, optionsOrForeignKey) {
    return (target, propertyName) => {
        const options = association_service_1.getPreparedAssociationOptions(optionsOrForeignKey);
        if (!options.as)
            options.as = propertyName;
        association_service_1.addAssociation(target, new has_association_1.HasAssociation(associatedClassGetter, options, association_1.Association.HasOne));
    };
}
exports.HasOne = HasOne;
//# sourceMappingURL=has-one.js.map