import 'source-map-support/register';

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from 'aws-lambda';

import Auth0Accessor from '../../../dataLayer/auth0ManagementAccess';
// import TaskSynchronizerWithRefresh from '../../../services/TaskSynchronizerWithRefresh';
import { getUserId } from '../../utils';
import { createLogger } from '../../../utils/logger';

const auth0Accessor = new Auth0Accessor();
const logger = createLogger('syncTasks');

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const userId = getUserId(event);

  if (!userId) {
    logger.error('Unauthorized syncTasks');
    return {
      statusCode: 401,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: 'unauthorized request'
    };
  }

  logger.info(`Syncing tasks for ${userId}`);
  const user = await auth0Accessor.getUser({ id: userId });
  // const service = new TaskSynchronizerWithRefresh(user);
  // const res = await service.perform();
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    // body: JSON.stringify(res)
    body: JSON.stringify(user)
  };
};
