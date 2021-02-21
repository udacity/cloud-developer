import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { TodoItem } from '../models/TodoItem'
import { createLogger } from '../utils/logger'

/**
 * 
 */
export class TodoItemAccess {
    constructor(
        private readonly docClient: DocumentClient = createDynamoDBClient(),
        private readonly todoTable = process.env.TODO_TABLE,
        private readonly LOGGER = createLogger("TODOITEM_ACCESS")) {}

    /**
     * data access method to return all todo items 
     */
    async getAllTodosItems(): Promise<TodoItem[]> {
        this.LOGGER.info('Getting all todo items')
        
        const result = await this.docClient.scan(
            { TableName: this.todoTable }
        ).promise()
        console.log("Got result from dynamodb: " + JSON.stringify(result))
        const items = result.Items
        return items as TodoItem[]
    }

    /**
     * data access method to create a todo item
     */
    async createTodoItem(todoItem: TodoItem): Promise<TodoItem> {
        console.log('befor create of new todo item')
        await this.docClient.put({
            TableName: this.todoTable,
            Item: todoItem
        }).promise()
        console.log('after create of new todo item')
        return todoItem
    }
    
    /**
     * data access method to delete todo item
     * @param todoItem item to be deleted
     */
    async deleteTodoItem(todoItemId: String): Promise<Boolean> {
        console.log("before deletion of todo item id:" + JSON.stringify(todoItemId))
        await this.docClient.delete(
            {
                TableName: this.todoTable,
                Key: {
                    "todoId": todoItemId
                }
            }
        ).promise()
        console.log("after deletion of todo item :" + JSON.stringify(todoItemId))
        return true
    }

    /**
     * data access method to update a todo item
     * @param todoItem todo item to be updated
     */
    async updateTodoItem(id: String, name: String, done: boolean, dueDate: String): Promise<boolean> {
        console.log("before update of todo item: " + id)
        var operationSuccessful: boolean = false
        await this.docClient.update({
            TableName: this.todoTable,
            Key: {
                "todoId": id
            },
            UpdateExpression: "set #n=:n, dueDate=:d, done=:x",
            ExpressionAttributeValues: {
                ":n": name,
                ":d": dueDate,
                ":x": done
            },
            ExpressionAttributeNames: {
                "#n": "name"
            }
        }
        ).promise().then( (updateItemOutput) => {
            console.log("todo item updated");
            console.log(JSON.stringify(updateItemOutput))
            operationSuccessful = true
        }).catch( (error) => {
            console.error(`Update of todo item with id ${id} failed!`)
            console.error(JSON.stringify(error))
            operationSuccessful = false
        })
        return operationSuccessful
    }
    
}

/**
 * helper function to create the document client
 */
function createDynamoDBClient(): DocumentClient {
    return new AWS.DynamoDB.DocumentClient() 
}