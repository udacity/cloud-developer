import 'reflect-metadata';
import { DataTypeAbstract } from 'sequelize';
import { IPartialDefineAttributeColumnOptions } from "../interfaces/IPartialDefineAttributeColumnOptions";
export declare function Column(dataType: DataTypeAbstract): Function;
export declare function Column(options: IPartialDefineAttributeColumnOptions): Function;
export declare function Column(target: any, propertyName: string, propertyDescriptor?: PropertyDescriptor): void;
