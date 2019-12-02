import { ScheduledHandler } from 'aws-lambda';

import Auth0Accessor from '../../dataLayer/auth0ManagementAccess'
import GoogleAccessor from '../../dataLayer/googleAccess'
import TaskSynchronizer from '../../services/TaskSynchronizer'
import { createLogger } from '../../utils/logger'

const auth0Accessor = new Auth0Accessor()
const logger = createLogger('pollTasks')

export const handler: ScheduledHandler = async () => {
  console.log('\n\nPoll tasks running\n\n');

  try {
    const googleIdentities = await auth0Accessor.getGoogleIdentities();
    console.log('googleIdentities :', googleIdentities);
    if (!googleIdentities.length) {
      logger.warn('No Google identities found for users, skipping tasks sync')
      return
    }

    await Promise.all(googleIdentities.map(async id => {
      let taskSynchronizer = new TaskSynchronizer(id.user_id, id.access_token)
      try {
        await taskSynchronizer.perform()
      } catch (err) {
        if (err.response.status === 401) {
          const googleAccessor = new GoogleAccessor((id as any).refresh_token)
          const accessToken = await googleAccessor.refreshAccessToken()
          taskSynchronizer = new TaskSynchronizer(id.user_id, accessToken)
          await taskSynchronizer.perform()
        } else {
          logger.error(`Failed to sync completed tasks for user ${id.user_id}`, err)
        }
      }
    }));
  } catch (e) {
    logger.error('Failed to sync users\n', e)
  }
}
