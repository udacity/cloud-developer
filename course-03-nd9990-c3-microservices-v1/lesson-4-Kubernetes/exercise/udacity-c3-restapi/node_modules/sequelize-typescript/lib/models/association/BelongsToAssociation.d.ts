import { BaseAssociation } from './BaseAssociation';
import { Model } from '../Model';
import { BaseSequelize } from '../BaseSequelize';
import { AssociationOptions } from '../../interfaces/AssociationOptions';
import { ModelClassGetter } from '../../types/ModelClassGetter';
import { AssociationOptionsBelongsTo } from 'sequelize';
import { Association } from '../../enums/Association';
export declare class BelongsToAssociation extends BaseAssociation {
    private options;
    constructor(associatedClassGetter: ModelClassGetter, options: AssociationOptionsBelongsTo);
    getAssociation(): Association;
    protected getPreparedOptions(model: typeof Model, sequelize: BaseSequelize): AssociationOptions;
}
