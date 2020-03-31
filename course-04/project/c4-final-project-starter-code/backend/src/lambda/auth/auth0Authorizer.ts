import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'
import axios from 'axios';
import { verify, decode } from 'jsonwebtoken'
import { createLogger } from '../../utils/logger'
import { Jwt } from '../../auth/Jwt'
import { JwtPayload } from '../../auth/JwtPayload'

const logger = createLogger('auth');

// Provide a URL that can be used to download a certificate that can be used
// to verify JWT token signature.
// To get this URL you need to go to an Auth0 page -> Show Advanced Settings -> Endpoints -> JSON Web Key Set
const jwksUrl = 'https://dev-aoae44ef.auth0.com/.well-known/jwks.json';

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
  const token = getToken(authHeader)
  const jwt: Jwt = decode(token, { complete: true }) as Jwt
  logger.info('jwt', jwt);
  // Recap: https://classroom.udacity.com/nanodegrees/nd9990/parts/a46aa194-de1d-45fd-83ef-d83080ee8f3c/modules/826241f6-8d5f-436b-b01e-4ea8885d866d/lessons/742ea2a0-0573-4332-99c6-e716e22b60d7/concepts/90da357f-9f55-4ce8-a23e-937202e2beb3
  // Implement token verification
  // You should implement it similarly to how it was implemented for the exercise for the lesson 5
  // You can read more about how to do this here: https://auth0.com/blog/navigating-rs256-and-jwks/


  const keySet = await getFirstKeySetFromJwksUrl();
  const alg = 'RS256';
  if (keySet.alg === alg && jwt.header.kid === keySet.kid && keySet.x5c[0]) {
    const certificate = certToPEM(keySet.x5c[0]); // Need to be in PEM and not certificate format
    logger.info('To verify token and cerificate');
    return verify(token, certificate, { algorithms: [alg] }) as JwtPayload;
  }
  logger.error('Failed to verify token from keys returns from JwksUrl');
}

// Original function from here https://github.com/sgmeyer/auth0-node-jwks-rs256/blob/master/src/lib/JwksClient.js#L30-L58
export function certToPEM(cert) {
  cert = cert.match(/.{1,64}/g).join('\n');
  cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;
  return cert;
}

async function getFirstKeySetFromJwksUrl() {
  try {
    const response = await axios(jwksUrl);
    logger.info('Successfully retrieve jwks keys from jwksurl', response);
    return response.data.keys[0];
  } catch (err) {
    logger.error('Failed to retrieve jwks keys from jwksurl', err);
  }
}

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}
