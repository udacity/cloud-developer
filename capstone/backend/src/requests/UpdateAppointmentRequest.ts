/**
 * Fields in a request to update a single TODO item.
 */
export interface UpdateAppointmentRequest {
  name: string
  appointmentDate: string
  done: boolean,
  attachmentUrl?: string
}
