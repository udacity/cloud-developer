import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { createUser } from '../../business-logic/users'
import { createTodo } from '../../business-logic/todos'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { Todo } from '../../models/TodoItem'
import { User } from '../../models/UserItem'
import { createLogger } from '../../utils/logger'

const logger = createLogger('create-todo')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  logger.info('Caller event', event)

  logger.info('Creating user if necessary...')
  let user: User

  try {
    user = await createUser(event.headers.Authorization)
  } catch(e) {
    logger.error('Error when checking token for user ID', { error: e.message })
    return {
      statusCode: 403,
      body: JSON.stringify({
        error: 'Malformed token received'
      })
    }
  }

  logger.info('Create user result', user)

  const todoRequest: CreateTodoRequest = JSON.parse(event.body)
  const createdTodo: Todo = await createTodo(user.id, todoRequest)
  const responseBody = {item: createdTodo}

  logger.info('Returning response with new todo item', responseBody)

  return {
    statusCode: 201,
    body: JSON.stringify(responseBody)
  }
})

handler.use(
  cors({
    credentials: true
  })
)
