"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var association_1 = require("../../services/association");
var Association_1 = require("../../enums/Association");
var HasAssociation_1 = require("../../models/association/HasAssociation");
function HasMany(associatedClassGetter, optionsOrForeignKey) {
    return function (target, propertyName) {
        var options = association_1.getPreparedAssociationOptions(optionsOrForeignKey);
        if (!options.as)
            options.as = propertyName;
        association_1.addAssociation(target, new HasAssociation_1.HasAssociation(associatedClassGetter, options, Association_1.Association.HasMany));
    };
}
exports.HasMany = HasMany;
//# sourceMappingURL=HasMany.js.map