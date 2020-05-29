import 'source-map-support/register'
import * as AWS from 'aws-sdk'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

const bucket_name = process.env.AttachmentBucket
const urlExpiration = Number(process.env.SIGNED_URL_EXPIRATION)

const s3= new AWS.S3({
    signatureVersion: 'v4'
})


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId

  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id

  console.log(event.body)
  
  const signedUrl = getUploadURL(todoId)
  return{
    statusCode:201,
    headers:{
        'Access-Control-Allow-Origin' :'*'
    },
    body :  JSON.stringify( {
      uploadUrl : signedUrl
    } )
  }
}

function getUploadURL(imageId : string){
  return s3.getSignedUrl('putObject', {
      Bucket: bucket_name,
      Key: imageId,
      Expires: urlExpiration
  })
}
