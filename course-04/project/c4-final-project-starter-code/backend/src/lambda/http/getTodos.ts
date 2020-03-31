import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

import { createLogger } from '../../utils/logger'
import {getUserId} from '../utils';
import {getAllTodosByUserId} from '../../businessLogic/todos';

const logger = createLogger('getTodosHandler');
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('event: ', event);
  const currentUserId = getUserId(event);
  const items = await getAllTodosByUserId(currentUserId);
  logger.info('user: ', currentUserId, 'todos: ', items);

  if (Array.isArray(items) && items.length > 0) {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        items
      })
    }
  }

  return {
    statusCode: 400,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: 'There is no todos found for this user'
  }
}
