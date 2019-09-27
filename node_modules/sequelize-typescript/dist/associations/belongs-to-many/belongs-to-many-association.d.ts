import { Model } from "sequelize";
import { BaseAssociation } from '../shared/base-association';
import { BelongsToManyOptions } from './belongs-to-many-options';
import { ModelClassGetter } from "../../model/shared/model-class-getter";
import { Association } from "../shared/association";
import { Sequelize } from "../../sequelize/sequelize/sequelize";
import { UnionAssociationOptions } from "../shared/union-association-options";
export declare class BelongsToManyAssociation extends BaseAssociation {
    protected options: BelongsToManyOptions;
    constructor(associatedClassGetter: ModelClassGetter, options: BelongsToManyOptions);
    getAssociation(): Association;
    getSequelizeOptions(model: typeof Model, sequelize: Sequelize): UnionAssociationOptions;
    private getThroughOptions;
}
