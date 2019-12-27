import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

import RewardsAccess from '../../../dataLayer/rewardsAccess'
import { createLogger } from '../../../utils/logger'
import { getUserId } from '../../utils'

const rewardsClient = new RewardsAccess()
const logger = createLogger('deleteReward')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const rewardId = event.pathParameters.rewardId
  const userId = getUserId(event)

  if (!rewardId) {
    logger.error("Delete missing rewardId")
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: ""
    }
  }

  try {
    await rewardsClient.deleteReward(userId, rewardId)
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: "",
    }
  } catch (error) {
    logger.error("Delete attempt failed", {
      rewardId,
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
