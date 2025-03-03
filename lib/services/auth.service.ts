import { axiosConfig } from "../config/axiosconfig";
import { LoginDto } from "../dto/User.dto";

export const signIn = async(payload:LoginDto)=>{
 const resp = await axiosConfig.post("auth",payload);

 return resp.data
}