import { addDoc, collection, getDocs } from "firebase/firestore"
import { SaveMeetingType } from "../types/meeting.type"

import { FirebaseTable } from "./database.enum"
import { db } from "../firebase"

export const createMeeting = async(payload:SaveMeetingType) =>{
    const resp = await addDoc(collection(db,FirebaseTable.MEETING),payload)

    return resp;
}

export const getMeeting = async()=>{
    const snapshot = await getDocs(collection(db,FirebaseTable.MEETING))
    const meeting = snapshot.docs.map((doc: { id: any; data: () => any }) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return meeting;
}