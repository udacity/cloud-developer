"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAssociation_1 = require("./BaseAssociation");
var HasAssociation = /** @class */ (function (_super) {
    __extends(HasAssociation, _super);
    function HasAssociation(associatedClassGetter, options, association) {
        var _this = _super.call(this, associatedClassGetter) || this;
        _this.options = options;
        _this.association = association;
        return _this;
    }
    HasAssociation.prototype.getAssociation = function () {
        return this.association;
    };
    HasAssociation.prototype.getPreparedOptions = function (model, sequelize) {
        var options = __assign({}, this.options);
        var associatedClass = this.getAssociatedClass();
        options.foreignKey = this.getForeignKeyOptions(model, associatedClass, options.foreignKey);
        return options;
    };
    return HasAssociation;
}(BaseAssociation_1.BaseAssociation));
exports.HasAssociation = HasAssociation;
//# sourceMappingURL=HasAssociation.js.map