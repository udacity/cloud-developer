import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import TodosAccess from '../../dataLayer/todosAccess'
import { createLogger } from '../../utils/logger'

const todosClient = new TodosAccess()
const logger = createLogger('updateTodo')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

  if (!todoId || !updatedTodo) {
    logger.error("Update missing info", {
      todoId,
      updatedTodo,
    })
    return {
      statusCode: 422,
      body: "Missing todoId or updatedTodo"
    }
  }

  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
  try {
    await todosClient.updateTodo(todoId, updatedTodo)
    return {
      statusCode: 204,
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
      body: "Server error"
    }
  }
}
