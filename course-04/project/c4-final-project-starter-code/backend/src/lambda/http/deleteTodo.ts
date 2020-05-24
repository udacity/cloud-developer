import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import {deleteAllToDoItems} from '../../businessLogic/ToDoBusiness'
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId

  await deleteAllToDoItems(todoId)
  // TODO: Remove a TODO item by id
  console.log(event.body);
  return{
    statusCode:201,
    headers:{
        'Access-Control-Allow-Origin' :'*'
    },
 body: ''  
}
}
