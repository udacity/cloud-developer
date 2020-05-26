// import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
// import 'source-map-support/register'

// import { verify } from 'jsonwebtoken'
// //import { createLogger } from '../../utils/logger'
// //import Axios from 'axios'
// //import { Jwt } from '../../auth/Jwt'
// import { JwtPayload } from '../../auth/JwtPayload'
// //import { jwks } from '../../auth/jwks'

// //const logger = createLogger('auth')

// // TODO: Provide a URL that can be used to download a certificate that can be used
// // to verify JWT token signature.

// const certificate = `MIIDBzCCAe+gAwIBAgIJc0995are579uMA0GCSqGSIb3DQEBCwUAMCExHzAdBgNVBAMTFmRldi1uMW92eng3dy5hdXRoMC5jb20wHhcNMjAwNTE2MTAxMTI3WhcNMzQwMTIzMTAxMTI3WjAhMR8wHQYDVQQDExZkZXYtbjFvdnp4N3cuYXV0aDAuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwZgaZoPmbPghy5OuiDsGIq7HpmF2Q2ndXwbbBZCyS+aysQifZXsjtNc1QhJ7HFtRTdXRXLlFfAIgb9059cI4Zu7cg3TQl4Vf1u9OF9suczUVYJCjcQqsqSCbg5jNNPGc1/dJ4QsrmzRqRunyodjJWHMmpZ3HtRknTepKQJ+ihVlWEyAkTblyJf6TazurBg4X5xruNWurmE746VB/OjmWcHafjG9ocfGgNi89zuc03hvUq1fTvNi5gR0DrchqTsOvSWsL2tVOCzmmwoakMrFn26rsswsKhaEfl9KJic36QYgydpvY+59sztRW4Aup9RIqCf2S2+5LJLjoDDtnAJTRlQIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBSZVNDH3afRleHTgYFkJ6r/CdO6+jAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBABoLKJ5GJeQMixa3b6GzvjSld03FSI/kLeVgADkoaUPGxgJ8gdkmq0q/6TNWLsKbgahBxkD6auvzDmqDMNVzTfRHfgv6Lfs1ymo+XKF2HhBotEvaos+NO8mr1QzzNDFQm7fruN146O+akq9qvcnhE/wa18nXTPF10XcFs8G09lwGEeVslIiNoyiyo+VzpqHfcEacevpHD031rdGTvzVCh5qo1fV2Bvlb/qCGFltF3Y9O5NX+SS4TnTRMf1v9KvacmM58DURzJq4LdxmhIx1q/Jq+TeV4CwXQZ6H1JcJScZhDzZQ++2J+w8dhLByHBmP+SG+Ges6NFu9kex9xM26acAc=`
// export const handler = async (
//   event: CustomAuthorizerEvent
// ): Promise<CustomAuthorizerResult> => {
//  // logger.info('Authorizing a user', event.authorizationToken)
//   try {
//     const jwtToken = await verifyToken(event.authorizationToken)
//    // logger.info('User was authorized', jwtToken)

//     return {
//       principalId: jwtToken.sub,
//       policyDocument: {
//         Version: '2012-10-17',
//         Statement: [
//           {
//             Action: 'execute-api:Invoke',
//             Effect: 'Allow',
//             Resource: '*'
//           }
//         ]
//       }
//     }
//   } catch (e) {
//  //   logger.error('User not authorized', { error: e.message })

//     return {
//       principalId: 'user',
//       policyDocument: {
//         Version: '2012-10-17',
//         Statement: [
//           {
//             Action: 'execute-api:Invoke',
//             Effect: 'Deny',
//             Resource: '*'
//           }
//         ]
//       }
//     }
//   }
// }

// async function verifyToken(authHeader: string): Promise<JwtPayload> {
//   const token = getToken(authHeader)
  
//   //const jwt: Jwt = decode(token, { complete: true }) as Jwt

//   // TODO: Implement token verification
//   // You should implement it similarly to how it was implemented for the exercise for the lesson 5
//   // You can read more about how to do this here: https://auth0.com/blog/navigating-rs256-and-jwks/
//   return  verify(token, certificate, { algorithms : ['RS256'] }) as JwtPayload  
 
// }

// function getToken(authHeader: string): string {
//   if (!authHeader) throw new Error('No authentication header')

//   if (!authHeader.toLowerCase().startsWith('bearer '))
//     throw new Error('Invalid authentication header')

//   const split = authHeader.split(' ')
//   const token = split[1]

//   return token
// }
