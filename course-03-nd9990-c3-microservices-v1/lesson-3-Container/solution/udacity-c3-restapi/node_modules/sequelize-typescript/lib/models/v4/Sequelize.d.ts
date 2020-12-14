import 'reflect-metadata';
import OriginSequelize = require('sequelize');
import { Model } from "../Model";
import { SequelizeConfig } from "../../types/SequelizeConfig";
import { BaseSequelize } from "../BaseSequelize";
import { BaseAssociation } from '../association/BaseAssociation';
export declare class Sequelize extends OriginSequelize implements BaseSequelize {
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
    adjustAssociation(model: any, association: BaseAssociation): void;
    /**
     * Creates sequelize models and registers these models
     * in the registry
     */
    defineModels(models: Array<typeof Model>): void;
}
