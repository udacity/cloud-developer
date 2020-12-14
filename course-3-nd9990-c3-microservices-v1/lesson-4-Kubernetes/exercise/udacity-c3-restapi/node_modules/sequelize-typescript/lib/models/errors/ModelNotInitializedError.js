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
Object.defineProperty(exports, "__esModule", { value: true });
var ModelNotInitializedError = /** @class */ (function (_super) {
    __extends(ModelNotInitializedError, _super);
    function ModelNotInitializedError(modelClass, options) {
        var _this = 
        /* istanbul ignore next */
        _super.call(this) || this;
        var cause = options['cause'];
        if (!('cause' in options)) {
            cause = "before \"" + options['accessedPropertyKey'] + "\" can be called.";
        }
        _this.message = "Model not initialized: \"" + modelClass.name + "\" " +
            ("needs to be added to a Sequelize instance " + cause);
        return _this;
    }
    return ModelNotInitializedError;
}(Error));
exports.ModelNotInitializedError = ModelNotInitializedError;
//# sourceMappingURL=ModelNotInitializedError.js.map