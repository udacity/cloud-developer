import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'

import { verify } from 'jsonwebtoken'
//import { createLogger } from '../../utils/logger'
import Axios from 'axios'
//import { Jwt } from '../../auth/Jwt'
import { JwtPayload } from '../../auth/JwtPayload'
//import { jwks } from '../../auth/jwks'

//const logger = createLogger('auth')

// TODO: Provide a URL that can be used to download a certificate that can be used
// to verify JWT token signature.

const certificate = `-----BEGIN CERTIFICATE-----
MIIDBzCCAe+gAwIBAgIJc0995are579uMA0GCSqGSIb3DQEBCwUAMCExHzAdBgNV
BAMTFmRldi1uMW92eng3dy5hdXRoMC5jb20wHhcNMjAwNTE2MTAxMTI3WhcNMzQw
MTIzMTAxMTI3WjAhMR8wHQYDVQQDExZkZXYtbjFvdnp4N3cuYXV0aDAuY29tMIIB
IjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwZgaZoPmbPghy5OuiDsGIq7H
pmF2Q2ndXwbbBZCyS+aysQifZXsjtNc1QhJ7HFtRTdXRXLlFfAIgb9059cI4Zu7c
g3TQl4Vf1u9OF9suczUVYJCjcQqsqSCbg5jNNPGc1/dJ4QsrmzRqRunyodjJWHMm
pZ3HtRknTepKQJ+ihVlWEyAkTblyJf6TazurBg4X5xruNWurmE746VB/OjmWcHaf
jG9ocfGgNi89zuc03hvUq1fTvNi5gR0DrchqTsOvSWsL2tVOCzmmwoakMrFn26rs
swsKhaEfl9KJic36QYgydpvY+59sztRW4Aup9RIqCf2S2+5LJLjoDDtnAJTRlQID
AQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBSZVNDH3afRleHTgYFk
J6r/CdO6+jAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBABoLKJ5G
JeQMixa3b6GzvjSld03FSI/kLeVgADkoaUPGxgJ8gdkmq0q/6TNWLsKbgahBxkD6
auvzDmqDMNVzTfRHfgv6Lfs1ymo+XKF2HhBotEvaos+NO8mr1QzzNDFQm7fruN14
6O+akq9qvcnhE/wa18nXTPF10XcFs8G09lwGEeVslIiNoyiyo+VzpqHfcEacevpH
D031rdGTvzVCh5qo1fV2Bvlb/qCGFltF3Y9O5NX+SS4TnTRMf1v9KvacmM58DURz
Jq4LdxmhIx1q/Jq+TeV4CwXQZ6H1JcJScZhDzZQ++2J+w8dhLByHBmP+SG+Ges6N
Fu9kex9xM26acAc=
-----END CERTIFICATE-----`
export const handler = async (
  event: CustomAuthorizerEvent
): Promise<CustomAuthorizerResult> => {
  //logger.info('Authorizing a user', event.authorizationToken)

  console.log("inside Authorizing a user with authorization as" + event.authorizationToken)
  const jwks =  await Axios.get('https://dev-n1ovzx7w.auth0.com/.well-known/jwks.json')
  

  console.log('jwks  is ',jwks.data)
  try {
    const jwtToken = await verifyToken(event.authorizationToken)
    console.log("inside try able to pass the value")
    //logger.info('User was authorized', jwtToken)

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
 //   logger.error('User not authorized', { error: e.message })

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
  
  //const jwt: Jwt = decode(token, { complete: true }) as Jwt

  // TODO: Implement token verification
  // You should implement it similarly to how it was implemented for the exercise for the lesson 5
  // You can read more about how to do this here: https://auth0.com/blog/navigating-rs256-and-jwks/
  return await verify(token, certificate, { algorithms : ['RS256'] }) as JwtPayload  
 
}

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}
