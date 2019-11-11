import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import TodosAccess from '../../dataLayer/todosAccess'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'

const todosClient = new TodosAccess()
const logger = createLogger('updateTodo')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
  const userId = getUserId(event)

  if (!userId || !todoId || !updatedTodo) {
    logger.error("Update missing info", {
      todoId,
      updatedTodo,
    })
    return {
      statusCode: 422,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: "Missing todoId or updatedTodo"
    }
  }

  try {
    await todosClient.updateTodo(userId, todoId, updatedTodo)
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: "",
    }
  } catch(error) {
    logger.error("Update attempt failed", {
      todoId,
      updatedTodo,
      error,
    })
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: "Server error"
    }
  }
}
