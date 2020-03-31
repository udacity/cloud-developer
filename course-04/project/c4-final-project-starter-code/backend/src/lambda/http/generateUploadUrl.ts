import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS  from 'aws-sdk'

import {createLogger} from '../../utils/logger'
import {checkTodoExists, addTodoAttachmentUrl} from '../../businessLogic/todos';

const bucketName = process.env.ATTACHMENTS_IMAGES_S3_BUCKET;
const urlExpiration = process.env.SIGNED_URL_EXPIRATION;

const logger = createLogger('generateUploadUrlHandler');
const s3 = new AWS.S3({
  signatureVersion: 'v4'
});
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId;

  const validTodoId = await checkTodoExists(todoId);
  if (!validTodoId){
    logger.info(`Cannot find todo with todoId: ${todoId}`);
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: `Cannot find todo with todoId: ${todoId}`
    }
  }
 
  const uploadUrl = await getUploadUrl(todoId);
  await addTodoAttachmentUrl(todoId);

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      uploadUrl,
    })
  }
}

// Recap on Presigned Url
// https://classroom.udacity.com/nanodegrees/nd9990/parts/a46aa194-de1d-45fd-83ef-d83080ee8f3c/modules/826241f6-8d5f-436b-b01e-4ea8885d866d/lessons/f5325d47-28ac-4b59-860e-1acf5f3837f7/concepts/8d1ecc6b-6332-4ff4-8f8d-af2c10b956c3
function getUploadUrl(todoId: string) {
  return s3.getSignedUrl('putObject', {
    Bucket: bucketName,
    Key: todoId,
    Expires: urlExpiration
  })
};
