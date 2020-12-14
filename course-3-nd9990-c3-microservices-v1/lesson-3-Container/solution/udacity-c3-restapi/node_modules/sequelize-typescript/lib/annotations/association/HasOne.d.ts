import { AssociationOptionsHasOne } from 'sequelize';
import { ModelClassGetter } from "../../types/ModelClassGetter";
export declare function HasOne(associatedClassGetter: ModelClassGetter, foreignKey?: string): Function;
export declare function HasOne(associatedClassGetter: ModelClassGetter, options?: AssociationOptionsHasOne): Function;
