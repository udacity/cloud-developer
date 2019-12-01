import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from 'aws-lambda'
import { v4 } from 'uuid'

import { CreateTodoRequest } from '../../../requests/CreateTodoRequest'
import TodosAccess from '../../../dataLayer/todosAccess'
import { getUserId } from '../../utils'
import { createLogger } from '../../../utils/logger'

const todosClient = new TodosAccess()
const logger = createLogger('createTodo')

const bucketName = process.env.IMAGES_S3_BUCKET

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // TODO: add API gateway request validation to handle 422s
  const newTodo: CreateTodoRequest = JSON.parse(event.body)
  const userId = getUserId(event)

  if (!userId) {
    logger.error('Unauthorized createTodo')
    return {
      statusCode: 401,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: 'unauthorized request'
    }
  }

  try {
    const todoId = v4();
    const item = await todosClient.createTodo({
      userId,
      todoId,
      createdAt: new Date().toISOString(),
      done: false,
      attachmentUrl: `https://${bucketName}.s3.amazonaws.com/${todoId}`,
      ...newTodo
    })
    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ item })
    }
  } catch (e) {
    logger.error('Todo could not be created', { error: e.message })
    return {
      statusCode: 422,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: 'Could not create todo'
    }
  }
}
