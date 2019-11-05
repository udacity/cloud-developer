import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from 'aws-lambda'
import { v4 } from 'uuid'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import TodosAccess from '../../dataLayer/todosAccess'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'

const todosClient = new TodosAccess()
const logger = createLogger('createTodo')

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const newTodo: CreateTodoRequest = JSON.parse(event.body)
  console.log('newTodo :', newTodo)
  const userId = getUserId(event)
  console.log('userId :', userId)

  if (!userId) {
    logger.error('Unauthorized createTodo')
    return {
      statusCode: 401,
      body: 'unauthorized request'
    }
  }

  // TODO: Implement creating a new TODO item
  try {
    const res = await todosClient.createTodo({
      userId,
      todoId: v4(),
      createdAt: new Date().toString(),
      name: newTodo.name,
      dueDate: newTodo.dueDate,
      done: false
    })
    return {
      statusCode: 201,
      body: JSON.stringify(res)
    }
  } catch (e) {
    logger.error('Todo could not be created', { error: e.message })
    return {
      statusCode: 422,
      body: 'Could not create todo'
    }
  }
}
