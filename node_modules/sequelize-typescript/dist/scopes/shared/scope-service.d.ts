import { Model } from "../../model/model/model";
import { ScopeOptions } from "./scope-options";
/**
 * Resolves scopes and adds them to the specified models
 */
export declare function resolveScopes(models: Array<typeof Model>): void;
/**
 * Adds scope option meta data for specified prototype
 */
export declare function addScopeOptions(target: any, options: ScopeOptions): void;
/**
 * Returns scope option meta data from specified target
 */
export declare function getScopeOptions(target: any): ScopeOptions | undefined;
