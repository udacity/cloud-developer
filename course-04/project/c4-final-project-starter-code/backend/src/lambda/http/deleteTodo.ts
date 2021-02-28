import 'source-map-support/register'
import { deleteTodoItem } from '../../businessLogic/todoItems'
import { getUserId } from '../utils'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from 'aws-lambda'

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  console.log(todoId)
  const currentUserId = getUserId(event)
  await deleteTodoItem(todoId, currentUserId)
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: 'Todo Item deleted'
  }
}
