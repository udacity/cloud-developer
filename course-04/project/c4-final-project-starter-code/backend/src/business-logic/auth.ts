import { verify } from 'jsonwebtoken'

import { JwtPayload } from '../auth/JwtPayload'
import { getToken } from '../auth/utils'

const certificate = `-----BEGIN CERTIFICATE-----
MIIDDTCCAfWgAwIBAgIJei/mi4qHYtZWMA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNV
BAMTGWRldi1wdGd3LW0teS51cy5hdXRoMC5jb20wHhcNMjEwNzA1MTM0NjA5WhcN
MzUwMzE0MTM0NjA5WjAkMSIwIAYDVQQDExlkZXYtcHRndy1tLXkudXMuYXV0aDAu
Y29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApgiBKszgd+hzEIWg
9nLRGZdJ77j4ojMfe6oTHvf7UWk6RYQLoQ+Zuo6TRA2eJ24Dlp8dnPgLyMHcBPb/
DJzfg5Yrzsq9w6JH6mXVPBZA9+PJCksSGFSVgj408hd1+l+8euB5/itlTxHg5Jzy
xOg9KDMBsbTetLq71BsnC04r6Wo6oaSw8tdpHhj4USelnR1gYpaavAUO7fz0jyQ/
7wQDV7KKIGUtUsGksYVpeOK2g1ZQUtA5ZuBGUa/ryqvZieLuvKyc9Zk/ky5Be4/q
+AVGUCh6LIHbdFBw2ckRoo6nFk0dl4jv3unFJ8K6kdcmN7ZVNZWcceB/Uc+GCWU5
ftYc4wIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBSrSqZtan5m
5l1ykcmjGYtvfOFwXDAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEB
AGrUnEfAZQAa11pSvgHNXaeToVi1kItzOB4Svx3DHs4Y4qq7HPbme9QVnExBiSB5
hmoLITMp+zrOmgkowkTcq00jSQe5FH9gI8cTQFiVzpHFQbbQdxEbSczagaYxP42N
3iOoT+qjKLrHBJsYhmvDgX8JOXCq05Q46HhiMg5dssFApdUT362Ats7/qX/d6sJO
uWhTb2HaxF/ZX4MB18hGpS1rDqtEfXPkKxBsXO+qRzwtJD0vAFG4L3toq9+WP0AB
ioFsym5ZHWfMO8G6b6xGv4NWuJwKjN2XLCgFB1zlpUY98Jxt0xyI6MPaYIvRbw4/
DRuHp9MYwX2XxsPFHTnEk/I=
-----END CERTIFICATE-----`

export function verifyToken(authHeader: string): JwtPayload {
  const token = getToken(authHeader)  
  return verify(token, certificate, { algorithms: ['RS256'] }) as JwtPayload
}
