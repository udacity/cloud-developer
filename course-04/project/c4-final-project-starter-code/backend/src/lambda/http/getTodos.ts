import 'source-map-support/register'
import { getAllTodoItems } from '../../businessLogic/todoItems'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { TodoItemResponse } from './responseTypes/GetTodoResponse'
import { getUserId } from '../utils'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  event = event 
  console.log("get all todo items @ http handler")
  const userId = getUserId(event)
  const allToDoItems = await getAllTodoItems(userId)  
  var res: TodoItemResponse = {
    items: allToDoItems
  }
  
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    
    body: JSON.stringify(res) 
  }
}
