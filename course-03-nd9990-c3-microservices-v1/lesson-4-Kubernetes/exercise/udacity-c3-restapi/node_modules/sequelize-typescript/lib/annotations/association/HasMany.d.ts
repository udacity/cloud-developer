import { AssociationOptionsHasMany } from 'sequelize';
import { ModelClassGetter } from "../../types/ModelClassGetter";
export declare function HasMany(associatedClassGetter: ModelClassGetter, foreignKey?: string): Function;
export declare function HasMany(associatedClassGetter: ModelClassGetter, options?: AssociationOptionsHasMany): Function;
