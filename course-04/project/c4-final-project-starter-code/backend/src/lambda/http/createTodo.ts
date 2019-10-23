import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createTodoItem } from '../../businessLogic/todosService'
import { getUserId } from '../utils'

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Processing event: ', event)

  // TODO: Implement creating a new TODO item
  const userId = getUserId(event)

  const newTodo: CreateTodoRequest = JSON.parse(event.body)

  const item = await createTodoItem(userId, newTodo) 

  return {
    statusCode: 201,
    body: JSON.stringify({
      item
    })
  }
})

handler.use(
  cors({
    credentials: true
  })
)

