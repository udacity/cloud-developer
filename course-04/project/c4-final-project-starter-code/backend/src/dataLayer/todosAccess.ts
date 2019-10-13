import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

const XAWS = AWSXRay.captureAWS(AWS)

const s3 = new AWS.S3({
  signatureVersion: 'v4'
})

import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'

export class TodoAccess {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly todosTable = process.env.TODOS_TABLE,
    private readonly todosImageBucket = process.env.TODOS_IMAGES_S3_BUCKET) {
    }
    

  async getAllTodos(): Promise<TodoItem[]> {
    console.log('Getting all todos')

    const result = await this.docClient.scan({
      TableName: this.todosTable
    }).promise()

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

  async updateTodo(userId:string , todoId: string, todo: TodoUpdate): Promise<TodoUpdate> {
    await this.docClient.update({
      TableName: this.todosTable,
      Key: {
        "userId": userId,
        "todoId": todoId
      },
      UpdateExpression: "set dueDate=:dd, done=:d, #name=:n",
      ExpressionAttributeValues:{
        ":dd": todo.dueDate,
        ":d": todo.done,
        ":n": todo.name
      },
      ExpressionAttributeNames:{
        "#name": "name"
      }
    }).promise()

    return todo
  }

  async deleteTodo(userId:string , todoId: string){
    await this.docClient.delete({
      TableName: this.todosTable,
      Key: {
        "userId": userId,
        "todoId": todoId
      }
    }).promise().then(result => {
      console.log("result: ", JSON.stringify(result))
    })
  }  

  getUploadUrl(todoId:string){
    return s3.getSignedUrl('putObject', {
      Bucket: this.todosImageBucket,
      Key: todoId,
      Expires: 300
    })
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
