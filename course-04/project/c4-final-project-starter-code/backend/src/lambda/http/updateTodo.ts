import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { updateTodo } from '../../businessLogic/todos'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { getUserId } from '../utils'

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
    
    const todoId = event.pathParameters.todoId
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
    
    try {
      await updateTodo(todoId, getUserId(event), updatedTodo)
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({})
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

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )

  function validateParameters(event) {
    if(!event) {
      throw 'event is required'
    } else {
      if(!event.pathParameters.todoId) {
        throw 'todoId is required as path param'
      }
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
        if(typeof body.done === 'undefined' || body.done === null) {
          throw 'done attribute required in body'
        }
      }
    }
  }