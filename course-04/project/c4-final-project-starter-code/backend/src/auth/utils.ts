import { decode } from 'jsonwebtoken'

import { JwtPayload } from './JwtPayload'

/**
 * Parse a JWT token and return a user id
 * @param jwtToken JWT token to parse
 * @returns A user id from the JWT token
 */
export function parseUserId(jwtToken: string): string {
  const decodedJwt = decode(jwtToken) as JwtPayload
  return decodedJwt.sub
}

/**
 * Get a JWT token from a authentication header
 * @param authHeader Header to parse
 * @returns A JWT token string
 */
export function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header.')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header.')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}
