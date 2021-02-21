import 'source-map-support/register'
import { getAllTodoItems } from '../../businessLogic/todoItems'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  event = event 
  console.log("get all todo items @ http handler")
  const allToDoItems = await getAllTodoItems()  

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify (allToDoItems) 
  }
}
