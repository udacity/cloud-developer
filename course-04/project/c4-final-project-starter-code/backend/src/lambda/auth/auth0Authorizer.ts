import {CustomAuthorizerEvent, CustomAuthorizerResult} from 'aws-lambda'
import 'source-map-support/register'

import {verify, /*decode*/} from 'jsonwebtoken'
import {createLogger} from '../../utils/logger'
// import Axios from 'axios'
// import {Jwt} from '../../auth/Jwt'
import  {JwtPayload} from '../../auth/JwtPayload'
import {JwtToken} from "../../../../../../exercises/lesson-5/solution/src/auth/JwtToken";

// const jwksClient = require('jwks-rsa');

const logger = createLogger('auth');



export const handler = async (
    event: CustomAuthorizerEvent
): Promise<CustomAuthorizerResult> => {
    logger.info('Authorizing a user')
    try {
        const jwtToken = await verifyToken(event.authorizationToken)

        return {
            principalId: jwtToken.sub,
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: 'Allow',
                        Resource: '*'
                    }
                ]
            }
        }
    } catch (e) {
        logger.error('User not authorized', {error: e.message})

        return {
            principalId: 'user',
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: 'Deny',
                        Resource: '*'
                    }
                ]
            }
        }
    }
}

async function verifyToken(authHeader: string): Promise<JwtPayload> {
    const token = getToken(authHeader)

    // TODO: Implement token verification
    return verify(token, cert, { algorithms: ['RS256'] }) as JwtToken
}

function getToken(authHeader: string): string {
    if (!authHeader) throw new Error('No authentication header');

    if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header');

    const split = authHeader.split(' ');
    const token = split[1];

    return token
}
