import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";
import * as AWS from "aws-sdk";
import {TodoItem} from "../models/TodoItem";
import {createLogger} from "../utils/logger";
import {UpdateTodoRequest} from "../requests/UpdateTodoRequest";

const logger = createLogger('TodoAccess');
const bucketName = process.env.TODO_IMAGES_S3_BUCKET;

export class TodoAccess {

    constructor(
        private readonly docClient: DocumentClient = createDynamoDBClient(),
        private readonly todoTable = process.env.TodoTable) {
    }


    async createTodo(todoItem): Promise<TodoItem> {
        await this.docClient.put({
            TableName: this.todoTable,
            Item: todoItem
        }).promise()
        logger.info('Item Created in database', todoItem);
        return todoItem
    }

    async deleteTodo(todoId: string, userId: string): Promise<boolean> {
        await this.docClient.delete({
            TableName: process.env.TodoTable,
            Key: {
                'todoId': todoId,
                'userId': userId

            }
        }).promise();
        logger.info('Item deleted in database', {"todoId": todoId});

        return true;
    }

    async updateTodoImageUrl(todoId: string,
                             userId: string,
                             imageId: string): Promise<boolean> {

        await this.docClient.update({
            TableName: process.env.TodoTable,
            Key: {
                'todoId': todoId,
                'userId': userId

            },
            UpdateExpression: 'set attachmentUrl = :a',
            ExpressionAttributeValues: {
                ':a': `https://${bucketName}.s3.amazonaws.com/${imageId}`,
            }
        }).promise();
        logger.info('Item image url in database', {"todoId": todoId});

        return true;
    }

    async getTodos(userId: string): Promise<any> {
        const result = await this.docClient.query({
            TableName: process.env.TodoTable,
            IndexName: process.env.USER_ID_INDEX,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        }).promise()
        logger.info('Retrived Todos for user', {"userId": userId});
        return result.Items;
    }

    async updateTodo(updatedTodo: UpdateTodoRequest, todoId: string, userId: string): Promise<boolean> {
        await this.docClient.update({
            TableName: process.env.TodoTable,
            Key: {
                'todoId': todoId,
                'userId': userId,
            },
            UpdateExpression: 'set #name = :n, dueDate = :dd, done = :d ',
            ExpressionAttributeValues: {
                ':n': updatedTodo.name,
                ':dd': updatedTodo.dueDate,
                ':d': updatedTodo.done
            },
            ExpressionAttributeNames: {
                "#name": "name"
            }
        }).promise();
        logger.info('Updated Todo item', {"Item": updatedTodo});
        return true;
    }
}

function createDynamoDBClient() {


    return new AWS.DynamoDB.DocumentClient();

}
