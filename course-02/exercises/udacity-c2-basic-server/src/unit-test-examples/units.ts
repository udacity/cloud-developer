// Super Simple Unit Functions

export const add = (a: number, b: number) => {
    return a + b;
    }

export const divide = (a: number, b: number) => {
    if(b === 0) { throw new Error('div by 0') }

    return a / b;
    }

// concat concatenates two strings.
// it should take two string paramaters.
// it should return one string combining the two strings.
// it should throw an error if either of the strings are empty.
// ensure your function is exported.
export const concat = (s1: string, s2: string) => {
    if (!s1 || !s2) { 
        throw new Error('empty string') 
    }

    return s1 + s2
}