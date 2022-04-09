import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils';
import { createTodo } from '../../businessLogic/todos'
import { TodoItem } from '../../models/TodoItem'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      validateParameters(event)
    } catch (err) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          error: err
        })
      }
    }

    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    const userId : string = getUserId(event)
    
    try {
      const response = createTodo(newTodo, userId)
      return {
        statusCode: 201,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          items: [
            response
          ]
        })
      }
    } catch (err) {
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          error: err
        })
      }
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)

function validateParameters(event) {
  if(!event) {
    throw 'event is required'
  } else {
    if(!event.body) {
      throw 'body is required'
    } else {
      const body = JSON.parse(event.body);
      if(!body.name) {
        throw 'name attribute required in body'
      }
      if(!body.dueDate) {
        throw 'dueDate attribute required in body'
      }
    }
  }
}
