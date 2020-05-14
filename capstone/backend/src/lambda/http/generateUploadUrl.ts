import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'
import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)
const s3 = new XAWS.S3({
  signatureVersion: 'v4'
})

const bucketName = process.env.APPOINTMENTS_FILES_S3_BUCKET
const urlExpiration = process.env.SIGNED_URL_EXPIRATION

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const appointmentId = event.pathParameters.appointmentId

  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    const signedUrl = await getUploadUrl(appointmentId)
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
        uploadUrl:signedUrl
    })
  }

}


function getUploadUrl(appointmentId: string) {
    return s3.getSignedUrl('putObject', {
      Bucket: bucketName,
      Key: appointmentId,
      Expires: urlExpiration
    })
  }
  