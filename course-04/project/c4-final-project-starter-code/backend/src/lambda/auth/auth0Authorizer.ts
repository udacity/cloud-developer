import {CustomAuthorizerEvent, CustomAuthorizerResult} from 'aws-lambda'
import 'source-map-support/register'

import {verify, /*decode*/} from 'jsonwebtoken'
import {createLogger} from '../../utils/logger'
// import Axios from 'axios'
// import {Jwt} from '../../auth/Jwt'
import  {JwtPayload} from '../../auth/JwtPayload'
import {JwtToken} from "../../../../../../exercises/lesson-5/solution/src/auth/JwtToken";

// const jwksClient = require('jwks-rsa');

const logger = createLogger('auth');

const cert = `-----BEGIN CERTIFICATE-----
MIIDBzCCAe+gAwIBAgIJOkQiAjdFX2ndMA0GCSqGSIb3DQEBCwUAMCExHzAdBgNV
BAMTFmRldi10ejFzcG16Yy5hdXRoMC5jb20wHhcNMTkwODE0MDg1MjA3WhcNMzMw
NDIyMDg1MjA3WjAhMR8wHQYDVQQDExZkZXYtdHoxc3BtemMuYXV0aDAuY29tMIIB
IjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmzThfK/WpJgwQjeBuO38fSX4
pM7gpN5Zj6UGU2H03gW79UmcasoXxGmZ7I+sf4bPnyxILc/zbPw5TmVmEEkwiU3u
lxJN5N9UhQhy9V0Vv6vuDOkMfJqFJCWPvM8/vqhFuzIWEYIerJI/f5UQ2CvCKw/o
5C1vCneUR9oZzmPzGHSAitDBvvlt14wYKCXfZ7/LnAw9gYOnsHGOXd9zadWVEgrt
WjkVpaiROSlKy50KBc1Fm5aIrdjedHh1I1Aq3/kPWG/afl3v9ne3QLBlsftkbn4S
z4h5gZ7FLLM+7du4tsNYRxeust/bw/6KS4Tu+swNWPfZSYrAL6HsbGnl2EuWswID
AQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBRzYRBpyfSs2aQOCCOd
ITVSEHQMcjAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBAFDoLXTG
D+uLdKL2jZ0P4ZNQH7r26q+YDOxi2cuvUtMYTA0SMVOom17Rf0qF4uOzK5j+yXen
H1z8RPtw8D42If8fM2WGuo54/9RMPs2MKPj9bh8pW0VHz70gTobbatN7mG9G220B
Z134Ya3faCEffIswLzA+KPJ1ShWFd+0VFHT8G6unUmGkbuz76zpOPn6hgUPKI/nH
DKLj4BMrfsZhQoIEsiSRBxWCQvtzfDMErrrdqxmiUYPfqL5/yvWvtQsnAsMkLNSh
O0sGEI/i1ZQKoac8HE9L3SzIyMIk1ioG9meTaVQGgi7bYyiomxog1lpFeT/MtF++
TEBYFdMi6Edu3f4=
-----END CERTIFICATE-----
`;

export const handler = async (
    event: CustomAuthorizerEvent
): Promise<CustomAuthorizerResult> => {
    logger.info('Authorizing a user')
    try {
        const jwtToken = await verifyToken(event.authorizationToken)

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
        logger.error('User not authorized', {error: e.message})

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

    // TODO: Implement token verification
    return verify(token, cert, { algorithms: ['RS256'] }) as JwtToken
}

function getToken(authHeader: string): string {
    if (!authHeader) throw new Error('No authentication header');

    if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header');

    const split = authHeader.split(' ');
    const token = split[1];

    return token
}
