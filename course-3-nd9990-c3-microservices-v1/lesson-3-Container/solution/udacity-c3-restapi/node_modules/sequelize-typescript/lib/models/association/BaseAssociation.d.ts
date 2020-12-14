import { AssociationOptions } from '../../interfaces/AssociationOptions';
import { Model } from '../Model';
import { AssociationForeignKeyOptions } from 'sequelize';
import { BaseSequelize } from '../BaseSequelize';
import { Association } from '../../enums/Association';
import { ModelClassGetter } from '../../types/ModelClassGetter';
export declare abstract class BaseAssociation {
    private associatedClassGetter;
    private _options;
    constructor(associatedClassGetter: ModelClassGetter);
    abstract getAssociation(): Association;
    protected abstract getPreparedOptions(model: typeof Model, sequelize: BaseSequelize): AssociationOptions;
    getAssociatedClass(): typeof Model;
    init(model: typeof Model, sequelize: BaseSequelize): void;
    getSequelizeOptions(): AssociationOptions;
    protected getForeignKeyOptions(relatedClass: typeof Model, classWithForeignKey: typeof Model, foreignKey?: string | AssociationForeignKeyOptions): AssociationForeignKeyOptions;
}
