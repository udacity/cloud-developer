/**
 * Fields in a request to create a single TODO item.
 */
export interface CreateAppointmentRequest {
  name: string
  appointmentDate: string,
  attachmentUrl?: string
}
