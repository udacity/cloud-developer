"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Association_1 = require("../../enums/Association");
var association_1 = require("../../services/association");
var HasAssociation_1 = require("../../models/association/HasAssociation");
function HasOne(associatedClassGetter, optionsOrForeignKey) {
    return function (target, propertyName) {
        var options = association_1.getPreparedAssociationOptions(optionsOrForeignKey);
        if (!options.as)
            options.as = propertyName;
        association_1.addAssociation(target, new HasAssociation_1.HasAssociation(associatedClassGetter, options, Association_1.Association.HasOne));
    };
}
exports.HasOne = HasOne;
//# sourceMappingURL=HasOne.js.map