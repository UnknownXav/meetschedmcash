import { addDoc, collection, getDocs } from "firebase/firestore"
import { SaveReferralType } from "../types/referral.type"

import { FirebaseTable } from "./database.enum"
import { db } from "../firebase"


export const getReferral = async()=>{
    const snapshot = await getDocs(collection(db,FirebaseTable.FORWARDEDCOMPANIES))
    const meeting = snapshot.docs.map((doc: { id: any; data: () => any }) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return meeting;
}