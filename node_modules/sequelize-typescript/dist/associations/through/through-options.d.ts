import { ThroughOptions as OriginThroughOptions } from 'sequelize';
import { ModelClassGetter } from "../../model/shared/model-class-getter";
export declare type ThroughOptions = {
    [K in keyof OriginThroughOptions]: K extends 'model' ? ModelClassGetter | string : OriginThroughOptions[K];
};
