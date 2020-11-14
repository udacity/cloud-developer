import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { config } from '../config'
import { TodoItem } from '../models/TodoItem'
// import { TodoUpdate } from '../models/TodoUpdate'


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
}