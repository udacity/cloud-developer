import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import {TodoItem} from "../../models/TodoItem";
import * as uuid from 'uuid';
import { parseUserId } from '../../auth/utils'

const s3BucketName = process.env.S3_BUCKET_NAME

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const authorization = event.headers.Authorization;
  const split = authorization.split(' ');
  const jwtToken = split[1];
    
  const todoId = event.pathParameters.todoId

  const attachmentId = uuid.v4();
  const URL = await generateUploadUrl(attachmentId);

  const newItem = await createAttachmentItem(todoId, attachmentId, event, jwtToken);
  const Attachments = await getToDoAttachment(todoId);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      uploadUrl: URL,
      attachmentUrl: Attachments,
      newItem: newItem
    })
  };
  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
  // DONE
}

async function createAttachmentItem(todoId: string, attachmentId: string, event: any, jwtToken: string) {
  const newAttachment = await createAttachment(todoId, attachmentId, event, jwtToken);
  const attachmentURL = `${s3BucketName}.s3.amazonaws.com/${attachmentId}`;
  await updateItemAttachment(todoId, attachmentURL, jwtToken);
  
  return newAttachment;
}

async function createAttachment(todoId: string, attachmentId: string, event: any, jwtToken: string) {
  console.log("Creating new Attachment todo");
  
  const timestamp = new Date().toISOString();
  const newAttach = JSON.parse(event.body);
  const newItem = {
      todoId,
      timestamp,
      attachmentId,
      userId: parseUserId(jwtToken),
      ...newAttach,
  };

  const attachmentItem = {
      ...newItem,
      attachmentUrl: `https://${this.s3BucketName}.s3.amazonaws.com/${newItem.attachmentId}`
  };
  const params = {
      TableName: this.attachmentTable,
      Item: attachmentItem,
  };

  await this.docClient.put(params).promise();

  return attachmentItem as TodoItem;
}

async function updateItemAttachment(todoId: string, attachmentUrl: any, jwtToken: any) {
  console.log('Start update todo to add attachment');
  
  const userId = parseUserId(jwtToken);
  const item = await this.getToDo(todoId, userId);
  const updatedItem = {
    todoId: todoId,
    userId: userId,
    createdAt: item.createdAt,
    name: item.name,
    dueDate:item.dueDate,
    done: item.done,
    attachmentUrl: attachmentUrl
  };
  console.log('updatedItem', updatedItem);
  await this.docClient.put({
    TableName: this.todoTable,
    Item: updatedItem
  }).promise();
  console.log("upload completed!");

  return updatedItem as TodoItem;
}

async function getToDoAttachment(todoId: string) {
  const params = {
    TableName: this.attachmentTable,
    KeyConditionExpression: 'todoId = :todoId',
    ExpressionAttributeValues: {
        ':todoId': todoId
    },
    ScanIndexForward: false
  };

  const result = await this.docClient.query(params).promise();
  console.log(result);
  return result.Items;
}

async function generateUploadUrl(todoId: string): Promise<string> {
  console.log("Generating URL");

  const url = this.s3Client.getSignedUrl('putObject', {
    Bucket: this.s3BucketName,
    Key: todoId,
    Expires: 1000,
  });
  
  console.log('Bucket url', url);

  return url as string;
}