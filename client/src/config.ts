const apiId = 'yq6nbb4r5k'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`
// export const apiEndpoint = `http://localhost:4000`
export const callbackEndpoint = 'https://fervent-mirzakhani-5d72eb.netlify.com'
// export const callbackEndpoint =  http://localhost:3000

export const authConfig = {
  domain: 'dev-x1n-gpar.auth0.com', // Auth0 domain
  clientId: 'LRq020yVnlZdqBwSppm3X7VXgLFd8Ar1', // Auth0 client id
  callbackUrl: `${callbackEndpoint}/callback`
}
