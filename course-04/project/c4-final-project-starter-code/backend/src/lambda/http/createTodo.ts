import 'source-map-support/register'
import { createTodoItem } from '../../businessLogic/todoItems'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { CreateTodoItemResponse } from './responseTypes/CreateTodoResponse'
import { getUserId } from '../utils'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newTodo: CreateTodoRequest = JSON.parse(event.body)
  console.log(newTodo)
  
  // get logged on user id 
  const currentUser = getUserId(event)

  // create the new item
  const newTodoItem = await createTodoItem(newTodo, currentUser)

  // wrap plain entity into response type
  const apiResponse: CreateTodoItemResponse = {
    item: newTodoItem
  }

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify (apiResponse)
  } 
}
