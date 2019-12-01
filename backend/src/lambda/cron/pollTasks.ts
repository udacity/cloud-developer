import { ScheduledHandler } from 'aws-lambda';

import Auth0Accessor from '../../dataLayer/auth0ManagementAccess'
import TaskSynchronizer from '../../services/TaskSynchronizer'
import { createLogger } from '../../utils/logger'

const auth0Accessor = new Auth0Accessor()
const logger = createLogger('pollTasks')

export const handler: ScheduledHandler = async () => {
  console.log('\n\nPoll tasks running\n\n');

  try {
    const googleIdentities = await auth0Accessor.getGoogleIdentities();

    if (!googleIdentities.length) {
      logger.warn('No Google identities found for users, skipping tasks sync')
      return
    }

    const taskSynchronizers = googleIdentities.map(id => new TaskSynchronizer(id.user_id, id.access_token));
    await Promise.all(taskSynchronizers.map(taskSynchronizer => taskSynchronizer.perform()))
  } catch (e) {
    logger.error('Failed to sync users\n', e)
  }
}
