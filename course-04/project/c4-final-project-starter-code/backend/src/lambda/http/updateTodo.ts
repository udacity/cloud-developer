import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { createLogger } from '../../utils/logger'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import {updateTodo, checkTodoExists} from '../../businessLogic/todos';

const logger = createLogger('updateTodoHandler');
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId;
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body);

  const doesTodoExists = await checkTodoExists(todoId);
  if (!doesTodoExists) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: `Cannot find todo with todoId: ${todoId}`
    }
  }

  try {
    await updateTodo(todoId, updatedTodo);
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: 'Todo Item is succesfully updated'
    }
  } catch (err) {
    logger.error('Failed to update Todo Item', err);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: `Failed to update Todo Item`, 
    }
  }

}
