/**
 * Will not allow values, that match the string regex or real regex
 */
export declare function Not(arg: string | Array<string | RegExp> | RegExp | {
    msg: string;
    args: string | Array<string | RegExp> | RegExp;
}): Function;
