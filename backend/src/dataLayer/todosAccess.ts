import { WriteRequests, PutItemInputAttributeMap } from 'aws-sdk/clients/dynamodb'

import { TodoItem } from '../models/TodoItem'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import * as helpers from './helpers'
import createDynamoDBClient from './dynamoDBAccess'

export default class TodosAccess {
  constructor(
    private readonly docClient = createDynamoDBClient(),
    private readonly todosTable = process.env.TODOS_TABLE,
    private readonly index = process.env.TODOS_INDEX
  ) { }

  async getTodos(userId: string): Promise<TodoItem[]> {
    const result = await this.docClient
      .query({
        TableName: this.todosTable,
        IndexName: this.index,
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
    await this.docClient
      .put({
        TableName: this.todosTable,
        Item: todo
      })
      .promise()

    return todo
  }

  async createTodos(todos: PutItemInputAttributeMap[] = []): Promise<void> {
    if (!todos.length) return
    const writes: WriteRequests = todos.map(todo => ({
      PutRequest: {
        Item: todo
      }
    }))
    const batches = helpers.chunk(writes);
    await Promise.all(batches.map(batch => this._writeBatch(batch)))
  }

  async _writeBatch(writes: WriteRequests = []): Promise<void> {
    const result = await this.docClient
      .batchWrite({
        RequestItems: {
          [this.todosTable]: writes,
        },
      })
      .promise();

    const unprocessedTodos = result.UnprocessedItems[this.todosTable]
    if (unprocessedTodos) {
      await this._writeBatch(unprocessedTodos)
    }
  }

  async updateTodo(
    userId: TodoItem['userId'],
    todoId: TodoItem['todoId'],
    updatedTodo: UpdateTodoRequest
  ): Promise<void> {
    await this.docClient
      .update({
        TableName: this.todosTable,
        Key: {
          userId: userId,
          todoId: todoId
        },
        UpdateExpression: 'set #name = :name, dueDate = :dueDate, done = :done',
        ExpressionAttributeNames: {
          "#name": "name"
        },
        ExpressionAttributeValues: {
          ':name': updatedTodo.name,
          ':dueDate': updatedTodo.dueDate,
          ':done': updatedTodo.done
        }
      })
      .promise()
  }

  async deleteTodo(userId: TodoItem['userId'], todoId: TodoItem['todoId']): Promise<void> {
    await this.docClient
      .delete({
        TableName: this.todosTable,
        Key: {
          userId: userId,
          todoId: todoId
        }
      })
      .promise()
  }
}
