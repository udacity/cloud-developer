import { ManagementClient, ObjectWithId, User } from 'auth0';

import { createLogger } from '../utils/logger';

const GOOGLE_PROVIDER = 'google-oauth2';
const logger = createLogger('auth0ManagementAccess');

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

  async getUser(withId: ObjectWithId) {
    const user = await this.auth0.getUser(withId);
    logger.info('auth0 getUser', { user });
    return user;
  }

  async getUsers() {
    return this.auth0.getUsers();
  }

  getGoogleIdentity(user: User) {
    return user.identities.find(id => id.provider === GOOGLE_PROVIDER);
  }
}
