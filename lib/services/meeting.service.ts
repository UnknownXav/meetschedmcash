import { addDoc, collection, getDocs, doc, deleteDoc } from "firebase/firestore"
import { SaveMeetingType, DeleteMeetingType, MeetingType } from "../types/meeting.type"

import { FirebaseTable } from "./database.enum"
import { db } from "../firebase"

export const createMeeting = async(payload:SaveMeetingType) =>{
    const resp = await addDoc(collection(db,FirebaseTable.MEETING),payload)

    return resp;
}

export const getMeeting = async(p0?: never[])=>{
    const snapshot = await getDocs(collection(db,FirebaseTable.MEETING))
    const meeting = snapshot.docs.map((doc: { id: any; data: () => any }) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return meeting;
}

export const deleteMeeting = async (id: string) => {
  try {
    await deleteDoc(doc(db, FirebaseTable.MEETING, id));
    return `Meeting with id ${id} has been deleted successfully`;
  } catch (error) {
    console.error("Error deleting client:", error);
    throw new Error('Failed to delete meeting');
  }
};

export const handleForward = async (companyName: string) => {
  try {
    const forwardedRef = collection(db, "forwardedCompanies")
    await addDoc(forwardedRef, { companyName, timestamp: new Date() })
    alert(`${companyName} has been forwarded to Track Referral Status.`)
    getMeeting([])
  } catch (error) {
    console.error("Error forwarding company: ", error)
    alert("Failed to forward company. Please try again.")
  }
}

