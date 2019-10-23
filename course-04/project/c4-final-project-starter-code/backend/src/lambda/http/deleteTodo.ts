import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { getTodoItem, deleteTodoItem } from '../../businessLogic/todosService'
import { getUserId } from '../utils'

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Processing event: ', event)
  const todoId = event.pathParameters.todoId

  // TODO: Remove a TODO item by id
  const userId = getUserId(event)

  const existingItem = await getTodoItem(userId, todoId)
  if (!existingItem) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: 'todo item does not exist'
      })
    }
  }

  await deleteTodoItem(userId, todoId)

  return {
    statusCode: 200,
    body: JSON.stringify({})
  }
})

handler.use(
  cors({
    credentials: true
  })
)
