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


// function createDynamoDbClient() {
//   try {
//     if(process.env.IS_OFFLINE) {
//       console.log("Using local dynamo db instance")
//       return new AWS.DynamoDB.DocumentClient({
//         service: new AWS.DynamoDB(),
//         region: 'localhost',
//         endpoint: 'http://localhost:8000'
//       })
//     }
//   } catch (err) {
//     console.log("DOCCLIENT ERRORrrrrrrR:" + JSON.stringify)
//   }

//   return new AWS.DynamoDB.DocumentClient({
//     service: new AWS.DynamoDB()
//   })
// }

const logger = createLogger('TodosAccess')

// TODO: Implement the dataLayer logic
// this is class TodosAccess
export class TodosAccess {


  constructor(
    private readonly docClient: DocumentClient = client,
    private readonly todosTable = process.env.TODOS_TABLE
  ) {

  }
  // constructor(groupsTable: string) {
  //   private readonly docClient: new XAWS.DynamoDB.DocumentClient();
  //   this.groupsTable = groupsTable;
  // }

  async getTodoList(userId: string) {

    const params = {
      TableName: this.todosTable,
      FilterExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ':userId': userId
      },
    };



    try {
      return await this.docClient.scan(params).promise()
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
    console.log("NAMMMMMEEEEE: " + todoItem.name)
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
      return err
    }
  }
}
