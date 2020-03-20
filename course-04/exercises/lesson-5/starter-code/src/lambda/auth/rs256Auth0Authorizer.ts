
import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'

import { verify } from 'jsonwebtoken'
import { JwtToken } from '../../auth/JwtToken'

const cert = `-----BEGIN CERTIFICATE-----
MIIDBzCCAe+gAwIBAgIJFEuksUX1G+Y1MA0GCSqGSIb3DQEBCwUAMCExHzAdBgNV
BAMTFmRldi1lbWFlay14OC5hdXRoMC5jb20wHhcNMjAwMzE5MTAzMDQ0WhcNMzMx
MTI2MTAzMDQ0WjAhMR8wHQYDVQQDExZkZXYtZW1hZWsteDguYXV0aDAuY29tMIIB
IjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzoXfMKyHiNWlgTPgUFN/RYbN
1ujJ6IfCkgaO9ZYA/TtMxZZMc0lthSc63TPcuKaSFtsjYTQP7DFyTB1t5yI67h8P
u9+JhCwJt/8K1ixIV95cHnwICYkbv/K0BZI9SA6pPGMNdRlD0XeCyxhfmy8rJysB
6MhR8wkN8NFIYOvAzfF26xhiVjutKymtmvCre726bebPFwpzqumlUCh/hrjBAuqH
yKggnlXr5+s42Yaky7yZrWsrbxsxGNtd/PP0ZXLHZSrcsB/WNJ91GPQ2mmuzkaJb
YVchGpcHXqCKQNz64jgsFUussOcVx7jUFLVc/lSWCBwpkurOvPiC+nkPyktuhQID
AQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBTfhVwPcwi5pgyYD70k
IiU+iG66SDAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBAJfFACsF
PVW/jkiY+XHiRC5RSNM1Mf+Ccr2ulCkm4XI8iFoq5AW7/lEoqEfF9LyAZ7Ulfx5p
IVBGks2oQEhtoRpAn7H93DFUdhtYcsTkbM0zo7OLc0eUFv0bZAfo6zCb1qtNyLR4
Y52jw2UBy9IoZqyYJ4JtHne6CmgcbVXhRUd9exzW0AqLHvUFlwP0tvrJp9n0WXP8
GYjiWSnmOZ9GoeMSbnbreNTdDUxUa+QdA1q6btMpZCAy4I2dhzLCE2JgpYhTPQzA
tLZuHpYrASWG1MmMFCnn8jLOMq7OSArF8fmPtbz7SQVCUVUIFeieTOdt/GcrYRn0
zYYWiUflB1XsG0U=
-----END CERTIFICATE-----`

export const handler = async (event: CustomAuthorizerEvent): Promise<CustomAuthorizerResult> => {
  try {
    const jwtToken = verifyToken(event.authorizationToken)
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
    console.log('User authorized', e.message)

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

function verifyToken(authHeader: string): JwtToken {
  if (!authHeader)
    throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return verify(token, cert, { algorithms: ['RS256'] }) as JwtToken
}
