import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate';
import { stringify } from 'querystring'

const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('TodosAccess')

// TODO: Implement the dataLayer logic
// this is class TodosAccess
export class TodosAccess {
    docClient: DocumentClient;
    groupsTable: string;
   
    constructor(groupsTable: string) {
      this.docClient = new DocumentClient();
      this.groupsTable = groupsTable;
    }
   
    async getTodoList(userId: string) {

        const params = {
            TableName: 'ToDoTable', //TODO:: Set table name for all querys below
            Key: { userId }
        }

        try {
        const data = await this.docClient.get(params).promise()
        return data
        } catch (err) {
        return err
        }
    }

    async insertTodoItem(todoItem: TodoItem) {
        const params: DocumentClient.PutItemInput = {
            TableName: this.groupsTable,
            Item: todoItem
        }

        try {
            await this.docClient.put(params).promise()
        } catch (err) {
            return err
        }
    }
    
    async updateTodoItem(todoId: string, updatedTodoItem: TodoUpdate) {
        const params = {
            TableName: 'ToDoTable',
            Key: { todoId },
            // UpdateExpression: 'set price = :newprice',  TODO:: Figure out proper update syntax
            // ExpressionAttributeValues: { ':newprice': price },
          }
          try {
            await this.docClient.update(params).promise()
          } catch (err) {
            return err
          }
    }

    async deleteTodoItem(todoId: string) {
        var params = {
            TableName: 'ToDoTable',
            Key: { todoId },
          }
          try {
            await this.docClient.delete(params).promise()
          } catch (err) {
            return err
          }
    }
  }