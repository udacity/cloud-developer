import * as uuid from 'uuid'

import { AppointmentItem } from '../models/AppointmentItem'
import { AppointmentsAccess } from '../dataLayer/appointmentsAccess'
import { CreateAppointmentRequest } from '../requests/CreateAppointmentRequest'
import { UpdateAppointmentRequest } from '../requests/UpdateAppointmentRequest'
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
export async function getAppointmentInDay(
  jwtToken: string,
  appointmentDate: string
): Promise<AppointmentItem[]> {

  const userId = parseUserId(jwtToken)

  return await appointmentsAccess.getAppointmentsInDay( userId,appointmentDate )
}

export async function updateAppointment(
  appointmentItem:AppointmentItem,
  updateTodoRequest: UpdateAppointmentRequest
): Promise<AppointmentItem> {


  appointmentItem.name = updateTodoRequest.name
  appointmentItem.appointmentDate = updateTodoRequest.appointmentDate
  appointmentItem.done = updateTodoRequest.done
  if(updateTodoRequest !== undefined)
    appointmentItem.attachmentUrl = updateTodoRequest.attachmentUrl

  return await appointmentsAccess.updateAppointment(appointmentItem)
}

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
