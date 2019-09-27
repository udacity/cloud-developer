import { UnionAssociationOptions } from './union-association-options';
import { Association } from './association';
import { ModelClassGetter } from "../../model/shared/model-class-getter";
import { Model } from "../../model/model/model";
import { Sequelize } from "../../sequelize/sequelize/sequelize";
export declare abstract class BaseAssociation {
    private associatedClassGetter;
    protected options: UnionAssociationOptions;
    constructor(associatedClassGetter: ModelClassGetter, options: UnionAssociationOptions);
    abstract getAssociation(): Association;
    abstract getSequelizeOptions(model: typeof Model, sequelize: Sequelize): UnionAssociationOptions;
    getAssociatedClass(): typeof Model;
    getAs(): string | {
        singular: string;
        plural: string;
    } | undefined;
}
