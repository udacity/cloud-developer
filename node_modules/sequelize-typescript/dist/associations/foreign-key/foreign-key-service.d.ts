import { ForeignKeyOptions, Model } from "sequelize";
import { ForeignKeyMeta } from './foreign-key-meta';
import { ModelClassGetter } from "../../model/shared/model-class-getter";
export declare function getForeignKeyOptions(relatedClass: typeof Model, classWithForeignKey?: typeof Model, foreignKey?: string | ForeignKeyOptions): ForeignKeyOptions;
/**
 * Adds foreign key meta data for specified class
 */
export declare function addForeignKey(target: any, relatedClassGetter: ModelClassGetter, foreignKey: string): void;
/**
 * Returns foreign key meta data from specified class
 */
export declare function getForeignKeys(target: any): ForeignKeyMeta[] | undefined;
