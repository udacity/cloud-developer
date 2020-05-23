import 'source-map-support/register'
import {getAllToDOItems} from '../../businessLogic/ToDoBusiness'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // TODO: Get all TODO items for a current user
  console.log(event.body);
  const ToDoItems = await getAllToDOItems()
    return{
              statusCode:201,
              headers:{
                  'Access-Control-Allow-Origin' :'*'
              },
              body: JSON.stringify({
                ToDoItems
              })
          }
}
