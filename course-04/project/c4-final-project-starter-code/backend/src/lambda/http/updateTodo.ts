import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'

import {updateAllToDoItems} from '../../businessLogic/ToDoBusiness'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object

  console.log(JSON.parse(event.body))

  const result = await updateAllToDoItems(updatedTodo , todoId)
  return{
    statusCode:201,
    headers:{
        'Access-Control-Allow-Origin' :'*'
    },
    body: JSON.stringify({
      result
    })
}

  
}
