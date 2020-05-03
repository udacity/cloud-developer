import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'

import { verify, decode } from 'jsonwebtoken'
import { createLogger } from '../../utils/logger'
import Axios from 'axios'
import { Jwt } from '../../auth/Jwt'
import { JwtPayload } from '../../auth/JwtPayload'

const logger = createLogger('auth')

// Provide a URL that can be used to download a certificate that can be used
// to verify JWT token signature.
// To get this URL you need to go to an Auth0 page -> Show Advanced Settings -> Endpoints -> JSON Web Key Set
const cert = `-----BEGIN CERTIFICATE-----
MIIDBzCCAe+gAwIBAgIJAsWRJzfaqCtJMA0GCSqGSIb3DQEBCwUAMCExHzAdBgNV
BAMTFmRldi15cW1peWtrZi5hdXRoMC5jb20wHhcNMjAwNTAzMjIwNTM0WhcNMzQw
MTEwMjIwNTM0WjAhMR8wHQYDVQQDExZkZXYteXFtaXlra2YuYXV0aDAuY29tMIIB
IjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuufQYhNpbUVh8My42T4Ux/wS
Xl9wHlE4SXgVmXUcUsmeNzkfXsevYW8NczvR7Y5YiZ7kneuxcPdeYn1m3Uck/D9y
88aoBsv4SRPzhfNyX/d93uR5bB8ypAcfnT3OpD/54cXQQOQvoLtYYas3XB6RoHCV
oSjY+2pcOVu0xo6/1YgL0D/ysODbKwoOY4EkYs2UJLCkIyegWKHdLdHrD8Sq7E0A
D+AXrobPOuMHztPh2QyVUDXXDjodwLYA3/Le9OzMtfKT7c9C+3lbNyuRtFipQR61
gy5QaoCWCajXz0qZTYZ2hE3VKqC6UDXlXqIFwPMzcfHPdCtkYKZWuTfa/jmE8QID
AQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBR2sEEdIq66Rz+F1EH8
wrymp7V/cTAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBAAHXMAUL
yk8MHpCQxCkEybc9AESqRx9KOs2xQcdzpJvLnW+Fkw9tQxy3eB2xiBEi8o7TJkqA
d0civJKxKKd8PtfNzVTAVy+UOuLk2lJR3bkWYYUzEA+vdugzdi7fbxeRchqunwDa
sAYdRyMS/TohusxMZlZhjy8KkXe2rW58C+V25cBMrZOJdt2pQUwaZY/YA5rFPdqP
YQQFyNjnhky9sBP0OYI7E9Y7qq8gzAdnflvse5Fn4h1489pNMH4HpbiLjctcdXFH
wLjLfnau7xz/IJVX759O/m4UjiYU0hCD+MZP7xCCoxfQe/ISnJqZASPRa8m7aWqE
l0Hv2298xPXqmZI=
-----END CERTIFICATE-----`

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
  console.log(jwt, Axios);
  
  // Implement token verification
  // You should implement it similarly to how it was implemented for the exercise for the lesson 5
  // You can read more about how to do this here: https://auth0.com/blog/navigating-rs256-and-jwks/
  return verify(token, cert, { algorithms: ["RS256"] }) as JwtPayload;
}

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}
