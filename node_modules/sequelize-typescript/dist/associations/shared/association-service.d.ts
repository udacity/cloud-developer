import 'reflect-metadata';
import { BelongsToOptions, HasOneOptions, HasManyOptions, ManyToManyOptions } from 'sequelize';
import { BaseAssociation } from './base-association';
export declare type NonBelongsToManyAssociationOptions = BelongsToOptions | HasManyOptions | HasOneOptions | ManyToManyOptions;
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
