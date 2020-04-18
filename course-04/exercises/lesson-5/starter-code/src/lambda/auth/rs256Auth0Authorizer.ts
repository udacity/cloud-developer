
import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'
import { verify } from 'jsonwebtoken'
import { JwtToken } from '../../auth/JwtToken'

const cert = `-----BEGIN CERTIFICATE-----
MIIDBzCCAe+gAwIBAgIJAVOxZWPyrQAtMA0GCSqGSIb3DQEBCwUAMCExHzAdBgNV
BAMTFmRldi03dDVubnBvaS5hdXRoMC5jb20wHhcNMjAwNDExMTkzMDMzWhcNMzMx
MjE5MTkzMDMzWjAhMR8wHQYDVQQDExZkZXYtN3Q1bm5wb2kuYXV0aDAuY29tMIIB
IjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1YqIikyxTcrNvlzpkdXZYujt
DNkEU8JzG/2mmt6G3r+FCSP+WgUUboQatxZuE8KnGLerIETQfIFS0wcC5WZ7eeWf
bkOF1FSaBFsvXILAKeME7U46baTnUM/IAq4+xdx7IVX2C3VeMElsJWnP/BmqrKik
klr/9d9Yp2tJgjh4VsBB1aDa6D4SewQXpUkppiyBZG1+T8qpAGNFNdvR++P2h4R/
osifbmctqvqKpWDGz65Ent067Kssg1H9IEaVTdVv9FEbGuDeH3AoW30x3euXwLMJ
RdlH+xwEP5WD6KNB7hPYYwUCtbhTl5Z+UOn+f1noRxxnwXNyrcmBpns5wlhFpQID
AQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBRO/X2HVZruQ66aylMp
esdi1mw/ATAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBAJndj64U
HK1BJdsaFP+XvXVwRR5rFVcWLlwVwZnkukyzCW08dGkTz7p6KyrQsiSEOiwfb1Yy
2T2+QD9yqklSIgbhiaYgD3oFLDGlyhSwH9KppsVGIrGs/31eAh8ohPV+7HM8j62N
QbNo+291L7V1WEBrfIwXSTcZHY9C8qh+pzlvi1LSe5mfQtv5YMiyWgNrloWbMV4y
cud57UdBeWcIr+XmJ4s/E8+ss6Oe5JLICqSIQb2PAeDF+SrEy+nAjc+POVBJvB8Q
1xm6az8Z0vXtCSqhUKk5VLS06DAsQlI7rqyLBBug6obSzrsi7c1mimghHsopbggs
B9bFjPu8WWicmeU=
-----END CERTIFICATE-----`

export const handler = async (event: CustomAuthorizerEvent): Promise<CustomAuthorizerResult> => {

 
  try {
    const decodedToken = verifyToken(
      event.authorizationToken,
      cert )
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

  return verify(token, cert,{ algorithms: ['RS256'] }) as JwtToken
}