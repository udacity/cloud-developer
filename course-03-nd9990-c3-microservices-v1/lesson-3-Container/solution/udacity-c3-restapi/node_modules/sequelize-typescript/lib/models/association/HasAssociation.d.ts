import { BaseAssociation } from './BaseAssociation';
import { Model } from '../Model';
import { BaseSequelize } from '../BaseSequelize';
import { AssociationOptions } from '../../interfaces/AssociationOptions';
import { ModelClassGetter } from '../../types/ModelClassGetter';
import { AssociationOptionsHasMany, AssociationOptionsHasOne } from 'sequelize';
import { Association } from '../../enums/Association';
export declare class HasAssociation extends BaseAssociation {
    private options;
    private association;
    constructor(associatedClassGetter: ModelClassGetter, options: AssociationOptionsHasMany | AssociationOptionsHasOne, association: Association);
    getAssociation(): Association;
    protected getPreparedOptions(model: typeof Model, sequelize: BaseSequelize): AssociationOptions;
}
