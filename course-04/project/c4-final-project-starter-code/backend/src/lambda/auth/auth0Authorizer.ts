import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'
import { verify, decode } from 'jsonwebtoken'
import { createLogger } from '../../utils/logger'
import Axios from 'axios'
import { Jwt } from '../../auth/Jwt'
import { JwtPayload } from '../../auth/JwtPayload'

const logger = createLogger('auth')

const jwksUrl = 'https://dev-vqgdt17t.us.auth0.com/.well-known/jwks.json'

export const handler = async (
  event: CustomAuthorizerEvent
): Promise<CustomAuthorizerResult> => {
  logger.info('Authorizing a user', event.authorizationToken)
  try {
    const jwtToken = await verifyToken(event.authorizationToken)
    logger.info('User was authorized', jwtToken)

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
    logger.error('User not authorized', { error: e.message })

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

  // https://auth0.com/blog/navigating-rs256-and-jwks/#Finding-the-exact-signature-verification-key
  
  //Retrieve the JWKS and filter for potential signature verification keys.
  let options = {
    headers: {
      'Authorization': authHeader
    }
  }
  let jwks
  try{
  let response = await Axios.get(jwksUrl, options)
  jwks = response.data
  } catch (e) {
    logger.error('Error retrieving JWKS', { error: e.message })
  }



  // Extract the JWT from the request's authorization header.
  const extractedToken = getToken(authHeader)
  // Decode the JWT and grab the kid property from the header.
  const jwt: Jwt = decode(extractedToken, { complete: true }) as Jwt
  const kid = jwt.header['kid']
  
  // Find the signature verification key in the filtered JWKS with a matching kid property.
  const signingKey = jwks.keys.find(key => key.kid === kid)

  // Using the x5c property build a certificate which will be used to verify the JWT signature.
  let cert = signingKey.x5c[0].match(/.{1,64}/g).join('\n');
  cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;
  return verify(extractedToken, cert, {algorithms: ['RS256']}) as JwtPayload
}

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}