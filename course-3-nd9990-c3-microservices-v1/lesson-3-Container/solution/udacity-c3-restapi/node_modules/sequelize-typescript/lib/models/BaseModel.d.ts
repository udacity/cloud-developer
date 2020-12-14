import * as Promise from "bluebird";
import { BuildOptions } from "sequelize";
import { IAssociationActionOptions } from "../interfaces/IAssociationActionOptions";
import { IFindOptions } from "../interfaces/IFindOptions";
export declare abstract class BaseModel {
    static isInitialized: boolean;
    static extend(target: any): void;
    /**
     * Prepares build options for instantiation of a model
     */
    static prepareInstantiationOptions(options: BuildOptions, source: any): BuildOptions;
    /**
     * Adds relation between specified instances and source instance
     */
    $add(propertyKey: string, instances: any, options?: IAssociationActionOptions): Promise<this>;
    /**
     * Sets relation between specified instances and source instance
     * (replaces old relations)
     */
    $set(propertyKey: string, instances: any, options: any): Promise<this>;
    /**
     * Returns related instance (specified by propertyKey) of source instance
     */
    $get(propertyKey: string, options: any): Promise<this>;
    /**
     * Counts related instances (specified by propertyKey) of source instance
     */
    $count(propertyKey: string, options: any): Promise<this>;
    /**
     * Creates instances and relate them to source instance
     */
    $create(propertyKey: string, values: any, options: any): Promise<this>;
    /**
     * Checks if specified instances is related to source instance
     */
    $has(propertyKey: string, instances: any, options: any): Promise<this>;
    /**
     * Removes specified instances from source instance
     */
    $remove(propertyKey: string, instances: any, options: any): Promise<this>;
    /**
     * Overridden due to infer alias from options is required
     *
     * SEE DETAILS FOR ACTUAL FUNCTIONALITY ON DECLARATION FILE
     */
    reload(options?: IFindOptions<typeof BaseModel>): Promise<this>;
}
