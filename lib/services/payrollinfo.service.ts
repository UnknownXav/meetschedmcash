import { axiosConfig } from "../config/axiosconfig";
import { CreatePayrollDocs } from "../dto/PayrollDocsDto.dto";

export async function addPayrollInfo(payload:CreatePayrollDocs){
    const resp = await axiosConfig.post("payrolldocs",payload,{
        headers: {
            "Content-Type": "text/plain",
          },
    })

    return resp.data;
}

export async function getDocsList(){
    const resp = await axiosConfig.get("payrolldocs")


    return resp.data;
}