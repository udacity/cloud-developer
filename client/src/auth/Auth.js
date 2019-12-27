import auth0 from 'auth0-js'
import { authConfig } from '../config'

export default class Auth {
  accessToken
  idToken
  expiresAt

  auth0 = new auth0.WebAuth({
    domain: authConfig.domain,
    clientID: authConfig.clientId,
    redirectUri: authConfig.callbackUrl,
    responseType: 'token id_token',
    scope: 'openid'
  })

  constructor(history) {
    this.history = history
  }

  login = () => {
    this.auth0.authorize({
      accessType: 'offline' // Auth0 will store the refresh token in Management API
      // prompt: 'consent'
    })
  }

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log('authResult :', authResult)
        console.log('Access token: ', authResult.accessToken)
        console.log('id token: ', authResult.idToken)
        this.setSession(authResult)
      } else if (err) {
        this.history.replace('/')
        alert(`Error: ${err.error}. Check the console for further details.`)
      }
    })
  }

  getAccessToken = () => {
    return this.accessToken
  }

  getIdToken = () => {
    return this.idToken
  }

  setSession = authResult => {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true')

    // Set the time that the access token will expire at
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
    this.accessToken = authResult.accessToken
    this.idToken = authResult.idToken
    this.expiresAt = expiresAt

    // navigate to the home route
    this.history.replace('/')
  }

  renewSession = () => {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
      } else if (err) {
        this.logout()
        console.log(err)
        alert(
          `Could not get a new token (${err.error}: ${err.error_description}).`
        )
      }
    })
  }

  logout = () => {
    // Remove tokens and expiry time
    this.accessToken = null
    this.idToken = null
    this.expiresAt = 0

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn')

    this.auth0.logout({
      return_to: window.location.origin
    })

    // navigate to the home route
    this.history.replace('/')
  }

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt
    return new Date().getTime() < expiresAt
  }
}
