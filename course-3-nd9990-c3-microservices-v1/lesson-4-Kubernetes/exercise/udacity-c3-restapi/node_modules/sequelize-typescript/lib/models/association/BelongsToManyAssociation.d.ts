import { ModelClassGetter } from '../../types/ModelClassGetter';
import { BaseAssociation } from './BaseAssociation';
import { AssociationOptions } from '../../interfaces/AssociationOptions';
import { BaseSequelize } from '../BaseSequelize';
import { Model } from '../Model';
import { Association } from '../../enums/Association';
import { IAssociationOptionsBelongsToMany } from '../../interfaces/IAssociationOptionsBelongsToMany';
export declare class BelongsToManyAssociation extends BaseAssociation {
    private options;
    constructor(associatedClassGetter: ModelClassGetter, options: IAssociationOptionsBelongsToMany);
    getAssociation(): Association;
    protected getPreparedOptions(modelClass: typeof Model, sequelize: BaseSequelize): AssociationOptions;
    private getThroughOptions;
}
