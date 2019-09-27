import { BelongsToOptions } from 'sequelize';
import { BaseAssociation } from '../shared/base-association';
import { ModelClassGetter } from "../../model/shared/model-class-getter";
import { Association } from "../shared/association";
import { Model } from "../../model/model/model";
import { UnionAssociationOptions } from "../shared/union-association-options";
export declare class BelongsToAssociation extends BaseAssociation {
    protected options: BelongsToOptions;
    constructor(associatedClassGetter: ModelClassGetter, options: BelongsToOptions);
    getAssociation(): Association;
    getSequelizeOptions(model: typeof Model): UnionAssociationOptions;
}
