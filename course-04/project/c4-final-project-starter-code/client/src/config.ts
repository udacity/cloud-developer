// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'uixqy1k28c'
export const apiEndpoint = `https://${apiId}.execute-api.us-west-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map. For example:
  // domain: 'dev-nd9990-p4.us.auth0.com',
  domain: 'dev-dvo5mcfr.us.auth0.com',            // Auth0 domain
  clientId: 'leHu4sEEnOIcTvzNb9r1qxu9K7FZjZl3',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
