import { ScopeTableOptions } from './scope-table-options';
import { ScopeFindOptions } from "./scope-find-options";
import { FindOptions } from "sequelize";
export interface ScopeOptions extends ScopeTableOptions {
    defaultScope?: ScopeFindOptions;
}
export interface ScopeOptionsGetters {
    getDefaultScope?: DefaultScopeGetter;
    getScopes?: ScopesOptionsGetter;
}
export declare type DefaultScopeGetter = () => FindOptions;
export declare type ScopesOptionsGetter = () => ({
    [sopeName: string]: ScopesOptions;
});
export declare type ScopesOptions = FindOptions | ((...args: any[]) => FindOptions);
