import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { createLogger } from '../../utils/logger'

import * as AWS from "aws-sdk"
const logger = createLogger('signed url controller')

const awsS3 = new AWS.S3({
  signatureVersion: 'v4'
})
const todoBucket = process.env.ATTACHMENT_S3_BUCKET
const signedUrlExpires = 300

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId

  const signedUrl = awsS3.getSignedUrl("putObject", {
    Bucket: todoBucket,
    Key: todoId,
    Expires: signedUrlExpires
  });
  logger.info('singed URL generated: ', {"signedUrl" : signedUrl});
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      uploadUrl: signedUrl
    })
  }
}
