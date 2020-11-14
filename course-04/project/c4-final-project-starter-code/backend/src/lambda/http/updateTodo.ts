import 'source-map-support/register'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { updateTodo, getTodoById } from '../../businessLogic/todos'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'

const logger = createLogger('updateTodo')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
  const userId = getUserId(event)

  const result = await getTodoById(userId, todoId)

  if (result.Count === 0) {
    logger.warn(`user ${userId} updating non existing records: ${todoId}`)
    return {
      statusCode: 400,
      body: JSON.stringify(`Todo not exists.`)
    }
  }

  logger.info(`User ${userId} updating todo: ${todoId} with data ${updatedTodo}`)
  await updateTodo(userId, todoId, updatedTodo)

  return {
    statusCode: 200,
    body: null
  }
})


handler.use(
  cors({
    credentials: true
  })
)
