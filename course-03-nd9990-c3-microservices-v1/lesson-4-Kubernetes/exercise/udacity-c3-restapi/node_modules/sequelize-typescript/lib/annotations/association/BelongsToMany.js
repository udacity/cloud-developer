"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var association_1 = require("../../services/association");
var BelongsToManyAssociation_1 = require("../../models/association/BelongsToManyAssociation");
function BelongsToMany(associatedClassGetter, throughOrOptions, foreignKey, otherKey) {
    return function (target, propertyName) {
        var options = { foreignKey: foreignKey, otherKey: otherKey };
        if (typeof throughOrOptions === 'string' ||
            typeof throughOrOptions === 'function') {
            options.through = throughOrOptions;
        }
        else {
            options = __assign({}, throughOrOptions);
        }
        if (!options.as)
            options.as = propertyName;
        association_1.addAssociation(target, new BelongsToManyAssociation_1.BelongsToManyAssociation(associatedClassGetter, options));
    };
}
exports.BelongsToMany = BelongsToMany;
//# sourceMappingURL=BelongsToMany.js.map