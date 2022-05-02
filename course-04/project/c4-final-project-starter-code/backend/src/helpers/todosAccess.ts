import * as AWS from 'aws-sdk'
const AWSXRay = require('aws-xray-sdk')
// import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate';
// import { stringify } from 'querystring'

const client = new AWS.DynamoDB.DocumentClient({
  service: new AWS.DynamoDB({
    region: 'us-east-1'
  }),
  region: 'us-east-1'
})

AWSXRay.captureAWSClient((client as any).service);

const logger = createLogger('TodosAccess')

export class TodosAccess {


  constructor(
    private readonly docClient: DocumentClient = client,
    private readonly todosTable: string = process.env.TODOS_TABLE,
    private readonly todosTableIndex: string = process.env.TODOS_CREATED_AT_INDEX
  ) {

  }

  async getTodoList(userId: string) {

    const params = {
      TableName: this.todosTable,
      IndexName: this.todosTableIndex,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId
      },
    };



    try {
      return await this.docClient.query(params).promise()
    } catch (err) {
      logger.error("Unable to get ToDos from database", {
        methodName: 'todosAccess.getToDoList',
        userId,
        error: err
      })
      return err
    }

  }

  async insertTodoItem(todoItem: TodoItem) {
    let input = { "userId": todoItem.userId, "todoId": todoItem.todoId, "createdAt": todoItem.createdAt, "done": todoItem.done, "name": todoItem.name, "attachmentUrl": todoItem.attachmentUrl, "dueDate": todoItem.dueDate }
    const params: DocumentClient.PutItemInput = {
      TableName: this.todosTable,
      Item: input
    }

    try {
      await this.docClient.put(params).promise()
    } catch (err) {
      logger.error("Unable to insert ToDos into database", {
        methodName: 'todosAccess.insertTodoItem',
        todoId: todoItem.todoId,
        error: err
      })
        return err
    }
  }

  async updateTodoItem(todoId: string, userId: string, updatedTodoItem: TodoUpdate) {
    const params = {
      TableName: this.todosTable,
      Key: { 
        todoId,
        userId
      },
      UpdateExpression: 'set #nm = :name, dueDate = :dueDate, done = :done',
      ExpressionAttributeNames: {"#nm": "name"},
      ExpressionAttributeValues: { ':name': updatedTodoItem.name, ':dueDate': updatedTodoItem.dueDate, ':done': updatedTodoItem.done },
    }
    try {
      await this.docClient.update(params, function(err) {
        if(err) {
          console.log(err)
        }
      }).promise()
    } catch (err) {
      logger.error("Unable to update ToDos in database", {
        methodName: 'todosAccess.updateTodoItem',
        todoId: todoId,
        error: err
      })
      return err
    }
  }

  async deleteTodoItem(todoId: string, userId: string) {
    var params = {
      TableName: this.todosTable,
      Key: { 
        userId,
        todoId },
    }
    try {
      await this.docClient.delete(params, function(err) {
        if (err) {
          console.log(err)
        }
      }).promise()
    } catch (err) {
      logger.error("Unable to delete ToDos in database", {
        methodName: 'todosAccess.deleteTodoItem',
        todoId: todoId,
        error: err
      })
      return err
    }
  }

  async updateTodoItemAttachmentUrl(todoId: string, userId: string, imageId: string) {
    const params = {
      TableName: this.todosTable,
      Key: { 
        todoId,
        userId
      },
      UpdateExpression: 'set attachmentUrl = :attachmentUrl',
      ExpressionAttributeValues: { ':attachmentUrl': `https://${process.env.ATTACHMENT_S3_BUCKET}.s3.amazonaws.com/${imageId}` },
    }
    try {
      await this.docClient.update(params, function(err) {
        if(err) {
          console.log(err)
        }
      }).promise()
    } catch (err) {
      logger.error("Unable to Todo attachmentUrl in database", {
        methodName: 'todosAccess.updateTodoItemAttachmentUrl',
        todoId: todoId,
        error: err
      })
      return err
    }
  }
}


