// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = '0iflpzysob'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-7t5nnpoi.auth0.com',            // Auth0 domain
  clientId: '69hJLTxAOaBz86setb7VnUrGdoH96Y2z',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
