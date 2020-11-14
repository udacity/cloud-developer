import 'source-map-support/register'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getUserId } from '../utils'
import { getTodos } from '../../businessLogic/todos'
import { createLogger } from '../../utils/logger'

const logger = createLogger('getTodos')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const user_id = getUserId(event)
  logger.info(`Retrieving items for user ${user_id}`)
  const todoItems = await getTodos(user_id)
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      items: todoItems
    })
  }

})


handler.use(
  cors({
    credentials: true
  })
)


