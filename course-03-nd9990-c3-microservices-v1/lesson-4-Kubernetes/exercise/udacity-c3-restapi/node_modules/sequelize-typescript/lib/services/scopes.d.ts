import 'reflect-metadata';
import { Model } from "../models/Model";
import { IScopeOptions } from "../interfaces/IScopeOptions";
/**
 * Resolves scopes and adds them to the specified models
 */
export declare function resolveScopes(models: Array<typeof Model>): void;
/**
 * Adds scope option meta data for specified prototype
 */
export declare function addScopeOptions(target: any, options: IScopeOptions): void;
/**
 * Returns scope option meta data from specified target
 */
export declare function getScopeOptions(target: any): IScopeOptions | undefined;
