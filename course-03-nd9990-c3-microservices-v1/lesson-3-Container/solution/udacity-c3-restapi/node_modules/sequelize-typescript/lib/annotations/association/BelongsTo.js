"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var association_1 = require("../../services/association");
var BelongsToAssociation_1 = require("../../models/association/BelongsToAssociation");
function BelongsTo(associatedClassGetter, optionsOrForeignKey) {
    return function (target, propertyName) {
        var options = association_1.getPreparedAssociationOptions(optionsOrForeignKey);
        if (!options.as)
            options.as = propertyName;
        association_1.addAssociation(target, new BelongsToAssociation_1.BelongsToAssociation(associatedClassGetter, options));
    };
}
exports.BelongsTo = BelongsTo;
//# sourceMappingURL=BelongsTo.js.map