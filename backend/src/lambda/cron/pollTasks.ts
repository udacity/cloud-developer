import { ScheduledHandler } from 'aws-lambda';
import { User } from 'auth0';

import Auth0Accessor from '../../dataLayer/auth0ManagementAccess';
import GoogleAccessor from '../../dataLayer/googleAccess';
import TaskSynchronizer from '../../services/TaskSynchronizer';
import { createLogger } from '../../utils/logger';

const auth0Accessor = new Auth0Accessor();
const logger = createLogger('pollTasks');

export const handler: ScheduledHandler = async () => {
  logger.info(`Running pollTasks at ${new Date()}`);

  const googleUsers = await auth0Accessor.getGoogleUsers();
  if (!googleUsers.length) {
    logger.warn('No users with Google identities found');
    return;
  }

  await Promise.all(googleUsers.map(syncForGoogleUser));
};

async function syncForGoogleUser(googleUser: User) {
  const id = auth0Accessor.getGoogleIdentity(googleUser);
  if (!id) {
    logger.warn(
      `Google identity not found for googleUser ${googleUser.user_id}`
    );
    return;
  }

  console.log('id :', id);

  const { access_token, user_id, refresh_token } = id as any; // types missing the refresh_token
  let taskSynchronizer = new TaskSynchronizer(user_id, access_token);
  try {
    await taskSynchronizer.perform();
  } catch (err) {
    if (err.response && err.response.status === 401) {
      logger.info(`Refreshing access token for user ${user_id}`);
      const googleAccessor = new GoogleAccessor(refresh_token);
      const accessToken = await googleAccessor.refreshAccessToken();
      taskSynchronizer = new TaskSynchronizer(user_id, accessToken);
      return await taskSynchronizer.perform();
    }
    throw err;
  }
}
