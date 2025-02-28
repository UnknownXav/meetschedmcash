import { axiosConfig } from "../config/axiosconfig";
import { GetReferralResponse, SaveReferralType } from "../types/referral.type";

export const getAllReferral = async():Promise<GetReferralResponse[]>=>{
    const resp = await axiosConfig.get("meeting");

    return resp.data;
}

export const saveReferral = async(payload:SaveReferralType) => {
    const resp = await axiosConfig.post("meeting",payload,{
        headers:{
            "Content-Type":'text/plain'
        }
    })

    return resp;
}