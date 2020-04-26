// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = '7zae7p3twi'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-emaek-x8.auth0.com',            // Auth0 domain
  clientId: 'zNP6wflMYxevKZ69T7C0lzPjKECpCBVU',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
