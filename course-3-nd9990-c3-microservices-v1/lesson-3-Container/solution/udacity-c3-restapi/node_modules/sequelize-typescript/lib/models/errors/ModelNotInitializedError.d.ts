import { Model } from '../Model';
export declare type ModelNotInitializedErrorOptions = {
    cause: string;
} | {
    accessedPropertyKey: string;
};
export declare class ModelNotInitializedError extends Error {
    message: string;
    constructor(modelClass: typeof Model, options: ModelNotInitializedErrorOptions);
}
