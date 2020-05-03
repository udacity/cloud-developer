import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { getAllTodos } from '../../services/todoService'
import { getUserId } from '../utils'
const logger = createLogger('getTodo controller')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('get todo request received')


  const userId = getUserId(event);

  const items = await getAllTodos(userId)
  console.log('get todo request successful', userId)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      items
    })
  }
}
