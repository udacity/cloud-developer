
import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'

import { verify } from 'jsonwebtoken'
import { JwtToken } from '../../auth/JwtToken'

const cert = `-----BEGIN CERTIFICATE-----
MIIDDTCCAfWgAwIBAgIJS7xl4qYqr2idMA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNV
BAMTGWRldi05dHM5emdkMy5ldS5hdXRoMC5jb20wHhcNMjEwNjEwMTgyMDA3WhcN
MzUwMjE3MTgyMDA3WjAkMSIwIAYDVQQDExlkZXYtOXRzOXpnZDMuZXUuYXV0aDAu
Y29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmQiffY1/Ncu2h9Gw
di80XJeCwIW/jUlgSo0px5x3MqJ+vRj38HeVh8GCZZku589OhHgBnrwFhNpJMiip
lpFOHyBgU8kDPsFnCURvXWqt6aOiqPNSRxsdK/nCnTMkrmX/LiP3GQZ7g/xJbbRY
SRAPZuQrdofEwtOovir2kTn88jexPRBCz/Vq1OThCJrelECskjy/RgG8jPZSzqGO
TeTtyOsemUIHV8BQlkpB8dFlYTpkYKoct/RQgKTw9fjmNJ8Gv0UdKxtqyUSpx1h3
GMZgdYcRpODmhp25uc551bb0Rh71n9aEKwe6xD3WCsbdYLOfLllAs9ZaBHXmKW3C
qMXD3wIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBTOR9zRlEPR
nauUkL/Q1+gsxiIP7TAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEB
ACz0ISUaCkI/QnEo2oP+jvjVJJMoiYCPH4Nit1tXhH3LTrd5W9HxV5xEV4TgbkDE
cAZMMOgcWZzqbiM6C0/WRxxRawvLYdG7EUqa9TcwUAsUK0bN7antWiF6CoUJ63eU
DXHBkXUTbqchALdCQ3VyVEtVnLX3XL70AhDfaB0Af2QcWzNqFKWeyWxNUfOIW+9Z
Kk2S0uadsMzt6UwElw7hlm8jilXKji0w8UBxWMjdvSCT2kz38nOWV7FVwOyZNyTa
cBE4l4zDw0J20eX4+0yCPSvyEkMzlk48dmFLRq+g4RPjsHUP++4mZZ9YPT6+FI52
OcO46oKW6OkW6ZZFmTN506Q=
-----END CERTIFICATE-----`

export const handler = async (event: CustomAuthorizerEvent): Promise<CustomAuthorizerResult> => {
  try {
    const decodedToken = verifyToken(
      event.authorizationToken,
      cert
    )
    console.log('User was authorized', decodedToken)

    return {
      principalId: decodedToken.sub,
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
}

function verifyToken(authHeader: string, cert: string): JwtToken {
  if (!authHeader)
    throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return verify(
    token,           // Token from an HTTP header to validate
    cert,            // A certificate copied from Auth0 website
    { algorithms: ['RS256'] } // We need to specify that we use the RS256 algorithm
  ) as JwtToken
}
