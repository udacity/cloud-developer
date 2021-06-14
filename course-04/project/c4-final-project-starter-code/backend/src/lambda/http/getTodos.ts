import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from 'aws-lambda'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'
import { getTodos } from '../businessLogic/Todo'
const logger = createLogger('getTodos')

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // TODO: Get all TODO items for a current user
  logger.info('Event getTodos ', event)
  const userId = getUserId(event)
  const todoList = await getTodos(userId)
  logger.info('TodoList', { userId, todoList })

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      items: todoList
    })
  }
}
