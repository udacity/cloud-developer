import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'
import { deleteTodo } from '../../services/todoService'
const logger = createLogger('deleteTodo controller')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  logger.info('delete todo request received', {"todoId" : todoId})

  const userId = getUserId(event);

  await deleteTodo(todoId, userId)
  logger.info('delete todo request successful', {"todoId" : todoId})

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      todoId
    })
  }
}
