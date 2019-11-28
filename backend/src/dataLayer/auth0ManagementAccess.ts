import { ManagementClient } from 'auth0'

export default class Auth0ManagementAccess {
  auth0: ManagementClient;

  constructor(
    private readonly domain = process.env.AUTH0_DOMAIN,
    private readonly clientId = process.env.AUTH0_CLIENT_ID,
    private readonly clientSecret = process.env.AUTH0_CLIENT_SECRET
  ) {
    this.auth0 = new ManagementClient({
      domain: this.domain,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
    })
  }

  async getUsers() {
    return this.auth0.getUsers();
  }
}