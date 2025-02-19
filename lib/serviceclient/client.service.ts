import { axiosConfig } from "../config/axiosconfig";
import { GetClientResponse, SaveClientType } from "../types/client.type";

export const getAllClient = async():Promise<GetClientResponse[]>=>{
    const resp = await axiosConfig.get("client");

    return resp.data;
}

export const saveClient = async(payload:SaveClientType) => {
    const resp = await axiosConfig.post("client",payload,{
        headers:{
            "Content-Type":'text/plain'
        }
    })

    return resp;
}