import { axiosConfig } from "../config/axiosconfig";
import { GetMeetingResponse, SaveMeetingType } from "../types/meeting.type";

import axios from 'axios';

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

  export const deleteMeeting = async (id: string) => {
    const response = await axios.delete(`/api/meeting/${id}`); // Replace with your API endpoint
    return response.data;
  };