import { HasOneOptions } from "sequelize";
import { ModelClassGetter } from "../../model/shared/model-class-getter";
export declare function HasOne(associatedClassGetter: ModelClassGetter, foreignKey?: string): Function;
export declare function HasOne(associatedClassGetter: ModelClassGetter, options?: HasOneOptions): Function;
