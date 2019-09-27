import { Model } from "../model/model/model";
import { ScopeOptions, ScopeOptionsGetters, ScopesOptions } from "./scope-options";
/**
 * Resolves scopes and adds them to the specified models
 */
export declare function resolveScopes(models: Array<typeof Model>): void;
export declare const resolveScope: (scopeName: string, model: typeof Model, options: ScopesOptions) => void;
export declare const addScopeOptionsGetter: (target: any, options: ScopeOptionsGetters) => void;
export declare const getScopeOptionsGetters: (target: any) => ScopeOptionsGetters;
export declare const setScopeOptionsGetters: (target: any, options: ScopeOptionsGetters) => void;
/**
 * @deprecated
 */
export declare const resolvesDeprecatedScopes: (model: typeof Model) => void;
/**
 * Adds scope option meta data for specified prototype
 * @deprecated
 */
export declare function addScopeOptions(target: any, options: ScopeOptions): void;
/**
 * Returns scope option meta data from specified target
 * @deprecated
 */
export declare function getScopeOptions(target: any): ScopeOptions | undefined;
