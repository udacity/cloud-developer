import { HasManyOptions, HasOneOptions, Model } from 'sequelize';
import { BaseAssociation } from '../shared/base-association';
import { ModelClassGetter } from "../../model/shared/model-class-getter";
import { Association } from "../shared/association";
import { UnionAssociationOptions } from "../shared/union-association-options";
export declare class HasAssociation extends BaseAssociation {
    protected options: HasManyOptions | HasOneOptions;
    private association;
    constructor(associatedClassGetter: ModelClassGetter, options: HasManyOptions | HasOneOptions, association: Association);
    getAssociation(): Association;
    getSequelizeOptions(model: typeof Model): UnionAssociationOptions;
}
