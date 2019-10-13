// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = '4ddxcjuiaa'
export const apiEndpoint = `https://${apiId}.execute-api.ap-northeast-2.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'jhpark8904-udacity.auth0.com',            // Auth0 domain
  clientId: '3Brb0M8yleQP7Ur40GpPYNgWa0wyh9Lj',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
