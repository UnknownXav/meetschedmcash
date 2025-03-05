import { axiosConfig } from "../config/axiosconfig"
import { InsertClientDto } from "../dto/Client.dto"
import { GetClientResponse } from "../types/client.type"

export const getAllClient = async (): Promise<GetClientResponse[]> => {
  const resp = await axiosConfig.get("client")

  return resp.data
}

export const saveClient = async (payload: InsertClientDto) => {
  const resp = await axiosConfig.post("client", payload, {
    headers: {
      "Content-Type": "text/plain",
    },
  })

  return resp
}

export const getReferal = async(id:string,userType:string)=>{
  const resp = await axiosConfig.get(`client/view-referal?id=${id}&userType=${userType}`)

  return resp.data;
}