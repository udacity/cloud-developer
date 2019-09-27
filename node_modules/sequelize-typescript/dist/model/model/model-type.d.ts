import { Model } from './model';
export declare type NonAbstract<T> = {
    [P in keyof T]: T[P];
};
export declare type Constructor<T> = (new (...args: any[]) => T);
export declare type ModelType<T extends Model<T>> = (Constructor<T> & NonAbstract<typeof Model>);
