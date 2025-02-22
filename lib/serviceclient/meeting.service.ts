import { axiosConfig } from "../config/axiosconfig";
import { GetMeetingResponse, SaveMeetingType } from "../types/meeting.type";

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