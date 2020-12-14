import 'reflect-metadata';
import { Model } from "../models/Model";
import { ISequelizeHook } from "../interfaces/ISequelizeHook";
import { IHookOptions } from "../interfaces/IHookOptions";
/**
 * Installs hooks on the specified models
 */
export declare function installHooks(models: Array<typeof Model>): void;
/**
 * Implementation for hook decorator functions. These are polymorphic. When
 * called with a single argument (IHookOptions) they return a decorator
 * factory function. When called with multiple arguments, they add the hook
 * to the model’s metadata.
 */
export declare function implementHookDecorator(hookType: string, args: any[]): Function | void;
/**
 * Adds hook meta data for specified model
 * @throws if applied to a non-static method
 * @throws if the hook method name is reserved
 */
export declare function addHook(target: any, hookType: string, methodName: string, options?: IHookOptions): void;
/**
 * Returns hooks meta data from specified class
 */
export declare function getHooks(target: any): ISequelizeHook[] | undefined;
/**
 * Saves hooks meta data for the specified class
 */
export declare function setHooks(target: any, hooks: ISequelizeHook[]): void;
