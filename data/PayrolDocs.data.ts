import { CreatePayrollDocs } from "@/lib/dto/PayrollDocsDto.dto"
import { db } from "@/lib/firebase"
import { FirebaseCollectionEnum } from "@/lib/types/FirebaseCollection.enum"
import { addDoc, collection, getDocs, orderBy, query } from "firebase/firestore"

export const createDocs =async(payload:CreatePayrollDocs)=>{
    try {
        const resp = await addDoc(collection(db,FirebaseCollectionEnum.payrolldocs),payload)

        return resp;
    } catch (error) {
        console.log("error",error)
    }
}

export const getAllDocs = async()=>{
    try {
        const q = query(collection(db,FirebaseCollectionEnum.payrolldocs),orderBy("dateCreated","desc"))
    
        const snapshot = await getDocs(q)

        const data = snapshot.docs.map(val=>{
            return {
                id:val.id,
                ...val.data()
            }
        })

        return data;
    } catch (error) {
        return []
    }
}