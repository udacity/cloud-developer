import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { userExists } from '../../business-logic/users'
import { queryByTodoId, deleteTodo } from '../../business-logic/todos'
import { User } from '../../models/UserItem'
import { createLogger } from '../../utils/logger'

const logger = createLogger('delete-todo')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  logger.info('Caller event', event)

  const todoId = event.pathParameters.todoId
  
  logger.info('Checking for user ...')
  let user: User

  try {
    user = await userExists(event.headers.Authorization)
  } catch(e) {
    logger.error('Error when checking token for user ID', { error: e.message })
    return {
      statusCode: 403,
      body: JSON.stringify({
        error: 'Malformed token received'
      })
    }
  }

  if (!user) {
    logger.info('User does not exist')
    return {
      statusCode: 403,
      body: JSON.stringify({
        error: 'User does not exist'
      })
    }
  }

  logger.info(`Fetching todo by todo id of ${todoId}`)
  const todoAttrMap: any = await queryByTodoId(todoId)

  if (!todoAttrMap) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "No todos found for the provided id" })
    }
  }

  logger.info('Todo was fetched; deleting...', {fetchedTodo: todoAttrMap})
  await deleteTodo(user.id, todoAttrMap.createdAt)
  logger.info('Delete operation complete; returning response.')

  return {
    statusCode: 200,
    body: ``
  }
})

handler.use(
  cors({
    credentials: true
  })
)

