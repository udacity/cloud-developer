export interface JwtToken {
  iss: string
  sub: string
  iat: number
  exp: number
}
