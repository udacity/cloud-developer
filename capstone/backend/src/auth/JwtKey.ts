export interface JwtKey {
    alg: string,
    kty:string,
    use:string,
    x5c:string[],
    n:string,
    e:string,
    kid:string,
    x5t:string,
    nbf:string
  }
  