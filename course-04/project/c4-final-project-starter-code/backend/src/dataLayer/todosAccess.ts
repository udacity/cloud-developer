import * as AWS  from 'aws-sdk';
import * as AWSXRay from 'aws-xray-sdk';
import {DocumentClient, QueryOutput} from 'aws-sdk/clients/dynamodb';

const XAWS = AWSXRay.captureAWS(AWS);

import { TodoItem } from '../models/TodoItem'
import {UpdateTodoRequest} from '../requests/UpdateTodoRequest';

export class TodoAccess {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly todosTable = process.env.TODOS_TABLE,
    private readonly todosUserIndex = process.env.TODOS_USER_INDEX
  ) {}

  async getAllTodosByUserId(userId: string): Promise<TodoItem[]> {
    console.log('Fetching all todos for userId: ', userId);
    // NOTE: Refresher video on queries:
    // https://classroom.udacity.com/nanodegrees/nd9990/parts/a46aa194-de1d-45fd-83ef-d83080ee8f3c/modules/826241f6-8d5f-436b-b01e-4ea8885d866d/lessons/f0d2e109-7647-4660-b88e-862551411d33/concepts/ff78fe40-d035-4eb9-9fde-d9e51e2d24e1
    const result = await this.docClient.query({
      TableName: this.todosTable,
      IndexName: this.todosUserIndex,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      },
      // Recap: https://youtu.be/qHq7G36BgD4 (4:42)
      ScanIndexForward: false // Will return the latest todos first
    }).promise()

    const items = result.Items
    return items as TodoItem[]
  }

  async createTodo(todoItem: TodoItem): Promise<TodoItem> {
    await this.docClient.put({
      TableName: this.todosTable,
      Item: todoItem
    }).promise();

    return todoItem;
  }

  async updateTodo(todoId: string, updatedTodo: UpdateTodoRequest) : Promise<UpdateTodoRequest> {
    await this.docClient.update({
      TableName: this.todosTable,
      Key: {
        todoId: todoId
      },
      UpdateExpression: 'set #name = :name, dueDate = :dueDate, done = :done',
      ExpressionAttributeNames: {
        '#name': 'name'
      },
      ExpressionAttributeValues: {
        ':name': updatedTodo.name,
        ':dueDate': updatedTodo.dueDate,
        ':done': updatedTodo.done,
      },
    }).promise();
    
    return updatedTodo;
  }

  async deleteTodo(todoId: string) {
    await this.docClient.delete({
      TableName: this.todosTable,
      Key: {
        "todoId": todoId,
      }
    }).promise();
  }

  async checkTodoExists(todoId: string) {
    const result = await this.getTodoItem(todoId);
    return result.Count > 0;
  }

  async getTodoItem(todoId: string) : Promise<QueryOutput> {
    return await this.docClient.query({
      TableName : this.todosTable,
      KeyConditionExpression: 'todoId = :todoId',
      ExpressionAttributeValues: {
        ':todoId': todoId
      }
    }).promise();
  }

  async addTodoAttachmentUrl(todoId: string, attachmentUrl: string) {
    await this.docClient.update({
      TableName: this.todosTable,
      Key: {
        'todoId': todoId
      },
      UpdateExpression: "set attachmentUrl = :attachmentUrl",
      ExpressionAttributeValues: {
        ":attachmentUrl": attachmentUrl
      }
    }).promise();
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