import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { config } from '../config'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'


const XAWS = AWSXRay.captureAWS(AWS)

export default class TodosAccess {

    constructor(
        private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
        private readonly todosTable = config.todosTable,
        private readonly createdAtIndex = config.createdAtIndex
    ) { }

    async getTodos(userId: string): Promise<TodoItem[]> {
        const result = await this.docClient.query({
            TableName: this.todosTable,
            IndexName: this.createdAtIndex,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        }).promise()

        return result.Items as TodoItem[]
    }

    async getTodoById(userId: string, todoId: string): Promise<AWS.DynamoDB.QueryOutput> {
        return await this.docClient.query({
            TableName: this.todosTable,
            KeyConditionExpression: 'userId = :user and todoId = :todo',
            ExpressionAttributeValues: {
                ":user": userId,
                ":todo": todoId
            }
        }).promise()
    }

    async createTodo(todoItem: TodoItem): Promise<void> {
        await this.docClient.put({
            TableName: this.todosTable,
            Item: todoItem
        }).promise()
    }

    async updateTodo(userId: string, todoId: string, todoUpdate: TodoUpdate): Promise<void> {
        await this.docClient.update({
            TableName: this.todosTable,
            Key: {
                userId,
                todoId
            },
            UpdateExpression: 'SET #name = :n, dueDate = :due, done = :d',
            ExpressionAttributeValues: {
                ":n": todoUpdate.name,
                ":due": todoUpdate.dueDate,
                ":d": todoUpdate.done
            },
            ExpressionAttributeNames: {
                "#name": "name"
            }
        }).promise()
    }

    async deleteTodo(userId: string, todoId: string): Promise<void> {
        await this.docClient.delete({
            TableName: this.todosTable,
            Key: {
                userId,
                todoId
            }
        }).promise()
    }
}