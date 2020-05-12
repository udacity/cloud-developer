// import 'source-map-support/register'

// import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
// import { deleteTodo, getTodo } from '../../businessLogic/appointments'
// import { createLogger } from '../../utils/logger'
// const logger = createLogger('delete')
// export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
//     const todoId = event.pathParameters.todoId
//     logger.info("Event to be deleted: ", event)
//     const authorization = event.headers.Authorization
//     const split = authorization.split(' ')
//     const jwtToken = split[1]
//     // TODO: Remove a TODO item by id
//     const todoItem = await getTodo(todoId, jwtToken)
//     if (!todoItem) {
//         return {
//             statusCode: 404,
//             headers: {
//                 'Access-Control-Allow-Origin': '*',
//                 'Access-Control-Allow-Credentials': true
//             },
//             body: ''
//         }
//     }
//     const result = await deleteTodo(todoItem)
//     return {
//         statusCode: 204,
//         headers: {
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Credentials': true
//         },
//         body: JSON.stringify({
//             result
//         })
//     }
// }
