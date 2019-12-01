import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateRewardRequest } from '../../../requests/UpdateRewardRequest'
import RewardsAccess from '../../../dataLayer/rewardsAccess'
import { createLogger } from '../../../utils/logger'
import { getUserId } from '../../utils'

const rewardsClient = new RewardsAccess()
const logger = createLogger('updateReward')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const rewardId = event.pathParameters.rewardId
  const updatedReward: UpdateRewardRequest = JSON.parse(event.body)
  const userId = getUserId(event)

  if (!userId || !rewardId || !updatedReward) {
    logger.error("Update missing info", {
      rewardId,
      updatedReward,
    })
    return {
      statusCode: 422,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: "Missing rewardId or updatedReward"
    }
  }

  try {
    await rewardsClient.updateReward(userId, rewardId, updatedReward)
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: "",
    }
  } catch (error) {
    logger.error("Update attempt failed", {
      rewardId,
      updatedReward,
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
