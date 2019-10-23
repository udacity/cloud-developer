import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { getTodoItem, updateTodoItem } from '../../businessLogic/todosService'
import { getUserId } from '../utils'

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Processing event: ', event)
  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
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

  await updateTodoItem(userId, todoId, updatedTodo)

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
