import 'reflect-metadata';
import { DataTypeAbstract, DefineOptions } from 'sequelize';
import { Model } from "../models/Model";
import { IPartialDefineAttributeColumnOptions } from "../interfaces/IPartialDefineAttributeColumnOptions";
import { ModelMatch } from '../types/SequelizeConfig';
export declare const DEFAULT_DEFINE_OPTIONS: DefineOptions<any>;
export declare const PROPERTY_LINK_TO_ORIG = "__origClass";
/**
 * Indicates which static methods of Model has to be proxied,
 * to prepare include option to automatically resolve alias;
 * The index represents the index of the options of the
 * corresponding method parameter
 */
export declare const INFER_ALIAS_MAP: {
    bulkBuild: number;
    build: number;
    create: number;
    aggregate: number;
    all: number;
    find: number;
    findAll: number;
    findAndCount: number;
    findAndCountAll: number;
    findById: number;
    findByPrimary: number;
    findCreateFind: number;
    findOne: number;
    findOrBuild: number;
    findOrCreate: number;
    findOrInitialize: number;
    reload: number;
};
/**
 * Sets model name from class by storing this
 * information through reflect metadata
 */
export declare function setModelName(target: any, modelName: string): void;
/**
 * Returns model name from class by restoring this
 * information from reflect metadata
 */
export declare function getModelName(target: any): string;
/**
 * Returns model attributes from class by restoring this
 * information from reflect metadata
 */
export declare function getAttributes(target: any): any | undefined;
/**
 * Sets attributes
 */
export declare function setAttributes(target: any, attributes: any): void;
/**
 * Adds model attribute by specified property name and
 * sequelize attribute options and stores this information
 * through reflect metadata
 */
export declare function addAttribute(target: any, name: string, options: any): void;
/**
 * Adds attribute options for specific attribute
 */
export declare function addAttributeOptions(target: any, propertyName: string, options: IPartialDefineAttributeColumnOptions): void;
/**
 * Returns sequelize define options from class prototype
 * by restoring this information from reflect metadata
 */
export declare function getOptions(target: any): DefineOptions<any> | undefined;
/**
 * Sets seuqlize define options to class prototype
 */
export declare function setOptions(target: any, options: DefineOptions<any>): void;
/**
 * Adds options be assigning new options to old one
 */
export declare function addOptions(target: any, options: DefineOptions<any>): void;
/**
 * Maps design types to sequelize data types;
 * @throws if design type cannot be automatically mapped to
 * a sequelize data type
 */
export declare function getSequelizeTypeByDesignType(target: any, propertyName: string): DataTypeAbstract;
/**
 * Determines models from value
 */
export declare function getModels(arg: Array<typeof Model | string>, modelMatch: ModelMatch): Array<typeof Model>;
/**
 * Resolves all model getters of specified options object
 * recursively.
 * So that {model: () => Person} will be converted to
 * {model: Person}
 */
export declare function resolveModelGetter(options: any): void;
/**
 * Pre conform includes, so that "as" value can be inferred from source
 */
export declare function inferAlias(options: any, source: any): any;
