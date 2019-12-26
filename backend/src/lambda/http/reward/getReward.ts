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
const logger = createLogger('getReward')

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { rewardId } = event.pathParameters
  const userId = getUserId(event)

  if (!userId) {
    logger.error('Unauthorized createReward')
    return {
      statusCode: 401,
      body: 'unauthorized request'
    }
  }

  const reward = await rewardsClient.getReward(userId, rewardId)
  logger.info(`retrieved reward ${rewardId} for user`, {
    userId,
    reward
  })

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ reward })
  }
}
