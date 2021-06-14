import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { updateTodo } from '../businessLogic/Todo'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'
const logger = createLogger('auth')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Update event', {event})
  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
  const userId = getUserId(event)
  const res = await updateTodo(updatedTodo, userId, todoId)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      items: res
    })
  }
}
