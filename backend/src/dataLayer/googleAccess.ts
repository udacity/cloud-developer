import axios from 'axios'

const BASE_URL = 'https://oauth2.googleapis.com/token'

export default class GoogleAccess {
  refreshToken: string
  clientId: string
  clientSecret: string

  constructor(refreshToken: string) {
    this.refreshToken = refreshToken
    this.clientId = process.env.GOOGLE_CLIENT_ID
    this.clientSecret = process.env.GOOGLE_CLIENT_SECRET
  }

  /**
   * Returns the new access token
   * @param refreshToken 
   */
  async refreshAccessToken(): Promise<string> {
    const params = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      refresh_token: this.refreshToken,
      grant_type: 'refresh_token'
    }
    const response = await axios.post(`${BASE_URL}`, params);
    return response.data.access_token
  }
}