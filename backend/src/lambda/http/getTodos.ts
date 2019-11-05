import 'source-map-support/register'
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from 'aws-lambda'

import TodosAccess from '../../dataLayer/todosAccess'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'

const todosClient = new TodosAccess()
const logger = createLogger('getTodos')

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log('Processing event: ', event)
  const userId = getUserId(event)
  console.log('userId :', userId)

  if (!userId) {
    logger.error('Unauthorized createTodo')
    return {
      statusCode: 401,
      body: 'unauthorized request'
    }
  }

  // TODO: Get all TODO items for a current user
  const items = await todosClient.getTodos(userId)
  logger.info('retrieved todos for user', {
    userId,
    items
  })

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ items })
  }
}
