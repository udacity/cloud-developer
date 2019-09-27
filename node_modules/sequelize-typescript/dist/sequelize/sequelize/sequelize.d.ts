import { Sequelize as OriginSequelize } from 'sequelize';
import { ModelMatch, SequelizeOptions } from "./sequelize-options";
import { Model, ModelCtor } from "../../model/model/model";
import { Repository } from "../..";
export declare class Sequelize extends OriginSequelize {
    options: SequelizeOptions;
    repositoryMode: boolean;
    constructor(database: string, username: string, password?: string, options?: SequelizeOptions);
    constructor(database: string, username: string, options?: SequelizeOptions);
    constructor(options?: SequelizeOptions);
    constructor(uri: string, options?: SequelizeOptions);
    model(model: string | typeof Model): ModelCtor;
    addModels(models: ModelCtor[]): any;
    addModels(modelPaths: string[]): any;
    addModels(modelPaths: string[], modelMatch?: ModelMatch): any;
    addModels(arg: Array<ModelCtor | string>): any;
    getRepository<M extends Model>(modelClass: (new () => M)): Repository<M>;
    private associateModels;
    private defineModels;
    private createRepositoryModel;
}
