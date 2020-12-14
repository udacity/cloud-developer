import 'reflect-metadata';
/**
 * Adds custom validator
 * @param name Name of validator
 * @param validator Validator function
 */
export declare function Is(name: string, validator: (value: any) => any): Function;
/**
 * Adds custom validator
 * @param validator Validator function
 */
export declare function Is(validator: (value: any) => any): Function;
/**
 * Will only allow values, that match the string regex or real regex
 */
export declare function Is(arg: string | Array<string | RegExp> | RegExp | {
    msg: string;
    args: string | Array<string | RegExp> | RegExp;
}): Function;
