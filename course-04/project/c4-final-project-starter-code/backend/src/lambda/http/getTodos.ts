import 'source-map-support/register'
import {getAllToDOItems} from '../../businessLogic/ToDoBusiness'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { parseUserId } from '../../auth/utils';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // TODO: Get all TODO items for a current user
  console.log(event.body);
 
  const authorization = event.headers.Authorization

  const split = authorization.split(' ')
  const jwtToken = split[1]
const userid= parseUserId(jwtToken)

console.log('before calling create to do function');
  const todos = await getAllToDOItems(userid)
    return{
              statusCode:201,
              headers:{
                  'Access-Control-Allow-Origin' :'*'
              },
              body: JSON.stringify({
                items: todos
              })
          }
}
