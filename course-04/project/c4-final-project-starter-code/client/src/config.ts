// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'ggqq6sb79j'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-yqmiykkf.auth0.com',            // Auth0 domain
  clientId: 'XOnLfoZ54qcb2PwTKt4mDEl2Rs30KQg4',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
