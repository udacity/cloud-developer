import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from 'aws-lambda'
import { v4 } from 'uuid'

import { CreateRewardRequest } from '../../../requests/CreateRewardRequest'
import RewardsAccess from '../../../dataLayer/rewardsAccess'
import { getUserId } from '../../utils'
import { createLogger } from '../../../utils/logger'

const rewardsClient = new RewardsAccess()
const logger = createLogger('createReward')

const bucketName = process.env.IMAGES_S3_BUCKET

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // TODO: add API gateway request validation to handle 422s
  const newReward: CreateRewardRequest = JSON.parse(event.body)
  const userId = getUserId(event)

  if (!userId) {
    logger.error('Unauthorized createReward')
    return {
      statusCode: 401,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: 'unauthorized request'
    }
  }

  try {
    const rewardId = v4();
    const item = await rewardsClient.createReward({
      userId,
      rewardId,
      createdAt: new Date().toISOString(),
      redeemed: false,
      attachmentUrl: `https://${bucketName}.s3.amazonaws.com/${rewardId}`,
      ...newReward
    })
    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ item })
    }
  } catch (e) {
    logger.error('Reward could not be created', { error: e.message })
    return {
      statusCode: 422,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: 'Could not create reward'
    }
  }
}
