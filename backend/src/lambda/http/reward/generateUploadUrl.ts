import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS from 'aws-sdk'
import { createLogger } from '../../../utils/logger'

const logger = createLogger('generateUploadUrl')

const s3 = new AWS.S3({
  signatureVersion: 'v4',
})
const bucketName = process.env.IMAGES_S3_BUCKET
const urlExpiration = Number(process.env.SIGNED_URL_EXPIRATION)

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const rewardId = event.pathParameters.rewardId

  try {
    const url = getUploadUrl(rewardId)
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        uploadUrl: url
      })
    }
  } catch (err) {
    logger.error('Failed to genereate upload url', err)
    return {
      statusCode: 500,
      body: 'Failed to genereate upload url'
    }
  }
}

function getUploadUrl(rewardId: string) {
  return s3.getSignedUrl('putObject', {
    Bucket: bucketName,
    Key: rewardId,
    Expires: urlExpiration
  })
}