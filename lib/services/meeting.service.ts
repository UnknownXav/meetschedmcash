import { axiosConfig } from "../config/axiosconfig"
import {
  ChangeMeetingStatus,
  ChangeReferalStatusDto,
  RequestToReschedulePayload,
  RescheduleMeetingDto,
} from "../dto/Client.dto"
import { UserType } from "../dto/User.dto"

export async function getClientMeetings(id:string,userType:UserType) {
  try {
    
    const resp = await axiosConfig.get(`meeting?id=${id}&userType=${userType}`)
 
    return resp.data  
  } catch (error) {
   
      return [] 
   }
  
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


export async function updateMeestingStatus(id:string,payload:ChangeMeetingStatus){
  const resp = await axiosConfig.put(`meeting/updateStatus/${id}`,payload)

  return resp;
}

export async function updateReferalStatus(id:string,payload:ChangeReferalStatusDto){
  const resp = await axiosConfig.put(`meeting/change-referal-status/${id}`,payload)

  return resp;
}