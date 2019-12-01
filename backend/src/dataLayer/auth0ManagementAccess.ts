import { ManagementClient } from 'auth0'

const GOOGLE_PROVIDER = 'google-oauth2'

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

  async getGoogleIdentities() {
    const users = await this.auth0.getUsers();
    return (users || [])
      .map(user => user.identities)
      .reduce((ids, val) => ids.concat(val), [])
      .filter(id => id.provider === GOOGLE_PROVIDER);
  }
}