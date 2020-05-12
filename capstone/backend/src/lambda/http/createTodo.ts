// import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
// import 'source-map-support/register'
// import { createLogger } from '../../utils/logger'
// import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
// import { createTodo } from '../../businessLogic/appointments'

// export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
//     createLogger('Processing event: '+ event)

//   const newTodo: CreateTodoRequest = JSON.parse(event.body)
//   const authorization = event.headers.Authorization
//   const split = authorization.split(' ')
//   const jwtToken = split[1]
//   const newItem = await createTodo(newTodo, jwtToken)

//   return {
//     statusCode: 201,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Credentials': true
//     },
//     body: JSON.stringify({
//       newItem
//     })
//   }
// }
