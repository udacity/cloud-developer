import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

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
  async getTodos(userId:string): Promise<TodoItem[]> {
    console.log('Getting all groups')
    const result = await  this.docClient
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

  async createTodo(todo: TodoItem): Promise<TodoItem> {
    await this.docClient.put({
      TableName: this.todosTable,
      Item: todo
    }).promise()

    return todo
  }
  async deleteTodo(todoId: string): Promise<boolean> {
    await this.docClient.delete({
      TableName: this.todosTable,
      Key:{
        "todoId": todoId
    }
    }).promise()

    return true
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
