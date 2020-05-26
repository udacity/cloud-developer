// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = '...'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-n1ovzx7w.auth0.com',            // Auth0 domain
  clientId: 'BsWKDlQWLss73MecJQI3qtswrA4oul9k',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
