import { addDoc, collection, getDocs } from "firebase/firestore"
import { SaveClientType } from "../types/client.type"

import { FirebaseTable } from "./database.enum"
import { db } from "../firebase"

export const createClient = async(payload:SaveClientType) =>{
    const resp = await addDoc(collection(db,FirebaseTable.CLIENT),payload)

    return resp;
}

const getClient = async(date:string | undefined)=>{
  const snapshot = await getDocs(collection(db,FirebaseTable.CLIENT))

    const clients = snapshot.docs.map((doc: { id: any; data: () => any }) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return clients;
}