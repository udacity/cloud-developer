import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import { createLogger } from '../../utils/logger'
import { UpdateAppointmentRequest } from '../../requests/UpdateAppointmentRequest'
import { updateAppointment, getAppointment } from '../../businessLogic/appointments'
const logger = createLogger('Update Logger')
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info("Processing event: "+event)
    const appointmentId = event.pathParameters.appointmentId
    const authorization = event.headers.Authorization
    const split = authorization.split(' ')
    const jwtToken = split[1]
    const todoItem = await getAppointment(appointmentId, jwtToken)
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
    const updateTodoRequest: UpdateAppointmentRequest = JSON.parse(event.body)
    logger.info("updateTodoRequest: "+updateTodoRequest)

    const updatedTodo = await updateAppointment(todoItem, updateTodoRequest)

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
