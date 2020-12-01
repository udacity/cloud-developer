import { JwtPayload } from './JwtPayload'
import { JwtHeader } from 'jsonwebtoken'

/**
 * Interface representing a JWT token
 */
export interface Jwt {
  header: JwtHeader
  payload: JwtPayload
}
