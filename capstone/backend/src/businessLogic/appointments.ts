// import * as uuid from 'uuid'

import { AppointmentItem } from '../models/AppointmentItem'
import { AppointmentsAccess } from '../dataLayer/appointmentsAccess'
// import { CreateTodoRequest } from '../requests/CreateTodoRequest'
// import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { parseUserId } from '../auth/utils'

const todosAccess = new AppointmentsAccess()

export async function getAllAppointments(): Promise<AppointmentItem[]> {
  return todosAccess.getAllAppointments()
}
export async function getUserAppointments(jwtToken: string): Promise<AppointmentItem[]> {
  const userId = parseUserId(jwtToken)
  return todosAccess.getAppointments(userId)
}

// export async function createTodo(
//   createTodoRequest: CreateTodoRequest,
//   jwtToken: string
// ): Promise<AppointmentItem> {

//   const todoId = uuid.v4()
//   const userId = parseUserId(jwtToken)

//   return await todosAccess.createTodo({
//     userId: userId,
//     appointmentId: todoId ,
//     createdAt:  new Date().toISOString(),
//     name: createTodoRequest.name,
//     dueDate: createTodoRequest.dueDate,
//     attachmentUrl:createTodoRequest.attachmentUrl,
//     done: false
//   })
// }

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

// export async function getTodo(
//   todoId: string,
//   jwtToken: string
// ): Promise<AppointmentItem> {

//   const userId = parseUserId(jwtToken)

//   return await todosAccess.getAppointment(todoId,userId)
// }

// export async function deleteTodo(
//   todoItem:AppointmentItem
// ): Promise<boolean> {
//   return await todosAccess.deleteTodo(todoItem)
// }
