import { apiEndpoint } from '../config'
import { Appointment } from '../types/Appointment';
import { CreateAppointmentRequest } from '../types/CreateAppointmentRequest';
import Axios from 'axios'
import { UpdateAppointmentRequest } from '../types/UpdateAppointmentRequest';

export async function getAppointments(idToken: string): Promise<Appointment[]> {
  console.log('Fetching Appointments')

  const response = await Axios.get(`${apiEndpoint}/appointments`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Appointments:', response.data)
  return response.data.items
}

export async function createAppointment(
  idToken: string,
  newAppointment: CreateAppointmentRequest
): Promise<Appointment> {
  const response = await Axios.post(`${apiEndpoint}/appointments`,  JSON.stringify(newAppointment), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  console.log("response.data.item: ",response.data.item)
  console.log("response.data: ",response.data)
  return response.data.item
}

export async function patchAppointment(
  idToken: string,
  appointmentId: string,
  updatedAppointment: UpdateAppointmentRequest
): Promise<void> {
  await Axios.patch(`${apiEndpoint}/appointments/${appointmentId}`, JSON.stringify(updatedAppointment), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function deleteAppointment(
  idToken: string,
  appointmentId: string
): Promise<void> {
  await Axios.delete(`${apiEndpoint}/appointments/${appointmentId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function getUploadUrl(
  idToken: string,
  appointmentId: string
): Promise<string> {
  const response = await Axios.post(`${apiEndpoint}/appointments/${appointmentId}/attachment`, '', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.uploadUrl
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
  await Axios.put(uploadUrl, file)
}
