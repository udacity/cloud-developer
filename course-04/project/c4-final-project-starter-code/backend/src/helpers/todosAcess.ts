import * as AWS from 'aws-sdk'
//import * as AWSXRay from 'aws-xray-sdk'
const AWSXRay = require('aws-xray-sdk')
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate';

const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('TodosAccess')

// TODO: Implement the dataLayer logic

export class TodosAccess {
    constructor(
        private readonly docClient: DocumentClient =  new XAWS.DynamoDB.DocumentClient(),
        private readonly todoTable = process.env.TODOS_TABLE,
        private readonly bucketName = process.env.ATTACHMENT_S3_BUCKET,
        private readonly todoTableIndex = process.env.TODOS_CREATED_AT_INDEX
    ){}
    
    async createTodo(todo: TodoItem): Promise<TodoItem> {
        logger.info("Creating todoID: ", todo.todoId)

        await this.docClient.put({
            TableName: this.todoTable,
            Item: todo
        }).promise()

        return todo as TodoItem
    }
    
    async updateTodo(todo: TodoUpdate, userId: string, todoId: string) {
        logger.info("Updating item ", todoId)

        await this.docClient.update({
            TableName: this.todoTable,
            Key: { 
                userId: userId, 
                todoId: todoId 
            },
            UpdateExpression: "set #name=:name, dueDate=:dueDate, done=:done",
            ExpressionAttributeValues: {
                ":name": todo.name,
                ":dueDate": todo.dueDate,
                ":done": todo.done,
            },
            ExpressionAttributeNames: { "#name": "name" }
        }).promise()
    }
    
    async getTodos(userId: string): Promise<TodoItem[]> {
        logger.info("Getting todos for userID: ", userId)

        const result = await this.docClient.query({
            TableName: this.todoTable,
            IndexName: this.todoTableIndex,
            KeyConditionExpression: 'userId = :paritionKey',
            ExpressionAttributeValues: {
                ':paritionKey': userId
            }
        }).promise()

        const items = result.Items
        return items as TodoItem[]
    }

    async getTodo(userId: string, todoId: string): Promise<TodoItem> {
        logger.info("Getting todo: ", todoId)

        const result = await this.docClient.get({
            TableName: this.todoTable,
            Key: {
                userId, todoId
            }
        }).promise()

        const item = result.Item
        return item as TodoItem
    }
    
    async deleteTodo(userId: string, todoId: string) {
        logger.info("Deleting todo: ", todoId)

        await this.docClient.delete({
            TableName: this.todoTable,
            Key: {
                userId, todoId
            }
        }).promise()
    }

    async attachUrl(imageId: string, todo: TodoItem) {
        logger.info("Attaching URL to item ", todo.todoId)
        
        const attachmentUrl = `https://${this.bucketName}.s3.amazonaws.com/${imageId}`
        await this.docClient.update({ 
            TableName: this.todoTable, 
            Key: {
                todoId: todo.todoId,
                userId: todo.userId
            },
              UpdateExpression: 'set attachmentUrl = :attachmentUrl',
              ExpressionAttributeValues: {
                ':attachmentUrl': attachmentUrl
            } 
        }).promise()
    }
}