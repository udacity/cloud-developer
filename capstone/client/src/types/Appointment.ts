export interface Appointment {
  appointmentId: string
  createdAt: string
  name: string
  appointmentDate: string
  done: boolean
  attachmentUrl?: string
}