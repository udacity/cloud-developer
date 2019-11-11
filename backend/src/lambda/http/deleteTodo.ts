import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

import TodosAccess from '../../dataLayer/todosAccess'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'

const todosClient = new TodosAccess()
const logger = createLogger('deleteTodo')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const userId = getUserId(event)

  if (!todoId) {
    logger.error("Delete missing todoId")
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: ""
    }
  }

  try {
    await todosClient.deleteTodo(userId, todoId)
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: "",
    }
  } catch(error) {
    logger.error("Delete attempt failed", {
      todoId,
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
