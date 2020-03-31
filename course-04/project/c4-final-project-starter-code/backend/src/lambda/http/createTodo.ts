import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { createLogger } from '../../utils/logger'
import {getUserId} from '../utils';
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import {createTodo} from '../../businessLogic/todos';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const logger = createLogger('createTodoHandler');
  const newTodo: CreateTodoRequest = JSON.parse(event.body)

  const currentUserId = getUserId(event);

  try {
    const item = await createTodo(newTodo, currentUserId);
    logger.info('Item Created', item);

    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        item
      })
    }
  } catch (err) {
    logger.info('Failed to create Todo Item', err);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: 'Failed to create Todo Item',
    }
  }
}
