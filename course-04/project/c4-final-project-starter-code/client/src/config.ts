// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = '3uere66bf6'
export const apiEndpoint = `https://${apiId}.execute-api.eu-central-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'reitmayer.eu.auth0.com',            // Auth0 domain
  clientId: 'rHHfmX1wTXWjTFYTmRBqAWC1w7LAIFl4',          // Auth0 client id
  callbackUrl: 'http://localhost:8080/callback'
}
