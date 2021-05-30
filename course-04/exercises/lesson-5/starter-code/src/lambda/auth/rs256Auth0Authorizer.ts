
import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { secretsManager } from 'middy/middlewares'

import { verify } from 'jsonwebtoken'
import { JwtToken } from '../../auth/JwtToken'

const secretId = process.env.AUTH_0_SECRET_ID
const certField = process.env.AUTH_0_CERT_FIELD

export const handler = middy(async (event: CustomAuthorizerEvent, context): Promise<CustomAuthorizerResult> => {
  try {
    console.log(context.AUTH0_SECRET)

    const jwtToken = verifyToken(event.authorizationToken, context.AUTH0_SECRET[certField])
    console.log('User was authorized', jwtToken)

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
    console.log('User was not authorized', e.message)
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
})

function verifyToken(authHeader: string, cert: string): JwtToken {
  if (!authHeader)
    throw new Error('No authentication header')

  if (!authHeader.toLocaleLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return verify(token, cert, { algorithms: ['RS256']}) as JwtToken
}

handler.use(
  secretsManager({
    cache: true,
    cacheExpiryInMillis: 60000,
    // Throw an error if can't read the secret
    throwOnFailedCall: true,
    setToContext: true,
    secrets: {
      AUTH0_SECRET: secretId
    }
  })
)