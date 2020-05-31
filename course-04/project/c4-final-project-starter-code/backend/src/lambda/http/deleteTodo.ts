import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import {deleteAllToDoItems} from '../../businessLogic/ToDoBusiness'
import { createLogger } from '../../utils/logger'

const logger = createLogger('deleteToDo')
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  logger.info(event.body);
  await deleteAllToDoItems(todoId)
  // TODO: Remove a TODO item by id
  logger.info('deleted item with id as ', todoId)
  return{
    statusCode:201,
    headers:{
        'Access-Control-Allow-Origin' :'*'
    },
 body: ''  
}
}
