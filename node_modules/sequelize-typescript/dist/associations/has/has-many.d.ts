import { HasManyOptions } from "sequelize";
import { ModelClassGetter } from "../../model/shared/model-class-getter";
export declare function HasMany(associatedClassGetter: ModelClassGetter, foreignKey?: string): Function;
export declare function HasMany(associatedClassGetter: ModelClassGetter, options?: HasManyOptions): Function;
