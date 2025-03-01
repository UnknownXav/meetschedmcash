import { CreateNotificaton } from "@/lib/dto/Notification.dto"
import { db } from "@/lib/firebase"
import { FirebaseCollectionEnum } from "@/lib/types/FirebaseCollection.enum"
import { addDoc, collection } from "firebase/firestore"

export const createNotification = async (payload: CreateNotificaton) => {
  const resp = await addDoc(
    collection(db, FirebaseCollectionEnum.notification),
    payload
  )

  return resp
}
