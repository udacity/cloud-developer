import { User } from 'auth0';

import Auth0Accessor from '../dataLayer/auth0ManagementAccess';
import GoogleAccessor from '../dataLayer/googleAccess';
import TaskSynchronizer from './TaskSynchronizer';
import { createLogger } from '../utils/logger';

const auth0Accessor = new Auth0Accessor();
const logger = createLogger('GetGoogleUser');

export default class TaskSynchronizerWithRefresh {
  auth0User: User;
  userId: User['user_id'];

  constructor(user: User) {
    this.auth0User = user;
    this.userId = user.user_id;
  }

  async perform() {
    const identity = auth0Accessor.getGoogleIdentity(this.auth0User);
    if (!identity) {
      const errMsg = `Google identity not found for user ${this.userId}`;
      logger.error(errMsg, { user: this.auth0User });
      throw new Error(errMsg);
    }

    // Identity type missing the refresh_token
    const { access_token, refresh_token } = identity as any;

    let taskSynchronizer = new TaskSynchronizer(this.userId, access_token);
    try {
      await taskSynchronizer.perform();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        logger.info(`Refreshing access token for user ${this.userId}`);
        const googleAccessor = new GoogleAccessor(refresh_token);
        const accessToken = await googleAccessor.refreshAccessToken();
        taskSynchronizer = new TaskSynchronizer(this.userId, accessToken);
        return await taskSynchronizer.perform();
      }
      throw err;
    }
  }
}
