// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'y72ci58dw2'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-7t5nnpoi.auth0.com',            // Auth0 domain
  clientId: 'UX2jz8IzmbS2f9RNW7pQe9ocvyjp5Hup',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
