import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { userExists } from '../../business-logic/users'
import { queryByUserId } from '../../business-logic/todos'
import { User } from '../../models/UserItem'
import { createLogger } from '../../utils/logger'

const logger = createLogger('get-todos')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  logger.info('Caller event', event)

  logger.info('Checking for user...')
  let user: User

  try {
    user = await userExists(event.headers.Authorization)
  } catch(e) {
    logger.error('Error when checking token for user ID.', { error: e.message })
    return {
      statusCode: 403,
      body: JSON.stringify({
        error: 'Malformed token received'
      })
    }
  }

  if (!user) {
    logger.info('User does not exist.')
    return {
      statusCode: 403,
      body: JSON.stringify({
        error: 'User does not exist'
      })
    }
  }

  logger.info(`Fetching todos by user id of ${user.id}...`)
  const items = await queryByUserId(user.id)
  logger.info('Fetch operation complete; returning response.')

  return {
    statusCode: 201,
    body: JSON.stringify({
      items
    })
  }
})

handler.use(
  cors({
    credentials: true
  })
)
