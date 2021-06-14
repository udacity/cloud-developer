import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { deleteTodo } from '../businessLogic/Todo'
import { getUserId} from '../utils'
import { createLogger } from '../../utils/logger'
const logger = createLogger('DeleteTodo')


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  logger.info('Event delete', {todoId})
  // TODO: Remove a TODO item by id
  const userId = getUserId(event)
  await deleteTodo(userId, todoId)
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: ''
  }
}
