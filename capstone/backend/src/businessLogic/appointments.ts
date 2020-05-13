import * as uuid from 'uuid'

import { AppointmentItem } from '../models/AppointmentItem'
import { AppointmentsAccess } from '../dataLayer/appointmentsAccess'
import { CreateAppointmentRequest } from '../requests/CreateAppointmentRequest'
// import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { parseUserId } from '../auth/utils'

const appointmentsAccess = new AppointmentsAccess()

export async function getAllAppointments(): Promise<AppointmentItem[]> {
  return appointmentsAccess.getAllAppointments()
}
export async function getUserAppointments(jwtToken: string): Promise<AppointmentItem[]> {
  const userId = parseUserId(jwtToken)
  return appointmentsAccess.getAppointments(userId)
}

export async function createAppointment(
  createAppointmentRequest: CreateAppointmentRequest,
  jwtToken: string
): Promise<AppointmentItem> {

  const todoId = uuid.v4()
  const userId = parseUserId(jwtToken)

  return await appointmentsAccess.createAppointment({
    userId: userId,
    appointmentId: todoId ,
    createdAt:  new Date().toISOString(),
    name: createAppointmentRequest.name,
    appointmentDate: createAppointmentRequest.appointmentDate,
    attachmentUrl:createAppointmentRequest.attachmentUrl,
    done: false
  })
}

// export async function updateTodo(
//   todoItem:AppointmentItem,
//   updateTodoRequest: UpdateTodoRequest
// ): Promise<AppointmentItem> {


//   todoItem.name = updateTodoRequest.name
//   todoItem.dueDate = updateTodoRequest.dueDate
//   todoItem.done = updateTodoRequest.done
//   if(updateTodoRequest !== undefined)
//     todoItem.attachmentUrl = updateTodoRequest.attachmentUrl

//   return await todosAccess.updateTodo(todoItem)
// }

export async function getAppointment(
  appointmentId: string,
  jwtToken: string
): Promise<AppointmentItem> {

  const userId = parseUserId(jwtToken)

  return await appointmentsAccess.getAppointment(appointmentId,userId)
}

export async function deleteAppointment(
  appointmentItem:AppointmentItem
): Promise<boolean> {
  return await appointmentsAccess.deleteAppointment(appointmentItem)
}
