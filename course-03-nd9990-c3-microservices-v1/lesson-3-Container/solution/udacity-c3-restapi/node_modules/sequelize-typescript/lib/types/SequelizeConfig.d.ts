import { ISequelizeConfig } from "../interfaces/ISequelizeConfig";
import { ISequelizeUriConfig } from "../interfaces/ISequelizeUriConfig";
import { ISequelizeDbNameConfig } from "../interfaces/ISequelizeDbNameConfig";
import { ISequelizeStorageConfig } from "../interfaces/ISequelizeStorageConfig";
export declare type SequelizeConfig = ISequelizeConfig | ISequelizeUriConfig | ISequelizeDbNameConfig | ISequelizeStorageConfig;
export declare type ModelMatch = (filename: string, member: string) => boolean;
