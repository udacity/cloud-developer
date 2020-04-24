import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
const logger = createLogger('deleteAccess')

const XAWS = AWSXRay.captureAWS(AWS)

import { TodoItem } from '../models/TodoItem'

export class TodosAccess {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly todosTable = process.env.TODOS_TABLE,
    private readonly indexName = process.env.INDEX_NAME) {
  }

  async getAllTodos(): Promise<TodoItem[]> {
    console.log('Getting all groups')

    const result = await this.docClient.scan({
      TableName: this.todosTable
    }).promise()

    const items = result.Items
    return items as TodoItem[]
  }
  async getTodos(userId: string): Promise<TodoItem[]> {
    console.log('Getting all groups')
    const result = await this.docClient
      .query({
        TableName: this.todosTable,
        IndexName: this.indexName,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId
        }
      })
      .promise()

    const items = result.Items
    return items as TodoItem[]
  }

  async getTodo(todoId: string, userId: string): Promise<TodoItem> {
    console.log('Getting all groups')
    const result = await this.docClient
      .query({
        TableName: this.todosTable,
        IndexName: this.indexName,
        KeyConditionExpression: 'todoId = :todoId AND userId = :userId',
        ExpressionAttributeValues: {
          ':todoId': todoId,
          ':userId': userId
        }
      })
      .promise()

    const items = result.Items[0]
    return items as TodoItem
  }

  async createTodo(todo: TodoItem): Promise<TodoItem> {
    await this.docClient.put({
      TableName: this.todosTable,
      Item: todo
    }).promise()

    return todo
  }

  async deleteTodo(todoItem: TodoItem): Promise<boolean> {
    logger.info(`-----User to be deleted: ${todoItem.userId} -- todoId: ${todoItem.todoId}`)
    const result = await this.docClient.delete({
      TableName: this.todosTable,
      Key: {
        "userId": todoItem.userId,
        "createdAt": todoItem.createdAt
      },
      ConditionExpression: "todoId = :todoId",
      ExpressionAttributeValues: {
        ":todoId": todoItem.todoId
      }
    }).promise()
    if (result.$response.error)
      throw new Error('Failed to delete item: ' + result.$response.data)

    return true
  }


  async updateTodo(todoItem:TodoItem): Promise<TodoItem> {
    logger.info(`-----User to be updated: ${todoItem.userId} -- todoId: ${todoItem.todoId}`)

      var expressionAttibutes = {
        ":todoId": todoItem.todoId,
        ":done": todoItem.done,
        ":name": todoItem.name,
        ":dueDate": todoItem.dueDate
      }
      var updateExpression = "set done = :done, dueDate=:dueDate, #n=:name"

      if(todoItem.attachmentUrl !== undefined){
        
        expressionAttibutes[":attachmentUrl"] = todoItem.attachmentUrl
        updateExpression += ', attachmentUrl = :attachmentUrl'
      }else{
        updateExpression += 'REMOVE attachmentUrl'
      }
      

    const result = await this.docClient.update({
      TableName: this.todosTable,
      Key: {
        "userId": todoItem.userId,
        "createdAt": todoItem.createdAt
      },
      ConditionExpression: "todoId = :todoId",
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttibutes,
      ExpressionAttributeNames:{
        "#n": "name"
      },
      ReturnValues: "UPDATED_NEW"
    }).promise()
    if (result.$response.error)
      throw new Error('Failed to update item: ' + todoItem)
    return todoItem
  }

}

function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    console.log('Creating a local DynamoDB instance')
    return new XAWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  }

  return new XAWS.DynamoDB.DocumentClient()
}
