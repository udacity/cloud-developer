import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'
import { getTodoById } from '../../businessLogic/todos'
import { getPresignedUrl } from '../../businessLogic/attachmentUrl'


const logger = createLogger('generateUploadUrl')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const userId = getUserId(event)

  const result = await getTodoById(userId, todoId)

  if (result.Count === 0) {
    logger.warn(`user ${userId} requesting Presigned URL for non exists record: ${todoId}`)

    return {
      statusCode: 400,
      body: JSON.stringify(`Todo does not exist.`)
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      uploadUrl: getPresignedUrl(todoId)
    })
  }
})


handler.use(
  cors({
    credentials: true
  })
)
