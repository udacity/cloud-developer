import { AssociationOptionsBelongsTo } from 'sequelize';
import { ModelClassGetter } from "../../types/ModelClassGetter";
export declare function BelongsTo(associatedClassGetter: ModelClassGetter, foreignKey?: string): Function;
export declare function BelongsTo(associatedClassGetter: ModelClassGetter, options?: AssociationOptionsBelongsTo): Function;
