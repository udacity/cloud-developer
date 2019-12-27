import 'source-map-support/register'
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from 'aws-lambda'

import RewardsAccess from '../../../dataLayer/rewardsAccess'
import { getUserId } from '../../utils'
import { createLogger } from '../../../utils/logger'

const rewardsClient = new RewardsAccess()
const logger = createLogger('getRewards')

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const userId = getUserId(event)

  if (!userId) {
    logger.error('Unauthorized createReward')
    return {
      statusCode: 401,
      body: 'unauthorized request'
    }
  }

  const items = await rewardsClient.getRewards(userId)
  logger.info('retrieved rewards for user', {
    userId,
    items
  })

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ items })
  }
}
