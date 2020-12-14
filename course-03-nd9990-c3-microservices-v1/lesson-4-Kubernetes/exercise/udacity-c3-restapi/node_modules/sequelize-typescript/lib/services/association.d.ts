import 'reflect-metadata';
import { AssociationOptionsBelongsTo, AssociationOptionsHasMany, AssociationOptionsHasOne, AssociationOptionsManyToMany } from 'sequelize';
import { ISequelizeForeignKeyConfig } from "../interfaces/ISequelizeForeignKeyConfig";
import { ModelClassGetter } from "../types/ModelClassGetter";
import { BaseAssociation } from '../models/association/BaseAssociation';
export declare type NonBelongsToManyAssociationOptions = AssociationOptionsBelongsTo | AssociationOptionsHasMany | AssociationOptionsHasOne | AssociationOptionsManyToMany;
export declare function getPreparedAssociationOptions(optionsOrForeignKey?: string | NonBelongsToManyAssociationOptions): NonBelongsToManyAssociationOptions;
/**
 * Stores association meta data for specified class
 */
export declare function addAssociation(target: any, association: BaseAssociation): void;
/**
 * Returns association meta data from specified class
 */
export declare function getAssociations(target: any): BaseAssociation[] | undefined;
export declare function setAssociations(target: any, associations: BaseAssociation[]): void;
export declare function getAssociationsByRelation(target: any, relatedClass: any): BaseAssociation[];
/**
 * Adds foreign key meta data for specified class
 */
export declare function addForeignKey(target: any, relatedClassGetter: ModelClassGetter, foreignKey: string): void;
/**
 * Returns foreign key meta data from specified class
 */
export declare function getForeignKeys(target: any): ISequelizeForeignKeyConfig[] | undefined;
