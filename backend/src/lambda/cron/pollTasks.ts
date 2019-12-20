import { ScheduledHandler } from 'aws-lambda';

import Auth0Accessor from '../../dataLayer/auth0ManagementAccess';
import TaskSynchronizerWithRefresh from '../../services/TaskSynchronizerWithRefresh';
import { createLogger } from '../../utils/logger';

const auth0Accessor = new Auth0Accessor();
const logger = createLogger('pollTasks');

export const handler: ScheduledHandler = async () => {
  logger.info(`Running pollTasks at ${new Date()}`);
  const users = await auth0Accessor.getUsers();
  console.log('users :', users);
  await Promise.all(
    users.map(user => {
      const service = new TaskSynchronizerWithRefresh(user);
      return service.perform();
    })
  );
};
