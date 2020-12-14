import { Model } from "./Model";
import { ISequelizeConfig } from "../interfaces/ISequelizeConfig";
import { ISequelizeUriConfig } from "../interfaces/ISequelizeUriConfig";
import { ISequelizeDbNameConfig } from "../interfaces/ISequelizeDbNameConfig";
import { ModelMatch, SequelizeConfig } from '../types/SequelizeConfig';
import { ISequelizeValidationOnlyConfig } from "../interfaces/ISequelizeValidationOnlyConfig";
import { BaseAssociation } from './association/BaseAssociation';
/**
 * Why does v3/Sequlize and v4/Sequelize does not extend? Because of
 * the transpile target, which is for v3/Sequelize and BaseSequelize ES5
 * and for v4/Sequelize ES6. This is needed for extending the original
 * Sequelize (version 4), which is an ES6 class: ES5 constructor-pattern
 * "classes" cannot extend ES6 classes
 */
export declare abstract class BaseSequelize {
    options: any;
    throughMap: {
        [through: string]: any;
    };
    _: {
        [modelName: string]: (typeof Model);
    };
    static isISequelizeDbNameConfig(obj: any): obj is ISequelizeDbNameConfig;
    static isISequelizeUriConfig(obj: any): obj is ISequelizeUriConfig;
    static extend(target: any): void;
    /**
     * Prepares sequelize config passed to original sequelize constructor
     */
    static prepareConfig(config: SequelizeConfig | ISequelizeValidationOnlyConfig): SequelizeConfig;
    static getValidationOnlyConfig(config: SequelizeConfig | ISequelizeValidationOnlyConfig): ISequelizeConfig;
    addModels(models: Array<typeof Model>): void;
    addModels(modelPaths: string[], modelMatch?: ModelMatch): void;
    init(config: SequelizeConfig): void;
    /**
     * Processes model associations
     */
    associateModels(models: Array<typeof Model>): void;
    /**
     * Since es6 classes cannot be extended by es5 constructor-functions the
     * "through" model needs to be created by the appropriate sequelize version
     * (sequelize v3 and v4 are transpiled with different targets (es5/es6))
     */
    abstract getThroughModel(through: string): typeof Model;
    abstract adjustAssociation(model: any, association: BaseAssociation): void;
    abstract defineModels(models: Array<typeof Model>): void;
}
