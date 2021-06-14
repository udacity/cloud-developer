// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'fo6qub5e53'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-2.amazonaws.com/dev`
// export const apiEndpoint = 'http://localhost:3003/dev'

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-9ts9zgd3.eu.auth0.com',            // Auth0 domain
  clientId: 'yBDauQdTNmsNrR1RwnH60jUof6CWeZUj',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
