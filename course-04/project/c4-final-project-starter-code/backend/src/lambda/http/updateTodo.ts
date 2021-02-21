import 'source-map-support/register'
import { updateTodoItem } from '../../businessLogic/todoItems' 

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
  console.log(todoId)
  console.log(updatedTodo)
  const wasUpdated = await updateTodoItem(todoId, updatedTodo)
  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
  if (wasUpdated === true) {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: 'Todo item updated'
  }}
  return {
    statusCode: 400,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: 'Failure, item not updated'
  }
}
