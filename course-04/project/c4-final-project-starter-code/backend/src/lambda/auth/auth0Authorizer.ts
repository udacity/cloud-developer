import 'source-map-support/register'
import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'

import { JwtPayload } from '../../auth/JwtPayload'
import { verifyToken } from '../../business-logic/auth'
import { createLogger } from '../../utils/logger'

const logger = createLogger('auth')

export const handler = async (event: CustomAuthorizerEvent): Promise<CustomAuthorizerResult> => {

  try {
    logger.info('Authorizing a user...', event.authorizationToken)
    const jwtToken: JwtPayload = verifyToken(event.authorizationToken)
    logger.info('User was authorized.', jwtToken)

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
    logger.error('User not authorized.', { error: e.message })

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
