import 'source-map-support/register'
// import { getUserAppointments } from '../../businessLogic/appointments';
import { getUserAppointments } from '../../businessLogic/appointments';
import { createLogger } from '../../utils/logger'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda';


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  createLogger("Processing event: "+event)
  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]
  const result = await getUserAppointments(jwtToken)
  // const result = await getAllAppointments()

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({items :result})
    }
  

}
