import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { deleteAppointment, getAppointment } from '../../businessLogic/appointments'
import { createLogger } from '../../utils/logger'
const logger = createLogger('delete')
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const appointmentId = event.pathParameters.appointmentId
    logger.info("Event to be deleted: ", event)
    const authorization = event.headers.Authorization
    const split = authorization.split(' ')
    const jwtToken = split[1]
    // TODO: Remove a TODO item by id
    const appointmentItem = await getAppointment(appointmentId, jwtToken)
    if (!appointmentItem) {
        return {
            statusCode: 404,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            },
            body: ''
        }
    }
    const result = await deleteAppointment(appointmentItem)
    return {
        statusCode: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
            result
        })
    }
}
