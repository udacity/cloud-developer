import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'
import { verify, decode } from 'jsonwebtoken'
import Axios from 'axios'

import { createLogger } from '../../utils/logger'
import { Jwt } from '../../auth/Jwt'
import { JwtPayload } from '../../auth/JwtPayload'

const logger = createLogger('auth')

// Provide a URL that can be used to download a certificate that can be used
// to verify JWT token signature.
// To get this URL you need to go to an Auth0 page -> Show Advanced Settings -> Endpoints -> JSON Web Key Set
const jwksUrl = 'https://dev-x1n-gpar.auth0.com/.well-known/jwks.json'

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
  if (jwt.header.alg !== 'RS256') {
    console.log('NOT RS256', jwt)
  }
  const key = await getJwks(jwt.header)
  
  // TODO: Implement token verification
  // You should implement it similarly to how it was implemented for the exercise for the lesson 5
  // You can read more about how to do this here: https://auth0.com/blog/navigating-rs256-and-jwks/
  return verify(
    token, // Token from an HTTP header to validate
    key.publicKey, // A certificate copied from Auth0 website
    { algorithms: ['RS256'] } // We need to specify that we use the RS256 algorithm
  ) as JwtPayload
}

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}

interface SigningKey {
  kid: string
  nbf: string
  publicKey: string
}

async function getJwks(header: Jwt['header']) {
  const response = await Axios.get(jwksUrl, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const { keys } = response.data
  const signingKeys = getSigningKeys(keys)
  const signingKey = getSigningKey(header.kid, signingKeys)
  return signingKey
}

function getSigningKeys(keys: any[]): SigningKey[] {
  if (!keys || !keys.length) {
    throw new Error('The JWKS endpoint did not contain any keys')
  }

  const signingKeys = keys
    .filter(
      key =>
        key.use === 'sig' && // JWK property `use` determines the JWK is for signing
        key.kty === 'RSA' && // We are only supporting RSA (RS256)
        key.kid && // The `kid` must be present to be useful for later
        ((key.x5c && key.x5c.length) || (key.n && key.e)) // Has useful public keys
    )
    .map(key => {
      return { kid: key.kid, nbf: key.nbf, publicKey: certToPEM(key.x5c[0]) }
    })

  if (!signingKeys.length) {
    throw new Error('The JWKS endpoint did not contain any signing keys')
  }

  return signingKeys
}

function certToPEM(cert: string) {
  cert = cert.match(/.{1,64}/g).join('\n')
  cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`
  return cert
}

function getSigningKey(kid: string, keys: SigningKey[]): SigningKey {
  const signingKey = keys.find(key => key.kid === kid)
  if (!signingKey) {
    throw new Error(`Unable to find a signing key that matches '${kid}'`)
  }
  return signingKey
}

export default handler
