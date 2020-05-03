import { TodoItem } from "../models/TodoItem"
import { createLogger } from "../utils/logger"
import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
const XAWS = AWSXRay.captureAWS(AWS)
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { TodoUpdate } from "../models/TodoUpdate"
const logger = createLogger('todo dao')

const docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient()
const todosTable = process.env.TODOS_TABLE
const userIdIndex = process.env.USER_ID_INDEX

export async function createTodo(todoItem: TodoItem): Promise<TodoItem> {

    logger.info('in createTodo dao')

    await docClient.put({
      TableName: todosTable,
      Item: todoItem
    }).promise()

    logger.info('create todo successful')
    return todoItem
}


export async function getAllTodos(userId: string): Promise<TodoItem[]> {
    logger.info('getting all todos for user with ID: ', userId)
    const result = await docClient.query({
        TableName: todosTable,
        IndexName: userIdIndex,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': userId
        }
    }).promise()
    logger.info('fecthed todos: ', result);

    const items = result.Items
    logger.info('todos access items ', items)
    return items as TodoItem[]
}

export async function updateTodo(todoItem: TodoUpdate, todoId: string, userId: string): Promise<TodoUpdate>{
    logger.info('updating todo item with Id: ', todoId)

    await docClient.update({
        TableName: todosTable,
        Key: {
            userId,
            todoId
        },
        UpdateExpression: "set #n = :name, dueDate = :dueDate, done = :done",
        ExpressionAttributeValues: {
            ":name": todoItem.name,
            ":dueDate": todoItem.dueDate,
            ":done": todoItem.done 
        },
        ExpressionAttributeNames: {
            "#n": 'name'
            // name conflicts with dynamos reserved words: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ReservedWords.html
        }
    }).promise()

    logger.info('item updated successfully')  
    return todoItem
}

export async function deleteTodo(todoId: string, userId: string): Promise<any> {
    logger.info('deleting todo item with Id: ', todoId)
    await docClient.delete({
        TableName: todosTable,
        Key: {
          userId,
          todoId
        }
      }).promise()

    logger.info('item deleted successfully')
  return null;
}