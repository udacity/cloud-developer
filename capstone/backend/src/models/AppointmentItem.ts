export interface AppointmentItem {
  userId: string
  appointmentId: string
  createdAt: string
  name: string
  appointmentDate: string
  done: boolean
  attachmentUrl?: string
}
