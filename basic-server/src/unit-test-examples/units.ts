// Super Simple Unit Functions

export const add = (a: number, b: number) => {
    return a + b;
}

export const divide = (a: number, b: number) => {
    if (b === 0) throw new Error('div by 0');

    return a / b;
}

// @TODO try creating a method "concat" to concatenate two strings
// it should take two string paramaters.
// it should return one string combining the two strings.
// it should throw an error if either of the strings are empty.
// ensure your function is exported.

export const concat = (strA: string, strB: string) => {
    if (!strA || !strB) throw new Error('Arguments must not be empty!');
    return strA + strB;
}
