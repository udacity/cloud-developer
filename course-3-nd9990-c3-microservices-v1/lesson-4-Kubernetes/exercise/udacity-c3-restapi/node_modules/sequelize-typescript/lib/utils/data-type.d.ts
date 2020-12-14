import { DataTypeAbstract } from 'sequelize';
export declare function isDataType(value: any): boolean;
/**
 * Infers sequelize data type by design type
 */
export declare function inferDataType(designType: any): DataTypeAbstract | undefined;
