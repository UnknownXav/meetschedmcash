import { axiosConfig } from "../config/axiosconfig"
import {
  RequestToReschedulePayload,
  RescheduleMeetingDto,
} from "../dto/Client.dto"

export async function getClientMeetings() {
  const resp = await axiosConfig("meeting")

  return resp.data
}

export async function rescheduleMeeting(
  id: string,
  payload: RescheduleMeetingDto
) {
  const resp = await axiosConfig.put(`meeting/reschedule/${id}`, payload)

  return resp
}

export async function requestReschedule(
  id: string,
  payload: RequestToReschedulePayload
) {
  const resp = await axiosConfig.put(`meeting/requestresched/${id}`, payload)

  return resp
}
