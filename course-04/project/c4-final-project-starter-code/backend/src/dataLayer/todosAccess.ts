import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'
import { createLogger } from '../utils/logger'

const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('todoService')

export class TodosAccess {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly s3 = createS3Client(),
    private readonly todosTable = process.env.TODOS_TABLE,
    private readonly todosS3BucketName = process.env.TODOS_IMAGES_S3_BUCKET,
    private readonly urlExpiration = process.env.TODOS_TABLE) {
  }

  async getAllTodos(userId: string): Promise<TodoItem[]> {
    logger.info('Getting all todo items')

    const result = await this.docClient.query({
      TableName: this.todosTable,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      },
      ScanIndexForward: false
    }).promise()

    const items = result.Items
    return items as TodoItem[]
  }

  async getTodoItem(userId: string, todoId: string): Promise<TodoItem> {
    logger.info('Getting a single todo item')

    const result = await this.docClient.get({
      TableName: this.todosTable,
      Key: {
        userId,
        todoId
      }
    }).promise()

    return result.Item as TodoItem
  }

  async createTodo(newItem: TodoItem): Promise<TodoItem> {
    logger.info('Creating todo item')

    await this.docClient.put({
      TableName: this.todosTable,
      Item: newItem
    }).promise()

    return newItem;
  }

  async updateTodo(userId: string, todoId: string, updateItem: TodoUpdate): Promise<TodoUpdate> {
    logger.info('Updating todo item')

    await this.docClient.update({
      TableName: this.todosTable,
      Key: {
        "userId": userId,
        "todoId": todoId
      },
      UpdateExpression: "set name = :r, dueDate=:p, done=:a",
      ExpressionAttributeValues: {
        ":r": updateItem.name,
        ":p": updateItem.dueDate,
        ":a": updateItem.done
      },
      ReturnValues: "UPDATED_NEW"
    }).promise()

    return updateItem;
  }

  async deleteTodoItem(userId: string, todoId: string) {
    logger.info('Deleting a single todo item')

    await this.docClient.delete({
      TableName: this.todosTable,
      Key: {
        userId,
        todoId
      }
    }).promise()
  }

  async getUploadUrl(todoId: string) {
    const url = await this.s3.getSignedUrl('putObject', {
      Bucket: this.todosS3BucketName,
      Key: todoId,
      Expires: this.urlExpiration
    })

    return url;
  }
}

function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    logger.info('Creating a local DynamoDB instance')
    return new XAWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  }

  return new XAWS.DynamoDB.DocumentClient()
}

function createS3Client() {
  if (process.env.IS_OFFLINE) {
    logger.info('Creating a local S3 instance')
    return new AWS.S3({
      signatureVersion: 'v4'
    })
  }

  return new XAWS.S3({
    signatureVersion: 'v4'
  })
}
