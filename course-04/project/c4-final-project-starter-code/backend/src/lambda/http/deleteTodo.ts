import 'source-map-support/register'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { APIGatewayProxyEvent, APIGatewayProxyResult, } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { deleteTodo, getTodoById } from '../../businessLogic/todos'
import { getUserId } from '../utils'

const logger = createLogger('deleteTodo')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const userId = getUserId(event)

  const result = await getTodoById(userId, todoId)

  if (result.Count === 0) {
    logger.warn(`user ${userId} requesting DELETE for non exists todo: ${todoId}`)
    return {
      statusCode: 400,
      body: JSON.stringify(`Todo not exists.`)
    }
  }

  logger.info(`user ${userId} is DELETING ${todoId}`)
  await deleteTodo(userId, todoId)

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

