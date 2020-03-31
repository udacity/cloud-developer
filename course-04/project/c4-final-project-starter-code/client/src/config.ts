// Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'amy83b74af'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  domain: 'dev-aoae44ef.auth0.com', // Auth0 domain
  clientId: 'GTBLUE0wkWYu6wYbNnx0IzHKDyopp0j7', // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
