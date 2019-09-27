import { BelongsToOptions } from 'sequelize';
import { ModelClassGetter } from "../../model/shared/model-class-getter";
export declare function BelongsTo(associatedClassGetter: ModelClassGetter, foreignKey?: string): Function;
export declare function BelongsTo(associatedClassGetter: ModelClassGetter, options?: BelongsToOptions): Function;
