import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'
import { verify, decode } from 'jsonwebtoken'
import { createLogger } from '../../utils/logger'
import Axios from 'axios'
import { Jwt } from '../../auth/Jwt'
import { JwtPayload } from '../../auth/JwtPayload'
// import * as AWS from 'aws-sdk'

const logger = createLogger('auth')
// const secretId = process.env.AUTH_0_SECRET_ID
// const secretField = process.env.AUTH_0_SECRET_FILED

// const client = new AWS.SecretsManager()

// let cachedSecret: string

// TODO: Provide a URL that can be used to download a certificate that can be used
// to verify JWT token signature.
// To get this URL you need to go to an Auth0 page -> Show Advanced Settings -> Endpoints -> JSON Web Key Set - DONE
const jwksUrl = 'https://dev-vqgdt17t.us.auth0.com/.well-known/jwks.json'
// const auth0Secret = process.env.AUTH_0_SECRET

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
  // return verify(token, secret, {algorithms: ['RS256']}) as JwtPayload
}

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}


// async function getSecret() {
//   if (cachedSecret) return cachedSecret

//   const data = await client.getSecretValue({SecretId: secretId}).promise()

//   cachedSecret = data.SecretString

//   return JSON.parse(cachedSecret)
// }

// async function getSigningKeys(token) {

//   let options = {
//     headers: {
//       'Authorization': 'Bearer ' + token
//     }
//   }
//   let response = await Axios.get(jwksUrl, options)
//   let parsedResponse = JSON.parse(response.data)

//   const cert = parsedResponse.find(key => key.current)

//   return {};

// // export function certToPEM(cert) {
// //   cert = cert.match(/.{1,64}/g).join('\n');
// //   cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;
// //   return cert;
// // }
// }



// async function auth(authHeaderr) {
  /* 
  1. Retrieve the JWKS and filter for potential signature verification keys.
  2. Extract the JWT from the request's authorization header.
  3. Decode the JWT and grab the kid property from the header.
  4. Find the signature verification key in the filtered JWKS with a matching kid property.
  5. Using the x5c property build a certificate which will be used to verify the JWT signature.
  6. Ensure the JWT contains the expected audience, issuer, expiration, etc.

  */


  //Retrieve the JWKS and filter for potential signature verification keys.
//   let options = {
//     headers: {
//       'Authorization': authHeaderr
//     }
//   }
//   let response = await Axios.get(jwksUrl, options)
//   const jwks = JSON.parse(response.data)



//   // Extract the JWT from the request's authorization header.
//   const extractedToken = getToken(authHeaderr)

//   // Decode the JWT and grab the kid property from the header.
//   const jwt: Jwt = decode(extractedToken, { complete: true }) as Jwt
//   const kid = jwt.header['kid']
  
//   // Find the signature verification key in the filtered JWKS with a matching kid property.

//   const signingKey = jwks.find(key => key.kid === kid)

//   // Using the x5c property build a certificate which will be used to verify the JWT signature.
//   let cert = signingKey.x5c.match(/.{1,64}/g).join('\n');
//   cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;


//   return cert;
//   // Ensure the JWT contains the expected audience, issuer, expiration, etc.

// }