import * as AWS from 'aws-sdk'
import 'source-map-support/register'
import { getUserId } from '../utils'
import { updateAttachmentURL } from '../../businessLogic/todoItems'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  console.log(todoId)
  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
  const s3 = new AWS.S3({
    signatureVersion: 'v4' // Use Sigv4 algorithm
  })
  console.log("before call of signed url")
  const presignedUrl = await s3.getSignedUrl('putObject', { // The URL will allow to perform the PUT operation
    Bucket: process.env.ATTACHMENTS_BUCKET_NAME, // Name of an S3 bucket
    Key: todoId, // id of an object this URL allows access to
    Expires: '300'  // A URL is only valid for 5 minutes
  })
  console.log("after call of sign url")
 
  const currentUserId = getUserId(event)

  const attachmentUrl = `https://todo-att-bucket-${process.env.STAGE}.s3.eu-central-1.amazonaws.com/${todoId}`
  await updateAttachmentURL(todoId, currentUserId, attachmentUrl)

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers" : "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*"
  },
    body: `{ "uploadUrl": "${presignedUrl}" }`
  }
}
