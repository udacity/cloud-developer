import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import { createLogger } from '../../utils/logger'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { updateTodo, getTodo } from '../../businessLogic/todos'
const logger = createLogger('Update Logger')
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info("Processing event: "+event)
    const todoId = event.pathParameters.todoId
    const authorization = event.headers.Authorization
    const split = authorization.split(' ')
    const jwtToken = split[1]
    const todoItem = await getTodo(todoId, jwtToken)
    if (!todoItem) {
        return {
            statusCode: 404,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            },
            body: ''
        }
    }
    const updateTodoRequest: UpdateTodoRequest = JSON.parse(event.body)
    logger.info("updateTodoRequest: "+updateTodoRequest)

    const updatedTodo = await updateTodo(todoItem, updateTodoRequest)

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
            updatedTodo
        })
    }
}
