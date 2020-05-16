import * as AWS from 'aws-sdk'
import {DocumentClient} from 'aws-sdk/clients/dynamodb'
import {TodoItem} from "../models/TodoItem";
import {TodoUpdate} from "../models/TodoUpdate";
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)


export class TodoRepository {
    constructor(
        private readonly docClient: DocumentClient = createDynamoDBClient(),
        private readonly todoTable = process.env.TODOS_TABLE,
        private readonly indexName = process.env.USER_ID_INDEX) {
    }

    async getTodos(userId: string): Promise<TodoItem[]> {
        const result = await this.docClient.query({
            KeyConditionExpression: "userId = :userId",
            IndexName: this.indexName,
            ExpressionAttributeValues: {
                ":userId": userId
            },
            TableName: this.todoTable
        }).promise()

        return result.Items as TodoItem[];
    }

    async createTodo(todo: TodoItem): Promise<TodoItem> {
        await this.docClient.put({
            TableName: this.todoTable,
            Item: todo
        }).promise()

        return todo;
    }

    async updateTodo(todoId: string, userId: string, todo: TodoUpdate): Promise<TodoUpdate> {
        await this.docClient.update({
            TableName: this.todoTable,
            Key: {
                "todoId": todoId
            },
            UpdateExpression: "set #name = :name, dueDate = :dueDate, done = :done",
            ExpressionAttributeValues: {
                ":name": todo.name,
                ":dueDate": todo.dueDate,
                ":done": todo.done,
                ":userId": userId
            },
            ExpressionAttributeNames: {
                "#name": "name"
            },
            ConditionExpression: "userId = :userId",
            ReturnValues: "UPDATED_NEW"
        }).promise()

        return todo;
    }

    async updateHasUpload(todoId: string, userId: string): Promise<void> {
        await this.docClient.update({
            TableName: this.todoTable,
            Key: {
                "todoId": todoId
            },
            UpdateExpression: "set hasUpload = :hasUpload",
            ExpressionAttributeValues: {
                ":hasUpload": true,
                ":userId": userId
            },
            ConditionExpression: "userId = :userId",
            ReturnValues: "UPDATED_NEW"
        }).promise()
    }

    async deleteTodo(todoId: string, userId: string): Promise<void> {
        await this.docClient.delete({
            TableName: this.todoTable,
            Key: {
                "todoId": todoId
            },
            ExpressionAttributeValues: {
                ":userId": userId
            },
            ConditionExpression: "userId = :userId"
        }).promise()
    }

    async getTodo(todoId: string): Promise<TodoItem> {
        const result = await this.docClient.get({
            TableName: this.todoTable,
            Key: {
                "todoId": todoId
            }
        }).promise()

        return result.Item as TodoItem;
    }
}

function createDynamoDBClient() {
    if (process.env.IS_OFFLINE) {
        console.log('Creating a local DynamoDB instance')
        return new AWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint: 'http://localhost:8000',
            logger: console
        })
    }

    return new XAWS.DynamoDB.DocumentClient()
}
