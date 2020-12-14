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
var Association_1 = require("../../enums/Association");
var ModelNotInitializedError_1 = require("../errors/ModelNotInitializedError");
var BelongsToManyAssociation = /** @class */ (function (_super) {
    __extends(BelongsToManyAssociation, _super);
    function BelongsToManyAssociation(associatedClassGetter, options) {
        var _this = _super.call(this, associatedClassGetter) || this;
        _this.options = options;
        return _this;
    }
    BelongsToManyAssociation.prototype.getAssociation = function () {
        return Association_1.Association.BelongsToMany;
    };
    BelongsToManyAssociation.prototype.getPreparedOptions = function (modelClass, sequelize) {
        var options = __assign({}, this.options);
        var associatedClass = this.getAssociatedClass();
        var throughOptions = this.getThroughOptions(modelClass, sequelize);
        options.through = throughOptions;
        options.foreignKey = this.getForeignKeyOptions(modelClass, throughOptions.model, this.options.foreignKey);
        options.otherKey = this.getForeignKeyOptions(associatedClass, throughOptions.model, this.options.otherKey);
        return options;
    };
    BelongsToManyAssociation.prototype.getThroughOptions = function (modelClass, sequelize) {
        var through = this.options.through;
        var model = typeof through === 'object' ? through.model : through;
        var throughOptions = typeof through === 'object' ? __assign({}, through) : {};
        if (typeof model === 'function') {
            var throughModelClass = model();
            if (!throughModelClass.isInitialized) {
                throw new ModelNotInitializedError_1.ModelNotInitializedError(throughModelClass, {
                    cause: 'before association can be resolved.'
                });
            }
            throughOptions.model = throughModelClass;
        }
        else if (typeof model === 'string') {
            if (!sequelize.throughMap[model]) {
                var throughModel = sequelize.getThroughModel(model);
                sequelize.addModels([throughModel]);
                sequelize.throughMap[model] = throughModel;
            }
            throughOptions.model = sequelize.throughMap[model];
        }
        else {
            throw new Error("Through model is missing for belongs to many association on " + modelClass.name);
        }
        return throughOptions;
    };
    return BelongsToManyAssociation;
}(BaseAssociation_1.BaseAssociation));
exports.BelongsToManyAssociation = BelongsToManyAssociation;
//# sourceMappingURL=BelongsToManyAssociation.js.map