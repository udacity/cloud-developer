import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'
import { createTodo } from '../../services/todoService'

const logger = createLogger('createTodo controller')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const todoRequest: CreateTodoRequest = JSON.parse(event.body)
  logger.info('create todo request received', todoRequest)

  const newTodo = await createTodo(todoRequest, getUserId(event))
  logger.info('create todo request successful: ', newTodo)


  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      item: newTodo
    })
  }

}
