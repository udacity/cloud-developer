import { BelongsToManyOptions } from "./belongs-to-many-options";
import { ModelClassGetter } from "../../model/shared/model-class-getter";
export declare function BelongsToMany(associatedClassGetter: ModelClassGetter, through: ModelClassGetter | string, foreignKey?: string, otherKey?: string): Function;
export declare function BelongsToMany(associatedClassGetter: ModelClassGetter, options: BelongsToManyOptions): Function;
