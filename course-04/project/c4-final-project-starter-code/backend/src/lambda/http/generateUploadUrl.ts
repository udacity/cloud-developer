import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { userExists } from '../../business-logic/users'
import { queryByTodoId, updateTodoUrl } from '../../business-logic/todos'
import { getUploadUrl } from '../../business-logic/attachments'
import { User } from '../../models/UserItem'
import { createLogger } from '../../utils/logger'

const logger = createLogger('generate-upload-url')

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

  logger.info('Todo was fetched; updating values...', {fetchedTodo: todoAttrMap})
  await updateTodoUrl(user.id, todoAttrMap.createdAt, todoId)
  logger.info('Update operation complete.')

  logger.info('Generating upload URL...')
  const uploadUrl = getUploadUrl(todoId)
  const responseBody = {uploadUrl}
  logger.info('Upload URL generated; returning response.', responseBody)

  return {
    statusCode: 200,
    body: JSON.stringify(responseBody)
  }
})

handler.use(
  cors({
    credentials: true
  })
)
