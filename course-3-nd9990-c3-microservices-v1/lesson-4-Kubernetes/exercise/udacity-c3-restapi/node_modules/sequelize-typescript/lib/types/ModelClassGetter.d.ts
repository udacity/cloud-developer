import { Model, NonAbstractTypeOfModel } from "../models/Model";
export declare type ModelClassGetter<T = Model<any>> = (returns?: void) => NonAbstractTypeOfModel<T>;
