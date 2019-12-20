import { ManagementClient, User } from 'auth0';

const GOOGLE_PROVIDER = 'google-oauth2';

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
      clientSecret: this.clientSecret
    });
  }

  async getGoogleUsers() {
    const users = await this.auth0.getUsers();
    return users.filter(user =>
      user.identities.some(id => id.provider === GOOGLE_PROVIDER)
    );
  }

  getGoogleIdentity(user: User) {
    return user.identities.find(id => id.provider === GOOGLE_PROVIDER);
  }
}
