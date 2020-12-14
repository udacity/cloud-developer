import { ModelClassGetter } from "../../types/ModelClassGetter";
import { IAssociationOptionsBelongsToMany } from "../../interfaces/IAssociationOptionsBelongsToMany";
export declare function BelongsToMany(associatedClassGetter: ModelClassGetter, through: ModelClassGetter | string, foreignKey?: string, otherKey?: string): Function;
export declare function BelongsToMany(associatedClassGetter: ModelClassGetter, options: IAssociationOptionsBelongsToMany): Function;
