import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

import TodosAccess from '../../dataLayer/todosAccess'
import { createLogger } from '../../utils/logger'

const todosClient = new TodosAccess()
const logger = createLogger('deleteTodo')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId

  if (!todoId) {
    logger.error("Delete missing todoId")
    return {
      statusCode: 200,
      body: ""
    }
  }

  // TODO: Remove a TODO item by todoId
  try {
    await todosClient.deleteTodo(todoId)
    return {
      statusCode: 204,
      body: "",
    }
  } catch(error) {
    logger.error("Delete attempt failed", {
      todoId,
      error,
    })
    return {
      statusCode: 500,
      body: "Server error"
    }
  }
}
