"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const OriginSequelize = require("sequelize");
const Model_1 = require("../Model");
const models_1 = require("../../services/models");
const BaseSequelize_1 = require("../BaseSequelize");
const Table_1 = require("../../annotations/Table");
class Sequelize extends OriginSequelize {
    constructor(config) {
        if (typeof config === "string") {
            super(config, BaseSequelize_1.BaseSequelize.prepareConfig({ url: config }));
        }
        else if (BaseSequelize_1.BaseSequelize.isISequelizeUriConfig(config)) {
            super(config.url, BaseSequelize_1.BaseSequelize.prepareConfig(config));
        }
        else {
            super(BaseSequelize_1.BaseSequelize.prepareConfig(config));
        }
        this.throughMap = {};
        this._ = {};
        if (typeof config !== "string") {
            this.init(config);
        }
    }
    getThroughModel(through) {
        // tslint:disable:max-classes-per-file
        let Through = class Through extends Model_1.Model {
        };
        Through = __decorate([
            Table_1.Table({ tableName: through, modelName: through })
        ], Through);
        return Through;
    }
    adjustAssociation(model, association) {
    }
    /**
     * Creates sequelize models and registers these models
     * in the registry
     */
    defineModels(models) {
        models.forEach(model => {
            const modelName = models_1.getModelName(model.prototype);
            const attributes = models_1.getAttributes(model.prototype);
            const options = models_1.getOptions(model.prototype);
            if (!options)
                throw new Error(`@Table annotation is missing on class "${model['name']}"`);
            options['modelName'] = modelName;
            options['sequelize'] = this;
            model['init'](attributes, options);
        });
    }
}
exports.Sequelize = Sequelize;
//# sourceMappingURL=Sequelize.js.map