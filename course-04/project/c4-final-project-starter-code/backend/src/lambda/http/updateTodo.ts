import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import * as AWS  from 'aws-sdk'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { parseUserId } from '../../auth/utils'
import { TodoUpdate } from '../../models/TodoUpdate'

const docClient = new AWS.DynamoDB.DocumentClient()
const todoTable = process.env.TODOS_TABLE

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]
  
  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

  const todoItem = await docClient.update({
    TableName: todoTable,
    Key: {
      todoId,
      userId: parseUserId(jwtToken),
    },
    UpdateExpression: "set #a = :a, #b = :b, #c = :c",
    ExpressionAttributeNames: {
      "#a": "name",
      "#b": "dueDate",
      "#c": "done"
    },
    ExpressionAttributeValues: {
      ":a": updatedTodo['name'],
      ":b": updatedTodo['dueDate'],
      ":c": updatedTodo['done']
    },
    ReturnValues: "ALL_NEW"
  }).promise();

  const result = todoItem.Attributes as TodoUpdate
  
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      result
    }),
  }

  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
  // DONE
}
