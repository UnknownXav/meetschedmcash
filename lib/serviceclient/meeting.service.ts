import axios from "axios";
import { axiosConfig } from "../config/axiosconfig";
import { GetMeetingResponse, SaveMeetingType, MeetingType } from "../types/meeting.type";

export const getAllMeeting = async():Promise<GetMeetingResponse[]>=>{
    const resp = await axiosConfig.get("meeting");

    return resp.data;
}

export const saveMeeting = async(payload:SaveMeetingType) => {
    const resp = await axiosConfig.post("meeting",payload,{
        headers:{
            "Content-Type":'text/plain'
        }
    })

    return resp;
}

export const deleteMeetingType = async (id: string) => {
    const resp = await fetch(`/api/meeting/${id}`, {
      method: 'DELETE',
    });
  
    if (!resp.ok) {
      throw new Error('Failed to delete meeting');
    }
  };



  

