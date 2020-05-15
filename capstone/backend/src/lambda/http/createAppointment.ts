import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import { createLogger } from '../../utils/logger'
import { CreateAppointmentRequest } from '../../requests/CreateAppointmentRequest'
import { createAppointment,getAppointmentInDay } from '../../businessLogic/appointments'
const logger = createLogger('delete')
const maxAppointmentsIndDay =  +process.env.MAX_APPOINTMENTS_IN_DAY


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: '+ event)

  const newAppointment: CreateAppointmentRequest = JSON.parse(event.body)
  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]
  logger.info("newAppointment " + newAppointment + " jwToken "+ jwtToken)
  const appointments = (await getAppointmentInDay(jwtToken, newAppointment.appointmentDate))
  if(appointments!= null){
    const numAppointmnents = appointments.length
    if(numAppointmnents>=maxAppointmentsIndDay){
      createLogger('Max appointmenst in day exceeded: '+ maxAppointmentsIndDay + " in day " + newAppointment.appointmentDate)
      return {
        statusCode: 201,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: `You can only book ${maxAppointmentsIndDay} appointments per day`
      }
    }
  }

  const newItem = await createAppointment(newAppointment, jwtToken)
  createLogger('New Item Created: '+ newItem)
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      item:newItem
    })
  }
}
