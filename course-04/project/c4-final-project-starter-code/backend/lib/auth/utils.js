import { decode } from 'jsonwebtoken';
/**
 * Parse a JWT token and return a user id
 * @param jwtToken JWT token to parse
 * @returns a user id from the JWT token
 */
export function parseUserId(jwtToken) {
    const decodedJwt = decode(jwtToken);
    return decodedJwt.sub;
}
//# sourceMappingURL=utils.js.map