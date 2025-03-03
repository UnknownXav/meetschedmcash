import { axiosConfig } from "../config/axiosconfig"
import { CreateUserDto } from "../dto/User.dto"

export const createUser = async(payload:CreateUserDto)=>{
    const resp = await axiosConfig.post("user",payload,{
        headers: {
            "Content-Type": "text/plain",
          },
    })


    return resp.data
}

export const getRms = async()=>{
    const resp =await axiosConfig.get("user/rms");

    return resp.data;
}