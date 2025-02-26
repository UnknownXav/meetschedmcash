import { axiosConfig } from "../config/axiosconfig";
import { ClientBaseType, GetClientResponse, SaveClientType } from "../types/client.type";

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


export const deleteClientAccount = async (id: string) => {
    const resp = await fetch(`/api/client/${id}`, {
      method: 'DELETE',
    });
  
    if (!resp.ok) {
      throw new Error('Failed to delete account');
    }
  };
  // Example API call for updating an account
export const updateClientAccount = async (id: string, data: Partial<ClientBaseType>) => {
  try {
    const response = await axiosConfig.put(`/api/client/${id}`, data);  // Axios handles HTTP PUT request
    if (response.status === 200) {
      return response.data;  // return the updated client data
    }
    throw new Error('Failed to update client');
  } catch (error) {
    console.error("Error updating client:", error);
    throw error;
  }
};
  