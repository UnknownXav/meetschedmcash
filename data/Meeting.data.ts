import {
  ChangeMeetingStatus,
  ChangeReferalStatusDto,
  ClientDto,
  RequestToReschedulePayload,
  RescheduleMeetingDto,
} from "@/lib/dto/Client.dto"
import { db } from "@/lib/firebase"
import { FirebaseCollectionEnum } from "@/lib/types/FirebaseCollection.enum"
import { MeetingStatusEnum } from "@/lib/types/MeetingStatus.enum"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { createNotification } from "./Notificaton.data"
import { CreateNotificaton } from "@/lib/dto/Notification.dto"
import { UserType } from "@/lib/dto/User.dto"

type RescheduleMeetingPayload = RescheduleMeetingDto & {
  id: string
}

type RequestReschuduleMeetingPayload = RequestToReschedulePayload & {
  id: string
}

export const rescheduleMeeting = async (payload: RescheduleMeetingPayload) => {
  const ref = doc(db, FirebaseCollectionEnum.client, payload.id)
  const collection = await getDoc(ref)
  const collectionData = {
    id: collection.id,
    ...collection.data(),
  } as ClientDto

  await updateDoc(ref, {
    "meetings.date": payload.date,
    "meetings.time": payload.time,
    meetingStatus: MeetingStatusEnum.PENDING,
  })

  const notifPayload: CreateNotificaton = {
    message: `${collectionData.company.name} has been reschedule to ${payload.date} ${payload.time}`,
    dateCreated: new Date().toISOString(),
    title: "Meeting Reschedule",
    sender: "",
    reciever: "",
    notify: [UserType.MCASH, UserType.ADMIN, UserType.SPBD],
    userTypeCreated: UserType.RMS,
    readby:[]
  }

  await createNotification(notifPayload)
  return collectionData
}

export const requestToRescheduleService = async (
  payload: RequestReschuduleMeetingPayload
) => {
  const ref = doc(db, FirebaseCollectionEnum.client, payload.id)
  const collection = await getDoc(ref)
  const collectionData = {
    id: collection.id,
    ...collection.data(),
  } as ClientDto

  await updateDoc(ref, {
    meetingStatus: MeetingStatusEnum.RESCHEDULE,
    remarks: payload.remarks,
  })

  const notifPayload: CreateNotificaton = {
    message: `hi ${collectionData.referedBy.email} we are requesting to reschedule the meeting our to ${collectionData.company.name} due to ${payload.remarks}`,
    dateCreated: new Date().toISOString(),
    title: "Request to Reschedule Meeting",
    sender: "",
    reciever: collectionData.referedBy.id,
    notify: [UserType.MCASH, UserType.ADMIN, UserType.SPBD],
    userTypeCreated: UserType.RMS,
    readby:[]
  }

  await createNotification(notifPayload)

  return collection
}

export async function updateMeetingStatus(id:string,payload:ChangeMeetingStatus){
  const ref = doc(db, FirebaseCollectionEnum.client, id)
  const collection = await getDoc(ref)
  const collectionData = {
    id: collection.id,
    ...collection.data(),
  } as ClientDto
  let updateData:Partial<ChangeMeetingStatus> = { 
    meetingStatus: payload.meetingStatus,
  }
  
  if(payload.meetingStatus === MeetingStatusEnum.ENDORSE){
    updateData.meetingBy=UserType.SPBD
  }
  await updateDoc(ref, updateData)

  return collectionData;
  
}


export async function changeReferalStatus(id:string,payload:ChangeReferalStatusDto){
  const ref = doc(db, FirebaseCollectionEnum.client, id)
  const collection = await getDoc(ref)
  const collectionData = {
    id: collection.id,
    ...collection.data(),
  } as ClientDto

  await updateDoc(ref, {
    referalStatus:payload.referalStatus,
    meetingStatus:MeetingStatusEnum.DONE
  })

  return collectionData;
 
}