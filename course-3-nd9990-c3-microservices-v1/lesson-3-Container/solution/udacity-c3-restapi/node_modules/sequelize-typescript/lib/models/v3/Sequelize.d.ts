import 'reflect-metadata';
import SequelizeOrigin = require('sequelize');
import { Model } from "../Model";
import { SequelizeConfig } from "../../types/SequelizeConfig";
import { BaseSequelize } from "../BaseSequelize";
import { BaseAssociation } from '../association/BaseAssociation';
export declare class Sequelize extends SequelizeOrigin implements BaseSequelize {
    Model: any;
    throughMap: {
        [through: string]: any;
    };
    _: {
        [modelName: string]: typeof Model;
    };
    init: (config: SequelizeConfig) => void;
    addModels: (models: Array<typeof Model> | string[]) => void;
    associateModels: (models: Array<typeof Model>) => void;
    connectionManager: any;
    constructor(config: SequelizeConfig | string);
    getThroughModel(through: string): typeof Model;
    /**
     * The association needs to be adjusted. So that throughModel properties
     * referencing a original sequelize Model instance
     */
    adjustAssociation(model: any, association: BaseAssociation): void;
    /**
     * Creates sequelize models and registers these models
     * in the registry
     */
    defineModels(classes: Array<typeof Model>): void;
}
