import 'source-map-support/register'
import * as AWS  from 'aws-sdk'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'
import { TodoItem } from '../../models/TodoItem'

const logger = createLogger('generateUpload')

const s3BucketName = process.env.S3_BUCKET_NAME
const todosTable = process.env.TODOS_TABLE
const s3 = new AWS.S3({
  signatureVersion: 'v4'
})
const docClient = new AWS.DynamoDB.DocumentClient()

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Generate URL ', event);
    
  const todoId = event.pathParameters.todoId
  const userId = getUserId(event);

  const url = await generateUploadUrl(todoId);

  
  try {
    const result = await docClient.query({
      TableName: todosTable,
      KeyConditionExpression: 'todoId = :todoId and userId = :userId',
      ExpressionAttributeValues: {
        ':todoId': todoId,
        ':userId': userId
      }
    }).promise()
  
    const items = result.Items;
    const item = items[0] as TodoItem;
  
    const newItem = {
      ...item,
      attachmentUrl: `https://${s3BucketName}.s3.amazonaws.com/${todoId}`
    }
    
    await docClient.update({
      TableName: todosTable,
      Key: {
        todoId: todoId,
        userId: userId,
      },
      UpdateExpression: "set done=:done, attachmentUrl=:attachmentUrl, dueDate=:dueDate, #nname=:name",
      ExpressionAttributeValues:{
        ":done": newItem.done,
        ":name": newItem.name,
        ":dueDate": newItem.dueDate,
        ':userId' : newItem.userId,
        ':attachmentUrl': newItem.attachmentUrl
      },
      ExpressionAttributeNames: {
        '#nname': 'name' // caused hidden errors due to reserved word
      },
      ConditionExpression: 'userId = :userId',
    }).promise()

    logger.info('upload url generated:', url);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        uploadUrl: url
      })
    }
  } catch (e) {
    logger.error('failed to create upload url', e);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: e
      })
    }
  }
  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
  // DONE
}

async function generateUploadUrl(todoId: string): Promise<string> {
  return s3.getSignedUrl('putObject', {
    Bucket: s3BucketName,
    Key: todoId,
    Expires: 30000,
  });
}