import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { Todo } from '../models/TodoItem'

const XAWS = AWSXRay.captureAWS(AWS)

export class TodoAccess {

  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly todosTable = process.env.TODOS_TABLE,
    private readonly todosIndex = process.env.TODO_ID_INDEX,
    private readonly urlPrefix = `https://${process.env.ATTACHMENT_S3_BUCKET}.s3.amazonaws.com/`) {
  }

  async createTodo(todo: Todo) : Promise<Todo> {
    await this.docClient
      .put({
        TableName: this.todosTable,
        Item: todo
      })
      .promise()
  
    return todo
  }

  async checkTodo(key: any, done: boolean) : Promise<boolean> {
    await this.docClient
      .update({
        TableName: this.todosTable,
        Key: key,
        UpdateExpression: "set done=:done",
        ExpressionAttributeValues:{
          ":done": done
        },
        ReturnValues:"UPDATED_NEW"
      })
      .promise()

    return true
  }

  async updateTodoUrl(key: any, todoId: string) : Promise<boolean> {
    await this.docClient
      .update({
        TableName: this.todosTable,
        Key: key,
        UpdateExpression: "set attachmentUrl=:url",
        ExpressionAttributeValues:{
          ":url": this.urlPrefix + todoId
        },
        ReturnValues:"UPDATED_NEW"
      })
      .promise()

    return true
  }

  async deleteTodo(key: any) : Promise<boolean> {
    await this.docClient
      .delete({
        TableName: this.todosTable,
        Key: key
      })
      .promise()

    return true
  }

  async queryByTodoId(id: string) : Promise<any> {
    const result = await this.docClient
      .query({
        TableName : this.todosTable,
        IndexName : this.todosIndex,
        KeyConditionExpression: 'todoId = :todoId',
        ExpressionAttributeValues: {
            ':todoId': id
        }
      })
      .promise()

    if (result.Count === 0) {
      return undefined
    }
  
    return result.Items[0]
  }

  async queryByUserId(id: string) : Promise<any> {
    const result = await this.docClient
      .query({
        TableName: this.todosTable,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': id
        },
        ScanIndexForward: false
      })
      .promise()
    
    return result.Items
  }
}
