// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'h8esnx6h1j'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`
//export const apiEndpoint = 'http://localhost:3003'

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'jamesconsulting.auth0.com',            // Auth0 domain
  clientId: 'ooFPC8MEziSbOcL42D4tmR3iaasNsSqQ',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
