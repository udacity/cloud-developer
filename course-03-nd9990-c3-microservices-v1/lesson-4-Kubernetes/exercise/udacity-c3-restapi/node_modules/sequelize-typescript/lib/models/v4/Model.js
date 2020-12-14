"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const BaseModel_1 = require("../BaseModel");
exports._SeqModel = sequelize_1.Model;
class Model extends exports._SeqModel {
    constructor(values, options) {
        super(values, BaseModel_1.BaseModel.prepareInstantiationOptions(options, new.target));
    }
}
exports.Model = Model;
//# sourceMappingURL=Model.js.map