import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { postAllToDoItems } from '../../businessLogic/ToDoBusiness'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newTodo: CreateTodoRequest = JSON.parse(event.body)
  // const authorization = event.headers.Authorization

  // const split = authorization.split(' ')
  // const jwtToken = split[1]
console.log('before calling create to do function');
  
 const ToDoItems = await postAllToDoItems(newTodo)
 return{
  statusCode:201,
  headers:{
    'Access-Control-Allow-Origin' :'*',
    'Access-Control-Allow-Credentials' : true
  },
  body: JSON.stringify({
    ToDoItems
  })
}
  
}
